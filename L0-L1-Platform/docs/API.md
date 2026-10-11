# API Reference

This is a map of the API surface, organized by resource — what each router
owns and what its key endpoints do. It is deliberately **not** a full
parameter-by-parameter reference: FastAPI already generates that, live and
accurate, from the real Pydantic schemas — a hand-written copy would drift
the first time a field changes. For exact request/response shapes:

- **Interactive**: run the app, open `/docs` (Swagger UI) or `/redoc`.
- **Machine-readable**: `GET /openapi.json`.
- **Authoritative source**: `backend/schemas.py` (request/response models)
  and the router file itself (path, query params, status codes).

All routes are prefixed `/api`. `actor_email`/`actor_role` appear on nearly
every write endpoint — see `docs/ARCHITECTURE.md`'s "Identity and
permissions" section for what these mean today and how that's expected to
change.

Every route (except `/health`) is also behind a blanket per-client-IP rate
limit (default 300/minute, see `docs/ARCHITECTURE.md`'s "Rate limiting") —
a client that exceeds it gets a `429` with `{"detail": "Too many requests
-- please slow down and try again shortly."}`.

## Projects — `backend/routers/projects.py` (`/api/projects`)

Tender/project CRUD, BM triage, and the L0→L1 transition.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/projects` | List projects (filterable by stage/status/archived) |
| POST | `/api/projects/l0` | Create a new L0 tender — provisions the full deliverable catalog and folder structure |
| POST | `/api/projects/l1` | Create an L1 project from an existing L0 — keeps the L0's `est_no`, closes the L0 out |
| GET | `/api/projects/{id}` | Full project detail |
| DELETE | `/api/projects/{id}` | Delete a project (admin) |
| POST | `/api/projects/{id}/triage` | Bid Manager's applicable/not-required call per catalog item |
| GET | `/api/projects/{id}/triage-defaults` | The BM's remembered per-item triage defaults |
| GET | `/api/projects/bm-triage-status` | Every active tender's triage progress, for the BM Triage Status page |
| GET | `/api/projects/{id}/deliverables` | Every deliverable submission on this project |
| GET | `/api/projects/{id}/history` | Full activity trail for the project |
| PATCH | `/api/projects/{id}/details` | Edit editable project fields (scope, dates, etc.) |
| PATCH | `/api/projects/{id}/status` | Change project status |
| PATCH | `/api/projects/{id}/archive` | Archive/unarchive |
| PATCH | `/api/projects/{id}/project-manager` | Set the PM (auto-completes the "2.3" deliverable) |
| GET/PATCH | `/api/projects/{id}/bid-value` | Bid value, gated behind a real access-grant flow |
| POST | `/api/projects/{id}/bid-value/request-access` | Request to view a bid value you don't already have access to |
| GET/POST | `/api/projects/{id}/tender-documents` | Tender document folder contents / upload |

## Deliverables — `backend/routers/deliverables.py` (`/api/deliverables`)

The submit → review → approve/reject cycle, plus every due-date/reassignment
request type. This is the busiest router in the app — read
`docs/ARCHITECTURE.md`'s due-date engine section before changing anything
here.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/deliverables` | Assigned Deliverables — every submission assigned to a person as Owner or SME |
| GET | `/api/deliverables/{id}` | Full detail for one submission |
| POST | `/api/deliverables/{id}/upload` | Attach a document |
| POST | `/api/deliverables/{id}/mark-complete` | The only trigger for SME review — see `docs/ARCHITECTURE.md`'s permissions section for the self-approval guard here |
| POST | `/api/deliverables/{id}/review` | SME's approve/reject on a Pending SME Review item (multipart — can attach a file) |
| POST | `/api/deliverables/{id}/reopen` | Send an approved (or Not Required) item back into the normal workflow |
| POST | `/api/deliverables/{id}/mark-not-required` | Mark an item Not Required outside the initial BM triage pass |
| POST | `/api/deliverables/{id}/follow` | Follow/unfollow for update notifications |
| POST | `/api/deliverables/{id}/extension-request` | Owner requests a due-date extension |
| POST | `/api/deliverables/{id}/hold-request` | Owner requests a hold (pauses lateness) |
| GET/POST | `/api/deliverables/due-date-requests` | Pending extension/hold requests + decide |
| POST | `/api/deliverables/{id}/reassign-request` | Request a different Owner/SME |
| GET/POST | `/api/deliverables/reassignment-requests` | Pending reassignment requests + decide |
| GET | `/api/deliverables/follow-up` | Every overdue deliverable, grouped by department |
| POST | `/api/deliverables/bulk-remind` / `bulk-remind-advanced` | Send reminders to multiple people at once |
| GET | `/api/deliverables/{id}/history` | Per-item activity trail |

## Deliverables Configuration — `backend/routers/deliverables_config.py` (`/api/deliverables/admin`, `/config`)

Admin CRUD over the catalog itself (formulas, weights, branches), change
history + revert, and the Owner/SME "suggest a formula change" flow. Shares
`deliverables.py`'s URL prefix but every route here has a second path
segment (`admin/...`, `config/...`) so the two never collide.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/deliverables/admin/definitions` | List every catalog definition (admin) |
| PATCH | `/api/deliverables/admin/definitions/{id}` | Edit a definition's fields |
| PUT | `/api/deliverables/admin/definitions/{id}/branches` | Replace a definition's formula branches |
| POST | `/api/deliverables/admin/definitions/{id}/restore-default` | Revert a definition to its seeded default |
| GET/POST | `/api/deliverables/admin/change-history` | Full audit trail of catalog edits, with revert |
| GET | `/api/deliverables/config/formulas` | Public-facing "Deliverables Catalog" — every formula in plain English |
| GET/POST | `/api/deliverables/config/formula-change-requests` | Suggest a formula/weight change, and the admin decide queue |

## Milestones — `backend/routers/milestones.py` (`/api/projects/{id}/milestones`)

One read-only endpoint. Milestones are derived, not stored — see
`docs/ARCHITECTURE.md`. There is deliberately no write endpoint here.

## Dashboard — `backend/routers/dashboard.py` (`/api/dashboard`)

Every aggregate view: the landing-page snapshot, the deliverables matrix,
and Performance/Top Achievers.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/dashboard` | The main landing-page payload (stats, feeds, concerns) |
| GET | `/api/dashboard/matrix` | Every active project × every tracked deliverable, live |
| GET | `/api/dashboard/performance` | On-time-rate by department/person |
| GET | `/api/dashboard/performance/breakdown` | The By Deliverable weighted breakdown table |
| GET | `/api/dashboard/top-achievers` | Best-performing Owners/SMEs |
| GET | `/api/dashboard/lifetime-kpis` | Lifetime totals (L0/L1 counts, conversion rate, etc.) |

## Departments — `backend/routers/departments.py` (`/api/departments`)

Department CRUD, Focal Points, the Bid Manager and general User roster,
SME self-nominations, and L0-L1 Group add requests.

| Method | Path | Purpose |
|---|---|---|
| GET/POST/PATCH/DELETE | `/api/departments` | Department CRUD |
| PATCH | `/api/departments/{id}/focal-point` | Set a department's focal point |
| GET | `/api/departments/deliverable-focal` / PATCH `/{id}` | Per-item focal point overrides |
| GET | `/api/departments/performance-triage` / PATCH `/{id}` | Manage Tracking — toggle a catalog item in/out of scoring |
| GET/POST/PATCH/DELETE | `/api/departments/bid-managers` | Bid Manager directory |
| GET/POST/DELETE | `/api/departments/users` | The general roster (item 75's "L0-L1 Group") |
| GET/POST | `/api/departments/sme-nominations` | Self-nominate as an item's SME + admin decide |
| GET/POST | `/api/departments/user-add-requests` | Request to add someone to the roster + admin decide |
| GET/POST | `/api/departments/change-history` | Audit trail for department edits, with revert |

## Gantt — `backend/routers/gantt.py` (`/api/gantt`)

Read-only, derived entirely from the same due-date data as everything else —
no separate schedule is stored.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/gantt/projects/{id}` | Gantt bars for one project |
| GET | `/api/gantt/timeline` | Pooled Gantt across every active project |

## Support / Ask the Team — `backend/routers/support.py` (`/api/support`)

The in-portal question queue to Admins, and the Knowledge Base.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/support` | All open questions (admin: Open Questions view) |
| GET | `/api/support/mine` | A person's own submitted questions (My Requests) |
| GET | `/api/support/kb` | Knowledge Base entries |
| POST | `/api/support` | Ask a new question |
| POST | `/api/support/{id}/reply` | Admin reply |
| POST | `/api/support/{id}/respond` | Asker follow-up |
| PATCH | `/api/support/{id}/resolve` | Mark resolved |

## AI Support / GAHIZ — `backend/routers/ai_support.py` (`/api/ai-support`)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/ai-support/usage` | A person's remaining daily message count |
| POST | `/api/ai-support/chat` | Send a message to GAHIZ — calls the Anthropic API, requires `ANTHROPIC_API_KEY` |

Read-only tool access to real live data (any project/deliverable/person),
same visibility ceiling as the rest of the app for a self-reported identity
— see the module's own docstring for why. Bid Value is the one field kept
behind its real access-grant check even here.

## PO Line Items — `backend/routers/po_line_items.py` (`/api/projects/{id}/po-line-items`)

Read-only summary of the PO Lifecycle tab (L1 only) — every owner action
that drives this happens on the normal Deliverables endpoints instead; this
router has no write endpoints of its own besides the one bulk-skip action.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/projects/{id}/po-line-items` | Every named line item's step-chain progress |
| GET | `/api/projects/{id}/po-line-items/po-cycle-summary` | Rolled-up summary |
| POST | `/api/projects/{id}/po-line-items/mark-all-not-required/{item_no}` | Bulk-skip a category |

## Reports — `backend/routers/reports.py` (`/api/reports`)

Admin-only cross-project aggregates that don't belong to any single
project/department page. (Performance Report itself reuses
`/api/dashboard/performance` directly, not this router.)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/reports/master-po` | Every PO line item across every L1 project, flat |
| GET | `/api/reports/budget-status` | Items 6.1/6.2/6.3 across every L1 project |

## Announcements — `backend/routers/announcements_router.py` (`/api/announcements`)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/announcements` | Announcements/Reminders feed (filterable) |
| DELETE | `/api/announcements/reminders` | Clear reminders |

## Export — `backend/routers/export.py` (`/api/export`)

One generic endpoint every table in the app shares.

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/export/xlsx` | Takes `{columns, rows}` (whatever a table is currently showing, client-side filtered/sorted) and returns a real styled `.xlsx` |

## What's *not* an API endpoint

`GET /` serves the frontend shell (`index.html`) with cache-busted asset
URLs. `GET /health` is a plain liveness check. Static files are served
under `/static` (app assets, no-cache) and `/local-files` (uploaded files
when `STORAGE_BACKEND=local`).
