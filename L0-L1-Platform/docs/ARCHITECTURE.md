# Architecture

This is a map of how the L0/L1 Platform is built — for an engineer picking
up the codebase, not for a business audience (see the process/workflow
pre-read shared with the Digitalization Team for that). It assumes you've
read the top-level `README.md` first.

## Stack

- **Backend**: Python, FastAPI, SQLAlchemy ORM. No async DB driver — routes
  are plain sync functions; FastAPI runs them in a threadpool.
- **Frontend**: Vanilla JavaScript, no framework, no build step. One large
  `frontend/static/app.js` (~11.7k lines) renders every view by direct DOM
  manipulation, plus `frontend/static/js/landing.js` for the separate
  Three.js landing/sign-in experience.
- **Database**: PostgreSQL in production, SQLite for local dev — switched
  by the `DATABASE_URL` environment variable alone (`backend/database.py`),
  no code differences between the two beyond a couple of Postgres-only
  migration helpers (see "Schema evolution" below).
- **Styling**: One global `frontend/static/styles.css` using CSS custom
  properties for theming (light/dark).

## Directory layout

```
app/
  backend/
    main.py              FastAPI app, router registration, static file serving
    database.py           Engine/session setup, Postgres migration helpers
    models.py              SQLAlchemy models — the actual schema
    schemas.py              Pydantic request/response shapes
    rules.py                 The due-date/scoring/permission engine (read this first)
    seed.py                   Catalog data + idempotent migrations, runs on every deploy
    announcements.py          Builds every in-app notification/announcement
    scheduler.py               Background loop: due-soon nudges, escalations
    excel_parsing.py            Bulk import helper
    providers/
      storage.py                Local-disk vs. OneDrive file storage, switched by STORAGE_BACKEND
      mail.py                     Console-log vs. real Outlook mail, switched by MAIL_BACKEND
      graph_auth.py                 Microsoft Graph service-identity auth (used by both providers above)
    routers/                  One file per resource — see docs/API.md
  frontend/
    index.html                Single HTML shell every view renders into
    static/app.js               The entire application UI
    static/styles.css            All styling
    static/js/landing.js          3D landing page + sign-in gate
  tests/                     Automated test suite — see "Testing" below
  docs/                      This directory
```

## The core data model

Everything hangs off two tables:

- **`projects`** — one row per tender (`stage="L0"`) or project (`stage="L1"`).
  An L1 keeps its L0's own `est_no` and links back via `l0_source_id` — it's
  the same tender, a later stage, not a new record (`models.py`'s `Project`
  docstring, item 119).
- **`deliverable_submissions`** — one row per (project × catalog item). This
  is the actual transactional data: status, due date, who's assigned, what's
  been uploaded.

