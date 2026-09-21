import asyncio
import os
from pathlib import Path
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse

from .auth import get_api_key
from .database import engine
from . import models
from .routers import (
    projects, deliverables, announcements_router, dashboard, departments, milestones, gantt, support, po_line_items,
    deliverables_config, reports, ai_support, export,
)
from .scheduler import scheduler_loop

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Readiness (L0/L1) Platform (Pilot)")

# Once the frontend moves to S3/CloudFront it's a different origin than this
# API (same split scm-ssot already uses), so browser fetch()es need CORS.
# CORS_ORIGINS is a comma-separated allowlist; unset means "same-origin only
# call sites" still work (local dev, Render, DronaHQ webview) but no new
# cross-origin browser caller is allowed until its origin is added.
_cors_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
if _cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_cors_origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.on_event("startup")
async def _start_scheduler():
    # Item [due-soon nudge] / [request escalation]: an in-process background
    # loop, not a host-specific cron job -- see scheduler.py's docstring.
    asyncio.create_task(scheduler_loop())

_api_auth = [Depends(get_api_key)]
app.include_router(projects.router, dependencies=_api_auth)
app.include_router(deliverables.router, dependencies=_api_auth)
app.include_router(announcements_router.router, dependencies=_api_auth)
app.include_router(dashboard.router, dependencies=_api_auth)
app.include_router(departments.router, dependencies=_api_auth)
app.include_router(milestones.router, dependencies=_api_auth)
app.include_router(gantt.router, dependencies=_api_auth)
app.include_router(support.router, dependencies=_api_auth)
app.include_router(po_line_items.router, dependencies=_api_auth)
app.include_router(deliverables_config.router, dependencies=_api_auth)
app.include_router(reports.router, dependencies=_api_auth)
app.include_router(ai_support.router, dependencies=_api_auth)
app.include_router(export.router, dependencies=_api_auth)

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
    html = html.replace('static/app.js"', f'static/app.js?v={version}"')
    html = html.replace('static/styles.css"', f'static/styles.css?v={version}"')
    html = html.replace('static/css/landing.css"', f'static/css/landing.css?v={version}"')
    html = html.replace('static/js/landing.js"', f'static/js/landing.js?v={version}"')
    return HTMLResponse(html, headers={"Cache-Control": "no-cache"})


@app.get("/health")
def health():
    return {"status": "ok"}
