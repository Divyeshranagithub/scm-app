"""Seeds a dedicated SQLite file with a realistic *volume* of projects for
load testing -- real production currently holds a small number of projects
(dozens), so testing against an empty or lightly-seeded database would tell
us nothing about how the dashboard/matrix/performance aggregates behave as
the platform actually scales up across Algihaz. This creates every project
through the real creation code path (routers.projects.create_l0_project /
create_l1_project), not hand-inserted rows, so the data is shaped exactly
the way production data is shaped -- real computed due dates, real
applicability states, real folder paths.

Usage:
    python loadtest/seed_data.py [project_count]

Writes to loadtest/loadtest.db (SQLite) -- never data/app.db, never a real
database. Safe to re-run; each run starts from a fresh file.
"""
import contextlib
import io
import os
import random
import sys
import time
from datetime import date, timedelta
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(APP_DIR))

DB_PATH = Path(__file__).resolve().parent / "loadtest.db"
if DB_PATH.exists():
    DB_PATH.unlink()
os.environ["DATABASE_URL"] = "sqlite:///" + str(DB_PATH).replace("\\", "/")

from backend.main import app  # noqa: E402 -- triggers create_all against loadtest.db
from backend.database import SessionLocal  # noqa: E402
from backend import models, schemas, rules, seed  # noqa: E402
from backend.routers.projects import create_l0_project, create_l1_project  # noqa: E402

seed.run()  # populates departments, the deliverable catalog, and the Bid Manager roster

REGIONS = ["COA", "SOA", "EOA", "WOA"]
SCOPES = [
    ["SS HV (110-132 KV)"], ["SS MV (Distribution)"], ["OHTL EHV (230-400 KV)"],
    ["UGC HV (110-132 KV)"], ["SS EHV (230-400 KV)"],
]
BID_MANAGERS = [
    "ahmad.mhaidat@algihaz.com", "mohammad.abujubeh@algihaz.com", "yasser.halawa@algihaz.com",
    "husam.abualhayjaa@algihaz.com", "amer.freihat@algihaz.com",
]


def _random_project_payload(n: int) -> schemas.ProjectCreateL0:
    announce = date.today() - timedelta(days=random.randint(10, 400))
    return schemas.ProjectCreateL0(
        est_no=f"LOAD-{n:05d}",
        name=f"Load Test Project {n}",
        region=[random.choice(REGIONS)],
        scope=random.choice(SCOPES),
        bid_manager=random.choice(BID_MANAGERS),
        announcement_date=announce,
        bsd=announce + timedelta(days=random.randint(20, 60)),
    )


def _triage_all_applicable(db, project_id: int) -> None:
    """Bulk-applies BM triage without going through the HTTP endpoint --
    same effect (applicability flips to "applicable", due dates compute),
    much faster for seeding hundreds of projects than one HTTP call per item.
    """
    pending = (
        db.query(models.DeliverableSubmission)
        .filter(models.DeliverableSubmission.project_id == project_id, models.DeliverableSubmission.applicability == "pending")
        .all()
    )
    for sub in pending:
        sub.applicability = "applicable"
    db.commit()


def _simulate_some_progress(db, project_id: int, approve_fraction: float) -> None:
    """Directly resolves a fraction of a project's applicable submissions to
    Approved, with real submitted_at/reviewed_at timestamps -- gives the
    scoring/performance/matrix aggregates real varied data to compute over
    instead of every row sitting at "no progress yet", which would make
    those endpoints artificially cheap to query.
    """
    subs = (
        db.query(models.DeliverableSubmission)
        .filter(models.DeliverableSubmission.project_id == project_id,
                models.DeliverableSubmission.applicability == "applicable",
                models.DeliverableSubmission.status == models.SubmissionStatus.NO_PROGRESS,
                models.DeliverableSubmission.due_date.isnot(None))
        .all()
    )
    from datetime import datetime
    for sub in subs:
        if random.random() > approve_fraction:
            continue
        lateness = random.choice([-3, -1, 0, 0, 2, 6, 10])  # mostly on-time/early, some late
        finished = sub.due_date + timedelta(days=lateness)
        sub.status = models.SubmissionStatus.APPROVED
        sub.submitted_at = datetime.combine(finished, datetime.min.time())
        sub.reviewed_at = datetime.combine(finished, datetime.min.time())
        sub.review_comment = "Load test synthetic approval."
    db.commit()


def main():
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 300
    l1_fraction = 0.4  # roughly matches the platform's own real conversion-rate ballpark

    db = SessionLocal()
    t0 = time.time()
    l0_ids = []
    # The console mail provider prints every simulated email to stdout --
    # fine for interactive use, pure noise (and I/O overhead) across
    # hundreds of synthetic projects here.
    sink = io.StringIO()
    try:
        with contextlib.redirect_stdout(sink):
            for n in range(1, count + 1):
                payload = _random_project_payload(n)
                project = create_l0_project(payload, db)
                _triage_all_applicable(db, project.id)
                rules.recompute_project_due_dates(db, project, force=True)
                db.commit()
                _simulate_some_progress(db, project.id, approve_fraction=0.5)
                l0_ids.append(project.id)
                if n % 25 == 0:
                    print(f"  ...{n}/{count} L0 projects created ({time.time() - t0:.0f}s elapsed)", file=sys.stderr)

            random.shuffle(l0_ids)
            l1_count = int(count * l1_fraction)
            for i, l0_id in enumerate(l0_ids[:l1_count], start=1):
                payload = schemas.ProjectCreateL1(
                    l0_source_id=l0_id, announcement_date=date.today() - timedelta(days=random.randint(5, 200)),
                    project_manager="Test PM",
                )
                l1 = create_l1_project(payload, db)
                rules.recompute_project_due_dates(db, l1, force=True)
                db.commit()
                _simulate_some_progress(db, l1.id, approve_fraction=0.4)
                if i % 25 == 0:
                    print(f"  ...{i}/{l1_count} L1 projects created ({time.time() - t0:.0f}s elapsed)", file=sys.stderr)

        n_subs = db.query(models.DeliverableSubmission).count()
        elapsed = time.time() - t0
        print(f"\nSeeded {count} L0 projects ({l1_count} converted to L1), {n_subs} deliverable submissions total.")
        print(f"Took {elapsed:.1f}s. Database: {DB_PATH}")
        print(f"\nTo run the app against this data:\n  DATABASE_URL=sqlite:///{DB_PATH.as_posix()} uvicorn backend.main:app")
    finally:
        db.close()


if __name__ == "__main__":
    main()
