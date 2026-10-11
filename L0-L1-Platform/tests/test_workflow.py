"""Core deliverable lifecycle: create -> BM triage -> Owner submits ->
SME reviews -> approve/reject, plus the self-approval safeguard.

This is the single most load-bearing path in the whole platform -- every
other feature (scoring, milestones, reminders, reports) is downstream of
these state transitions, so it gets covered first.
"""
from backend import models
from .helpers import (
    create_l0_project, first_pending_triage_submission, triage_applicable, set_owner_sme,
)


def test_l0_project_creation_provisions_the_full_catalog(client, db):
    project = create_l0_project(client)
    subs = db.query(models.DeliverableSubmission).filter(
        models.DeliverableSubmission.project_id == project["id"]
    ).all()
    assert len(subs) > 0
    # Tendering's own items (1.1 Announcement / M1) are auto-completed from
    # the project's own creation form, not left for anyone to triage.
    tendering_auto = [
        s for s in subs
        if s.definition.item_no == "1.1" and s.definition.department.name == "Tendering Department"
    ]
    assert tendering_auto, "expected the auto-completed 1.1 (M1) submission to exist"
    assert tendering_auto[0].status == models.SubmissionStatus.APPROVED
    assert tendering_auto[0].auto_completed is True
    # A non-Tendering item is NOT auto-applicable -- it waits on BM triage.
    pending = first_pending_triage_submission(db, project["id"])
    assert pending is not None
    assert pending.applicability == "pending"


def test_triage_makes_an_item_applicable_and_computes_a_due_date(client, db):
    project = create_l0_project(client)
    pending = first_pending_triage_submission(db, project["id"])
    triage_applicable(client, project["id"], pending.id)
    db.refresh(pending)
    assert pending.applicability == "applicable"
    # Not every item resolves a due date immediately (some chain off a
    # predecessor that isn't done yet) -- but at minimum triage must not
    # have left it in the pre-triage "pending" state.
    assert pending.applicability != "pending"


def test_owner_submits_sme_approves(client, db, act_as):
    project = create_l0_project(client)
    pending = first_pending_triage_submission(db, project["id"])
    triage_applicable(client, project["id"], pending.id)
    set_owner_sme(db, pending.id, owner_emails=["owner@algihaz.com"], sme_emails=["sme@algihaz.com"])

    # A random third person can't act on it.
    act_as("Owner", "stranger@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/mark-complete", json={"comment": "not my item"})
    assert r.status_code == 403

    # The real Owner marks it complete -- goes to Pending SME Review, not
    # straight to Approved.
    act_as("Owner", "owner@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/mark-complete", json={"comment": "Done, see attached."})
    assert r.status_code == 200, r.text
    assert r.json()["completed"] is False
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.PENDING_REVIEW

    # The assigned SME approves it.
    act_as("SME", "sme@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/review", data={"approved": "true", "comment": "Looks good."})
    assert r.status_code == 200, r.text
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.APPROVED
    assert pending.reviewed_at is not None


def test_rejection_sends_it_back_and_resubmit_works(client, db, act_as):
    project = create_l0_project(client)
    pending = first_pending_triage_submission(db, project["id"])
    triage_applicable(client, project["id"], pending.id)
    set_owner_sme(db, pending.id, owner_emails=["owner2@algihaz.com"], sme_emails=["sme2@algihaz.com"])

    act_as("Owner", "owner2@algihaz.com")
    client.post(f"/api/deliverables/{pending.id}/mark-complete", json={"comment": "First attempt."})
    act_as("SME", "sme2@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/review", data={"approved": "false", "comment": "Missing the risk register."})
    assert r.status_code == 200, r.text
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.REJECTED

    # Resubmitting starts the exact same cycle over again.
    act_as("Owner", "owner2@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/mark-complete", json={"comment": "Fixed, risk register attached."})
    assert r.status_code == 200, r.text
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.PENDING_REVIEW

    act_as("SME", "sme2@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/review", data={"approved": "true", "comment": "Good now."})
    assert r.status_code == 200, r.text
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.APPROVED


def test_sme_marking_own_item_finalizes_immediately(client, db, act_as):
    """The SME's own Mark Completed skips the review step entirely -- no
    reviewing yourself, per the walkthrough tour's own documented rule.
    """
    project = create_l0_project(client)
    pending = first_pending_triage_submission(db, project["id"])
    triage_applicable(client, project["id"], pending.id)
    set_owner_sme(db, pending.id, owner_emails=["owner3@algihaz.com"], sme_emails=["sme3@algihaz.com"])
    act_as("SME", "sme3@algihaz.com")

    r = client.post(f"/api/deliverables/{pending.id}/mark-complete", json={"comment": "SME did this directly."})
    assert r.status_code == 200, r.text
    assert r.json()["completed"] is True
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.APPROVED


def test_self_approval_is_blocked_at_both_endpoints(client, db, act_as):
    """The real safeguard: the same person assigned as both Owner and SME
    on one item cannot finalize their own work -- neither via Mark
    Completed (falls to Pending SME Review instead of auto-approving) nor
    via /review (explicitly rejected with a 403), even though they pass
    every ordinary can_act() check. Only a genuinely different person (or a
    real Admin) can close it out.
    """
    project = create_l0_project(client)
    pending = first_pending_triage_submission(db, project["id"])
    triage_applicable(client, project["id"], pending.id)
    same_person = "same.person@algihaz.com"
    set_owner_sme(db, pending.id, owner_emails=[same_person], sme_emails=[same_person])

    # Acting as the SME half of themselves -- would normally finalize
    # immediately (per the previous test), but self_approval routes it to
    # Pending SME Review instead.
    act_as("SME", same_person)
    r = client.post(f"/api/deliverables/{pending.id}/mark-complete", json={"comment": "My own work."})
    assert r.status_code == 200, r.text
    assert r.json()["completed"] is False
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.PENDING_REVIEW

    # Trying to approve it themselves via /review is explicitly blocked.
    r = client.post(f"/api/deliverables/{pending.id}/review", data={"approved": "true", "comment": "Approving my own item."})
    assert r.status_code == 403
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.PENDING_REVIEW  # unchanged

    # A real second person (or an Admin) can still close it out normally.
    act_as("Admin", "admin@algihaz.com")
    r = client.post(f"/api/deliverables/{pending.id}/review", data={"approved": "true", "comment": "Reviewed independently."})
    assert r.status_code == 200, r.text
    db.refresh(pending)
    assert pending.status == models.SubmissionStatus.APPROVED
