# Runbook

Operational reference — day-to-day tasks, deployment, and what to do when
something breaks. For what the system *is*, see `docs/ARCHITECTURE.md`. For
the API surface, see `docs/API.md`.

## Local setup

```
pip install -r requirements.txt
python -m backend.seed
uvicorn backend.main:app --reload
```

Open http://127.0.0.1:8000. No external accounts needed — defaults to a
local SQLite file (`data/app.db`) and local file storage.

## Running tests

```
pip install -r requirements-dev.txt
pytest
```

See `loadtest/README.md` for load testing — generating a realistic-volume
dataset and running Locust against it, plus findings and fixes from the
2026-09-22 pass (an 11x fix on L0 project creation, a dashboard query-count
reduction, and DB connection pool sizing).

Runs against a throwaway SQLite file (never `data/app.db`), seeded via the
real `backend.seed.run()` bootstrap. See `tests/conftest.py`.

## Environment variables

None of these are required for local dev — every one has a safe fallback.

| Variable | Purpose | Fallback when unset |
|---|---|---|
| `DATABASE_URL` | Postgres connection string | Local SQLite file |
| `DB_SCHEMA` | A dedicated Postgres schema within a shared database (e.g. the Algihaz UAT server, where `scm`/`tender`/`incident`/`kpi`/... each already get their own schema in one shared `dronahq_prod_postgres` database) | The connection's own default schema (`public` on a plain Postgres connection, or whatever a dedicated database already defaults to) |
| `APP_BASE_URL` | Used to build links inside emails/notifications | `https://l0l1-platform.onrender.com` |
| `ANTHROPIC_API_KEY` | Powers GAHIZ (`/api/ai-support/chat`) | GAHIZ returns a 503 ("not configured yet") |
| `STORAGE_BACKEND` | `local` or `onedrive` | `local` |
| `MAIL_BACKEND` | `console` or `graph` | `console` (logs instead of sending) |
| `GRAPH_CLIENT_ID` / `GRAPH_CLIENT_SECRET` / `GRAPH_TENANT_ID` / `GRAPH_REFRESH_TOKEN` | Real OneDrive/Outlook access, one shared service identity (not per-user) | Graph providers raise a clear setup error if selected without these set |
| `RATE_LIMIT_PER_MINUTE` | Per-client-IP request cap (see `backend/main.py`'s `RateLimitMiddleware`) | `300` |
| `SESSION_SECRET` | Signs the session JWT (`backend/auth.py`) | An insecure local-dev-only default — **must** be set in any real environment |
| `BOOTSTRAP_ADMIN_EMAILS` | Comma-separated emails to seed as the first Admin(s) — see "First Admin / onboarding" below | None (no one can sign in as Admin until this runs once) |

`SIGNIN_PASSWORD` **no longer exists** — the shared-password sign-in gate
was removed 2026-09-15 in favor of real per-user SSO login (see "Sign-in /
roles" below). If you see any reference to it in old notes, it's stale.

## Sign-in / roles

Identity comes from the DronaHQ container profile (email only, no password —
see `backend/auth.py`'s docstring) via `POST /api/auth/session`. An email not
yet on the roster (`users` table) gets auto-filed as a pending Group Add
Request and sees a "waiting for access" screen instead of the app — it needs
an Admin to act on it, same as every other role grant.

### First Admin

Nobody can reach Admin through the app itself on a brand-new roster — every
path onto it (Focal Points → L0-L1 Group, Requests → Group Add Requests)
itself requires an existing Admin to use. `BOOTSTRAP_ADMIN_EMAILS` is the
one-time way out of that:

1. Set `BOOTSTRAP_ADMIN_EMAILS=someone@algihaz.com[,another@algihaz.com]` in
   the environment.
2. Run `python -m backend.seed` (the existing build/deploy step — see
   **Deployment** below). Each listed email that isn't already on the roster
   is added with `role=Admin`.
3. That person opens the app and signs in via SSO — they land as Admin
   immediately, no pending screen.

This is create-only and safe to leave set permanently: an email already on
the roster is never touched, even by a later `seed` run, so it can't
silently re-promote someone an Admin deliberately demoted afterward.

### Onboarding everyone else

Once at least one real Admin exists, they add people from **Focal Points →
L0-L1 Group** (name + email + role — upserts, so it also works as "fix this
person's role" later) or decide the **Requests → Group Add Requests** queue
that a first-time sign-in auto-files (always proposed as Viewer; the Admin
can approve as-is or add the person directly with a different role instead).
Adding someone proactively, before they ever open the app, means their first
sign-in just works with no pending screen at all.

### Setting up real OneDrive/Outlook

1. Register an app at portal.azure.com — see the comment block at the top
   of `backend/providers/graph_auth.py` for exact steps (Graph delegated
   permissions: `Files.ReadWrite`, `Mail.Send`, `User.Read`,
   `offline_access`).
2. Set `GRAPH_CLIENT_ID`, `GRAPH_CLIENT_SECRET`, `GRAPH_TENANT_ID`.
3. Run `python -m backend.providers.graph_auth` once, locally — walks
   through a one-time device-code sign-in and prints the
   `GRAPH_REFRESH_TOKEN` value to add to your env vars. After that, the app
   renews its own access token automatically.
4. Set `STORAGE_BACKEND=onedrive` and `MAIL_BACKEND=graph`.

This authenticates as **one fixed service identity acting on behalf of the
app**, not real per-user SSO login — unrelated to the identity/login work
described below.

## Deployment

### Current: Render

The repo includes `render.yaml`. Render dashboard → **New** → **Blueprint**
→ connect the repo → it provisions the web service and a managed Postgres
database together.

- **Build**: `pip install -r requirements.txt && python -m backend.seed`
- **Start**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

**Known limitation**: no persistent disk on the current plan, so
`STORAGE_BACKEND=local` uploads are lost on redeploy/restart. The database
itself is unaffected (separate managed service). Resolves once
`STORAGE_BACKEND=onedrive` is connected.

### Moving to the Algihaz environment

As of 2026-09, the platform is being onboarded into Algihaz's own
environment (their existing SSO, domain, and database platform) by the
Digitalization Team.

**Database**: the UAT Postgres server already shared by `scm` and ~18 other
projects (one database, one schema per project) now also has an `l0l1`
schema, created via `DB_SCHEMA=l0l1` (see the env var table above) and
seeded with the full department/catalog data — created additively
(`CREATE SCHEMA IF NOT EXISTS`), reusing the same connection credentials
`scm`'s own backend uses. No other project's schema/data was touched or
read beyond a one-time `information_schema` listing to confirm `l0l1`
wasn't already taken. `BOOTSTRAP_ADMIN_EMAILS` (see "First Admin" above)
still needs to be set and `backend.seed` re-run once more to actually grant
the first real Admin on this environment — that wasn't done as part of the
schema setup itself, since it's a deployment decision (whose email), not a
schema one.

Two more things they'll need beyond the source code:

1. **Confirm the database engine is PostgreSQL.** The app uses
   Postgres-specific features (native enum types, `psycopg2`). A different
   engine is a real porting task, not a config change.
2. **A schema-only DDL export** can be generated on request directly from
   the SQLAlchemy models (no live database connection needed) — real,
   runnable PostgreSQL, structure only, zero project data.

If they run apps as containers, note there is currently no `Dockerfile` in
this repo — one should be added before that handoff, not requested
after.

## Schema evolution — how a migration actually ships

There is no separate migration tool (no Alembic). `backend/seed.py` itself
calls `models.Base.metadata.create_all(bind=engine)` at module level (not
inside `run()`) — this is *why* `python -m backend.seed` alone is enough to
bootstrap a genuinely empty database: importing the module creates every
table from scratch. Around that one call, `seed.py` also contains, at
module level (so these also run the instant `backend.seed` is imported, not
only when `run()` is called):

```python
ensure_column("table_name", "column_name", "SQL_TYPE")
ensure_enum_value("table_name", "column_name", "NEW_VALUE")
ensure_index("table_name", "index_name", "column_name")
ensure_not_unique("table_name", "column_name")
```

These are idempotent (`backend/database.py`) — safe to run on every deploy,
no-op if already applied. **To ship a schema change**: edit the model in
`models.py`, then add the matching `ensure_*` call in `seed.py`. On the next
deploy, Render's build step (`python -m backend.seed`) applies it
automatically to production — no manual database step.

**Where to add the call matters.** `ensure_*` calls before the
`create_all()` line guard themselves with `inspector.has_table(...)` (a
no-op on a table that doesn't exist yet — see `ensure_column`'s docstring),
because on a genuinely fresh database they run before that table exists at
all. A call for a column on a **brand-new table** (one `create_all()` is
about to create for the first time) has to go *after* the `create_all()`
line, or it'll always no-op on a fresh database — `due_date_requests`' own
index is the existing example of this in `seed.py`. A call for a column on
an **already-existing table** can go on either side; existing convention is
to add it near wherever that table's other columns are already listed.

Locally, this does **not** run on server start — after editing
`seed.py`/`models.py`, either restart and let the next `python -m
backend.seed` pick it up, or delete `data/app.db` and let `create_all()`
rebuild it fresh from the current models (SQLite can't `ALTER TABLE` to add
or drop a constraint the way Postgres can — see `ensure_not_unique`'s own
docstring).

## Catalog changes (departments, deliverable items, formulas)

The department/deliverable catalog is also seeded from `seed.py` — adding a
new catalog item, moving one between departments, or changing a formula's
default branches is a `seed.py` edit, matched by a redeploy. Runtime edits
made through the admin UI (Deliverables Configuration) are stored directly
in the database and are independent of this — `seed.py`'s catalog only sets
the *initial*/*default* shape, and `restore-default` reads back from it.

## Background jobs

`backend/scheduler.py` runs one in-process loop (started in `main.py`'s
FastAPI startup event) — not a host-level cron job. If the process restarts,
the loop restarts with it; there's no persisted queue to worry about
recovering. If reminders/escalations stop firing, check the process is
actually running (not crashed) before assuming the job logic itself is
broken.

## GAHIZ / Anthropic API key

`ANTHROPIC_API_KEY` powers `/api/ai-support/chat`. If it expires or is
missing, GAHIZ returns "AI Support is temporarily unavailable" — nothing
else in the platform is affected (data, workflow, and every other feature
work independently of this key), and a failed call never counts against a
user's daily message quota. When rotating this key in a new environment,
create it under an organization-owned Anthropic account, not a personal one.

## Common troubleshooting

| Symptom | Likely cause | Check |
|---|---|---|
| GAHIZ says "temporarily unavailable" | `ANTHROPIC_API_KEY` missing/expired | Render/host env vars |
| Uploaded files disappear after a deploy | `STORAGE_BACKEND=local` with no persistent disk | Switch to `onedrive`, or attach a disk |
| Emails aren't arriving | `MAIL_BACKEND` unset/`console` | Server logs show the "would send email" line instead |
| A schema change "isn't showing up" locally | `seed.py` wasn't re-run after editing it | `python -m backend.seed` |
| Local dev DB won't accept a schema change | SQLite can't `ALTER` some constraints | Delete `data/app.db`, let it rebuild |
| A tab open across a deploy shows stale behavior | Browser cached the old `app.js`/`styles.css` | Hard refresh — `main.py`'s `index()` cache-busts by file mtime, but an already-loaded tab keeps what it has in memory |
