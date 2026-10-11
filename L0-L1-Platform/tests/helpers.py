"""Shared helpers for building real projects/submissions through the actual
API (not hand-inserted rows) so tests exercise the real creation/triage
code paths, not a shortcut around them.
"""
import random
from datetime import date, timedelta


def unique_est_no() -> str:
    return "Est-" + str(random.randint(900000, 999999))


def create_l0_project(client, **overrides) -> dict:
    payload = {
        "est_no": unique_est_no(),
        "name": "Test Project " + unique_est_no(),
        "region": ["COA"],
        "scope": ["SS HV (110-132 KV)"],  # auto-classifies as TBU, no manual business_units needed
        "bid_manager": "yasser.halawa@algihaz.com",
        "announcement_date": str(date.today()),
        "bsd": str(date.today() + timedelta(days=30)),
    }
    payload.update(overrides)
    r = client.post("/api/projects/l0", json=payload)
    assert r.status_code == 200, r.text
    return r.json()


def create_l1_project(client, l0_id: int, **overrides) -> dict:
    payload = {
        "l0_source_id": l0_id,
        "announcement_date": str(date.today()),
    }
    payload.update(overrides)
    r = client.post("/api/projects/l1", json=payload)
    assert r.status_code == 200, r.text
    return r.json()


def first_pending_triage_submission(db, project_id: int):
    """A real, non-milestone, non-auto-completed submission that still
    needs BM triage -- the normal starting state for most L0 deliverables.
    """
    from backend import models

    return (
        db.query(models.DeliverableSubmission)
        .join(models.DeliverableDefinition)
        .filter(
            models.DeliverableSubmission.project_id == project_id,
            models.DeliverableSubmission.applicability == "pending",
            models.DeliverableDefinition.is_milestone == False,  # noqa: E712
        )
        .first()
    )


def triage_applicable(client, project_id: int, submission_id: int):
    r = client.post(f"/api/projects/{project_id}/triage", json={
        "items": [{"submission_id": submission_id, "applicable": True}],
    })
    assert r.status_code == 200, r.text
    return r.json()


def set_owner_sme(db, submission_id: int, owner_emails: list[str], sme_emails: list[str]):
    """Pins a submission's Owner/SME to known test identities -- catalog
    defaults vary per item and some are unset, so tests that need a
    deterministic actor set their own rather than depending on catalog data.
    """
    from backend import models

    sub = db.get(models.DeliverableSubmission, submission_id)
    sub.owner_emails = owner_emails
    sub.sme_emails = sme_emails
    db.commit()
    return sub
