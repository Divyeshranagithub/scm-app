# Load testing

Tools to generate a realistic volume of data and run a load test against it
locally. Not part of the app, not part of the automated test suite (`tests/`)
-- a manual diagnostic kit, run when you need to check performance at scale.

## Usage

```
pip install -r ../requirements-dev.txt locust
python seed_data.py 300           # seeds loadtest/loadtest.db with 300 L0 projects (~40% converted to L1)

# in another terminal, run the app against that data:
#   Windows:      set DATABASE_URL=sqlite:///%cd%/loadtest/loadtest.db && uvicorn backend.main:app --port 8010
#   Mac/Linux:    DATABASE_URL=sqlite:///$(pwd)/loadtest/loadtest.db uvicorn backend.main:app --port 8010

locust -f locustfile.py --host http://127.0.0.1:8010 --headless -u 50 -r 5 -t 60s --csv results
```

`loadtest.db`, `*.log`, and `results*` are gitignored -- regenerate them,
don't commit them.

## Known limitation: this only tests SQLite

There's no local Postgres available to test against directly, and SQLite's
concurrency model (a single-writer file lock) is fundamentally different
from Postgres's. **Absolute request-per-second numbers from this setup do
not represent production.** What *does* transfer: per-request query-level
cost (an N+1 pattern, a missing eager-load, redundant computation) shows up
the same way regardless of database engine — that's what this caught. If a
real Postgres instance becomes available (even a throwaway one), re-running
the same `locustfile.py` against it would give trustworthy throughput/
concurrency numbers this setup can't.

## Findings from the 2026-09-22 pass (300 projects, ~30k submissions)

- **L0 project creation: 3.4s → 0.3s (11x).** `_instantiate_deliverables`'s
  notification tail was re-scanning every submission once per department
  with `.definition` lazy-loaded per access — O(departments × submissions)
  with an N+1 query on top. Fixed in `backend/routers/projects.py`.
- **`GET /api/dashboard`: 4.5s → 2.5s.** `rules.deadline_status()` was being
  called a second time per submission in the department loop, duplicating
  work already done once earlier in the same function. Fixed in
  `backend/routers/dashboard.py`.
- **Same redundant-`deadline_status()`-call pattern still exists** at three
  other spots in `dashboard.py` (grep `rules.deadline_status(` — lines near
  350, 661-670, and 968 as of this writing). Not fixed yet — each sits in a
  different function this pass didn't have full context on, and dashboard.py
  is large enough (1100+ lines, already through several earlier rounds of
  performance work — see its own "[Dashboard perf]" comments) that changing
  it without reading each surrounding function fully risks a regression.
  Worth a dedicated follow-up pass.
- **No explicit DB connection pool size.** `backend/database.py` was using
  SQLAlchemy's default (5 + 10 overflow = 15 total connections) for both
  SQLite and Postgres. At 50 concurrent simulated users this is what
  actually failed first (`QueuePool limit ... reached, connection timed
  out`), before any endpoint's own query cost became the bottleneck. Bumped
  to 10 + 20 for Postgres specifically (SQLite keeps the default — its own
  constraint is the file lock, not this). Fixed in `backend/database.py` —
  the comment there flags that this number should be re-checked against
  whatever Postgres plan/instance the platform ends up hosted on.
