# Algihaz L0/L1 Platform — Pilot

Real backend (FastAPI + SQLAlchemy), real frontend, running against a local
SQLite database and local file storage by default so it's fully testable
without any external accounts. Swaps to real OneDrive/Outlook and a real
Postgres database via environment variables only — no code changes.

## Run locally

```
pip install -r requirements.txt
python -m backend.seed
uvicorn backend.main:app --reload
```

Open http://127.0.0.1:8000

## Running tests

```
pip install -r requirements-dev.txt
pytest
```

## Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — how the system is
  built: the data model, the due-date/scoring engine, the storage/mail
  provider pattern, identity/permissions, and a few things that look like
  bugs but aren't.
- **[docs/API.md](docs/API.md)** — the API surface, organized by resource.
  For exact request/response shapes, run the app and open `/docs`.
- **[docs/RUNBOOK.md](docs/RUNBOOK.md)** — environment variables, deployment
  (including moving to the Algihaz environment), how a schema/catalog change
  actually ships, and troubleshooting.
