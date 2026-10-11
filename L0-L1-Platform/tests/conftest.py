"""Shared test fixtures.

DATABASE_URL is pointed at a throwaway SQLite file before backend.database
(and therefore backend.main) is ever imported -- database.py reads it once
at import time, so this has to happen before any other test module (or this
file) imports anything under `backend`. Real seed data (the full department/
deliverable catalog) is loaded once per test session via backend.seed.run(),
the exact same bootstrap Render runs on every deploy -- tests run against
the real catalog, not a hand-rolled stand-in.
"""
import os
import sys
import tempfile
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(APP_DIR))

_db_fd, _db_path = tempfile.mkstemp(suffix=".db")
os.close(_db_fd)
os.environ["DATABASE_URL"] = "sqlite:///" + _db_path.replace("\\", "/")

import pytest  # noqa: E402
from fastapi import HTTPException  # noqa: E402

from backend.main import app  # noqa: E402 -- triggers create_all against the test DB
from backend.database import SessionLocal  # noqa: E402
from backend import seed  # noqa: E402
from backend.auth import get_current_actor, require_admin, synthetic_actor  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

seed.run()

# Real auth needs a live DronaHQ session, which doesn't exist in a test
# process -- every route that takes `Depends(get_current_actor)`/
# `Depends(require_admin)` is overridden here to read a plain, test-set
# identity instead, via `synthetic_actor` (the same helper ai_support.py
# uses for its own non-session-backed lookups). Defaults to Admin so
# existing project/catalog setup calls keep working unchanged; a test that
# needs to act as a specific Owner/SME/stranger calls the `act_as` fixture
# first to switch identity for its own later requests.
_actor_state = {"role": "Admin", "email": "admin@algihaz.com", "name": "Admin"}


def _test_current_actor():
    return synthetic_actor(_actor_state["role"], _actor_state["email"], _actor_state["name"])


def _test_require_admin():
    actor = _test_current_actor()
    if actor.role != "Admin":
        raise HTTPException(403, "Admin access is required")
    return actor


app.dependency_overrides[get_current_actor] = _test_current_actor
app.dependency_overrides[require_admin] = _test_require_admin


@pytest.fixture(autouse=True)
def _reset_actor():
    _actor_state.update(role="Admin", email="admin@algihaz.com", name="Admin")
    yield


@pytest.fixture()
def act_as():
    """Switches the identity every subsequent request in this test acts as,
    e.g. `act_as("Owner", "owner@algihaz.com")`. Resets to Admin automatically
    at the start of the next test (see the autouse _reset_actor fixture above).
    """
    def _set(role: str, email: str, name: str | None = None):
        _actor_state.update(role=role, email=email, name=name or email)
    return _set


@pytest.fixture(scope="session")
def client():
    # Not entered as `with TestClient(app) as c:` on purpose -- that would
    # trigger main.py's startup event (the scheduler's background asyncio
    # loop), which has no reason to run during a test session.
    return TestClient(app)


@pytest.fixture()
def db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
