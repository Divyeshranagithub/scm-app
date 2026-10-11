import asyncio
import os
from pathlib import Path
import limits
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from .database import engine
from . import models
from .routers import (
    projects, deliverables, announcements_router, dashboard, departments, milestones, gantt, support, po_line_items,
    deliverables_config, reports, ai_support, export, auth_router,
)
from .scheduler import scheduler_loop

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Readiness (L0/L1) Platform (Pilot)")

# Once the frontend moves to S3/CloudFront it's a different origin than this
# API (same split scm-ssot/QMS360 already use), so browser fetch()es need
# CORS. CORS_ORIGINS is a comma-separated allowlist; unset means same-origin
# only (local dev, Render) still works, but no cross-origin caller is
# allowed until its origin is added.
_cors_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
if _cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_cors_origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# [load test follow-up, 2026-09-22]: a blanket per-client safety net, not a
# per-user/per-feature policy -- GAHIZ already has its own real daily
# message quota (ai_support.py, DB-backed, per actor_email) for cost
# control; this is the "nothing infrastructure-level" gap underneath that:
# nothing stopped a runaway client (a buggy polling loop, a script) from
# hammering any other endpoint. Keyed by IP, not actor_email, since there's
# still no verified identity to key on (see docs/ARCHITECTURE.md's
# "Identity and permissions") -- actor_email is just a self-reported form
# field today, trivially reset by typing a different one.
#
# Hand-written middleware, not the slowapi package's own SlowAPIMiddleware
# -- tried that first, and confirmed (by direct testing, not assumed) that
# its route-handler resolution silently no-ops against this FastAPI version
# (0.141.1): every route registered via app.include_router() -- i.e. every
# real route in this app -- is wrapped in an internal _IncludedRouter with
# no top-level .endpoint attribute, which slowapi's _find_route_handler
# requires; failing to find one, it treats the route as exempt. The result
# was a rate limiter that looked correctly configured and worked on the two
# routes declared directly on `app` (/, /health) while doing nothing at all
# on every /api/* route -- exactly the routes this exists to protect. Using
# the `limits` package (slowapi's own underlying dependency) directly here
# sidesteps that route-resolution step entirely: this checks request.url.path
# against a plain exempt-set, with no dependency on how FastAPI happens to
# represent a matched route internally.
#
# Keyed by IP specifically has one real limitation worth knowing: several
# real people behind one shared corporate NAT/proxy look like a single IP
# and would share this one bucket. 300/minute is deliberately generous
# (ordinary UI navigation can fire a handful of calls per page) precisely
# to keep that scenario unlikely to matter in practice -- this is a safety
# net against something clearly broken, not a tight per-user throttle.
# Override via RATE_LIMIT_PER_MINUTE if real usage needs a different number.
_RATE_LIMIT_PER_MINUTE = int(os.environ.get("RATE_LIMIT_PER_MINUTE", "300"))
_rate_limit_item = limits.parse(f"{_RATE_LIMIT_PER_MINUTE}/minute")
_rate_limit_storage = limits.storage.MemoryStorage()
_rate_limiter = limits.strategies.MovingWindowRateLimiter(_rate_limit_storage)
# Render (and most PaaS/reverse-proxy setups) puts the real client's address
# in X-Forwarded-For, not the TCP-level request.client -- that would just be
# the proxy's own address for every request, collapsing every real visitor
# into one shared bucket.
_RATE_LIMIT_EXEMPT_PATHS = {"/health"}  # Render polls this on its own schedule -- never throttle it


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path in _RATE_LIMIT_EXEMPT_PATHS:
            return await call_next(request)
        if not _rate_limiter.hit(_rate_limit_item, _client_ip(request)):
            return JSONResponse(status_code=429, content={"detail": "Too many requests -- please slow down and try again shortly."})
        return await call_next(request)


app.add_middleware(RateLimitMiddleware)


@app.on_event("startup")
async def _start_scheduler():
    # Item [due-soon nudge] / [request escalation]: an in-process background
    # loop, not a host-specific cron job -- see scheduler.py's docstring.
    asyncio.create_task(scheduler_loop())

app.include_router(auth_router.router)
app.include_router(projects.router)
app.include_router(deliverables.router)
app.include_router(announcements_router.router)
app.include_router(dashboard.router)
app.include_router(departments.router)
app.include_router(milestones.router)
app.include_router(gantt.router)
app.include_router(support.router)
app.include_router(po_line_items.router)
app.include_router(deliverables_config.router)
app.include_router(reports.router)
app.include_router(ai_support.router)
app.include_router(export.router)

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"
LOCAL_FILES_DIR = Path(__file__).resolve().parent.parent / "data" / "local_storage"


class NoCacheStaticFiles(StaticFiles):
    """Pilot ships frontend changes frequently — force browsers to always
    revalidate (still cheap, via ETag/If-None-Match) instead of silently
    serving a stale cached app.js/styles.css after a deploy.
    """
    async def get_response(self, path, scope):
        response = await super().get_response(path, scope)
        response.headers["Cache-Control"] = "no-cache"
        return response


app.mount("/static", NoCacheStaticFiles(directory=str(FRONTEND_DIR / "static")), name="static")
app.mount("/local-files", StaticFiles(directory=str(LOCAL_FILES_DIR)), name="local-files")


@app.get("/")
def index():
    # A tab left open across a deploy keeps its in-memory app.js/styles.css
    # no matter what Cache-Control says on /static — that only governs re-fetches.
    # Stamping the asset URLs with the file's own mtime forces a brand-new URL
    # (and therefore a real fetch) on every deploy that changes either file.
    html = (FRONTEND_DIR / "index.html").read_text(encoding="utf-8")
    # landing.css/landing.js stamped the same way as app.js/styles.css --
    # deliberately NOT the vendored three.js/OrbitControls files under
    # static/js/vendor/. Those are referenced only via the import map's
    # bare "three" specifier, and OrbitControls.js's own internal
    # `import ... from 'three'` has to resolve to that exact same URL —
    # a query string here and not there (or a different one each deploy)
    # would make the browser treat them as two different module
    # identities. If the vendored files ever need cache-busting after a
    # version bump, do it by changing the filename, not a query string.
    version = str(int(max(
        (FRONTEND_DIR / "static" / "app.js").stat().st_mtime,
        (FRONTEND_DIR / "static" / "styles.css").stat().st_mtime,
        (FRONTEND_DIR / "static" / "css" / "landing.css").stat().st_mtime,
        (FRONTEND_DIR / "static" / "js" / "landing.js").stat().st_mtime,
    )))
    html = html.replace('/static/app.js"', f'/static/app.js?v={version}"')
    html = html.replace('/static/styles.css"', f'/static/styles.css?v={version}"')
    html = html.replace('/static/css/landing.css"', f'/static/css/landing.css?v={version}"')
    html = html.replace('/static/js/landing.js"', f'/static/js/landing.js?v={version}"')
    return HTMLResponse(html, headers={"Cache-Control": "no-cache"})


@app.get("/health")
def health():
    return {"status": "ok"}