Submissions point at **`deliverable_definitions`** — the admin-managed
catalog (currently 329 items across L0 domestic, L0 international, and L1 —
see `backend/seed.py`). A definition doesn't store a due-date formula
directly; it owns a list of **`deliverable_formula_branches`** (see "Due-date
engine" below).

Full real PostgreSQL DDL (28 tables, generated directly from the models, not
hand-written) is available on request — see the note in
`docs/RUNBOOK.md`'s "Schema" section.

## Two independent status axes (important, easy to get wrong)

A submission's `status` column (`SubmissionStatus`) is **Progress only** —
how far the work has gotten (no progress / in progress / pending review /
approved / rejected). **Deadline** standing (not due / due / on time / early
/ late) is never stored — it's computed live by `rules.deadline_status()`
from `due_date` and `reviewed_at`. Do not conflate the two; a submission can
be `APPROVED` (progress) and `late` (deadline) at the same time. See
`models.SubmissionStatus`'s own docstring for the full history of why this
split exists (item 143, 2nd revision).

## The due-date engine (`rules.py`)

This is the single most load-bearing piece of business logic in the app —
read `rules.compute_due_date`'s docstring before touching anything near it.

- A `DeliverableDefinition` has one or more `DeliverableFormulaBranch` rows,
  ordered by `branch_order`. Almost every item has exactly one, unconditional
  ("always") branch.
- Each branch has an **anchor** (`announcement` / `bsd` / `site_visit` /
  `pre_bid` / `predecessor`) and an **offset**. A `predecessor` branch chains
  off another item's own resolved date — this is how the whole project's
  schedule self-propagates from `announcement_date` forward.
- A handful of items (~14) carry multiple branches with **conditions**
  (`scope_contains_pbu`, `site_visit_unset`, `tender_window_lt_days`) — the
  first branch whose condition is true wins, no fallthrough. Every
  non-`always` condition is gated to L0-non-international only
  (`rules._branch_condition_met`).
- **Milestones are not a separate concept.** A catalog item flagged
  `is_milestone=True` with a `milestone_code` (M1–M6 for L1, similar for L0)
  IS the milestone — "reached" means that specific submission's status is
  `APPROVED`. See `backend/routers/milestones.py` — there's no "mark
  milestone reached" endpoint anywhere, deliberately.
- A predecessor chain doesn't anchor on the predecessor's *planned* due
  date once that date is in the past and the predecessor is still open —
  it anchors on `today` instead, so a late predecessor keeps sliding every
  downstream date forward for as long as it stays open
  (`rules._predecessor_anchor_date`).
- `recompute_project_due_dates` re-runs this engine for every submission on
  a project, iterating a few passes until nothing changes (chains are
  shallow in practice) — called after triage, after any approval, and
  nightly by the scheduler.

## Scoring (`rules.kpi_points`)

Once a submission is `APPROVED`, it earns 1.1 (early) / 1.0 (on time, with a
**4-day grace window** — see the Performance tab's own "Delay Tolerance"
note in `index.html`) / 0.9 / 0.8 / 0.7 / 0.6 / 0.0 depending on how late it
landed. This feeds department/individual Performance rankings
(`backend/routers/dashboard.py`). An Admin can weight one item higher than
its siblings (`DeliverableDefinition.kpi_weight`) and toggle items in/out of
scoring entirely (Manage Tracking).

## Providers: storage and mail

`backend/providers/storage.py` and `mail.py` each expose one function
signature with two implementations, switched by an environment variable
(`STORAGE_BACKEND`, `MAIL_BACKEND`) — `local`/`console` (default, no
external account needed) or `onedrive`/`graph` (real Microsoft 365, needs
`graph_auth.py`'s one-time device-code setup). Every route already calls
through these interfaces; switching backends is a config change, not a code
change. See `README.md`'s "Switching to real OneDrive + real email" section.

**Known limitation**: on Render's current plan there's no persistent disk,
so the `local` storage backend's files are lost on redeploy/restart. The
database is unaffected (separate managed Postgres). This resolves itself
once `STORAGE_BACKEND=onedrive` is connected.

## Identity and permissions (read before doing any SSO work)

There is currently no real per-user authentication. Every action carries a
self-reported `actor_email`/`actor_role` (typed or picked in the UI, trusted
as-is by the backend). `rules.can_act(actor_role, actor_email,
assigned_email)` is the one function nearly every permission check in the
app routes through — `Admin` always passes; otherwise the actor's email must
appear in the assigned list.

`rules.is_assigned_email` is the same membership check **without** the
Admin bypass — it exists specifically to detect genuine self-approval (the
same real person assigned as both Owner and SME on one item) without
misfiring when a real Admin reviews someone else's work. See
`backend/routers/deliverables.py`'s `mark_complete`/`review_deliverable` for
where this is enforced.

If/when real SSO is wired in (see `docs/RUNBOOK.md`), the natural seam is
`rules.can_act`'s `actor_email` parameter — swap where that value comes from
(a verified token/header instead of a request field), and the permission
logic downstream doesn't need to change.

## Rate limiting

`backend/main.py`'s `RateLimitMiddleware` — a blanket per-client-IP request
cap (`RATE_LIMIT_PER_MINUTE`, default 300), a safety net against something
clearly broken (a buggy polling loop, a runaway script), not a tight
per-user throttle. Keyed by IP because there's still no verified identity to
key on (see "Identity and permissions" above).

It's hand-written rather than using the `slowapi` package's own middleware,
despite `slowapi` being the standard choice for this. That was the first
implementation, and it looked correctly configured — but its route-handler
resolution silently no-ops against this FastAPI version (0.141.1): a route
registered via `app.include_router()` (every real route in this app) is
wrapped in an internal `_IncludedRouter` with no top-level `.endpoint`
attribute, which `slowapi`'s handler lookup requires; failing to find one,
it treats the route as exempt. The rate limiter appeared to work (it
correctly limited `/` and `/health`, the two routes declared directly on
`app`) while doing nothing at all on any `/api/*` route — confirmed by
directly instrumenting `slowapi`'s own resolution function, not assumed.
The replacement uses the `limits` package (`slowapi`'s own underlying
dependency) directly, checking `request.url.path` against a plain exempt
set instead of resolving a route handler at all. If `slowapi` is
reintroduced later (e.g. for its per-route `@limiter.limit(...)` decorators,
which don't depend on the broken middleware-level resolution), re-verify
this against whatever FastAPI version is installed at the time first.

## Background jobs

`backend/scheduler.py` runs one in-process `asyncio` loop, started in
`main.py`'s startup event — not a host-level cron job. It handles due-soon
nudges (1 day before), escalating overdue reminders (2/7/14 days), and
batches same-day notices into one email per person. If the process
restarts, the loop just restarts with it; there's no persisted job queue.

## Frontend structure

`frontend/static/app.js` is one large IIFE. There is no component framework
or virtual DOM — each "view" (Dashboard, L0 Tenders, Project Detail, etc.)
is a render function that builds real DOM nodes directly, gated by
`switchView()`. Constants like `DEADLINE_META`/`STATUS_META`/`NAV_ICONS` are
exported at the very end of the file via `window.__app` for the mobile UI
prototype (`mobile-v2` branch, not merged to `main`) to reuse without
duplicating business logic.

`frontend/static/js/landing.js` is a separate module (real ES module,
loaded via `<script type="module">`) — a Three.js 3D transformer scene used
as the landing/sign-in page, ported from a design-tool prototype. It has no
dependency on `app.js` and communicates only via a `sessionStorage` flag
(`hvSignedIn`) and DOM visibility.

## Testing

See `tests/` and `docs/RUNBOOK.md`'s "Running tests" section. Tests run
against a throwaway SQLite database seeded via the real `backend.seed.run()`
bootstrap — the same one every production deploy runs — not a hand-rolled
fixture catalog. This means the tests exercise the real formula/scoring/
milestone logic against real catalog shapes, and will also catch a seed data
mistake (a malformed branch, a broken predecessor reference) as a side
effect.

## Things that look like bugs but aren't

- Two "3.8" items existing on the same L1 project simultaneously —
  intentional. Scope-driven department routing (OHTL/UGC → Procurement
  (PBU), SS → Supply Chain) means a mixed-scope project can have both
  departments' variants of the same item number active at once. See
  `rules._SCOPE_ROUTED_DEPARTMENTS`.
- A deliverable's `due_date` staying frozen after approval even though the
  formula engine re-runs nightly — deliberate. Once `APPROVED`,
  `recompute_project_due_dates` skips it; the original planned date is what
  scoring compares the real submission date against (overwriting it would
  make everything score as always-on-time).
- `SubmissionStatus` still defining retired values (`NOT_DUE`, `DUE`,
  `OVERDUE`, `PENDING_COMPLETION`) — kept only because Postgres enum labels
  can't be dropped once added; a one-time migration in `seed.py` already
  moved every real row off them.
