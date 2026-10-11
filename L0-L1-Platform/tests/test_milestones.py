"""L1's milestone chain (M1-M6): a milestone is "reached" exactly when its
own linked deliverable is approved -- there's no separate manual "mark
reached" step. L1 creation auto-completes M1 immediately (from the
project's own announcement_date); every later milestone has to be worked
and approved like any other deliverable.
"""
from backend import models
from .helpers import create_l0_project, create_l1_project, set_owner_sme


def test_l1_creation_closes_the_l0_and_reaches_m1_immediately(client, db):
    l0 = create_l0_project(client)
    l1 = create_l1_project(client, l0["id"])
    assert l1["stage"] == "L1"
    assert l1["est_no"] == l0["est_no"], "an L1 keeps its L0's own Est-No -- same tender, later stage"

    r = client.get(f"/api/projects/{l0['id']}")
    assert r.status_code == 200
    assert r.json()["status"] == "Submitted", "the L0 stage is done the moment its L1 exists"

    r = client.get(f"/api/projects/{l1['id']}/milestones")
    assert r.status_code == 200
    milestones = {m["code"]: m for m in r.json()}
    assert set(milestones) >= {"M1", "M2", "M3", "M4", "M5", "M6"}
    assert milestones["M1"]["reached"] is True, "M1 releases the instant the L1 project is created"
    for code in ("M2", "M3", "M4", "M5", "M6"):
        assert milestones[code]["reached"] is False


def test_approving_a_milestones_own_deliverable_reaches_it(client, db, act_as):
    l0 = create_l0_project(client)
    l1 = create_l1_project(client, l0["id"])

    r = client.get(f"/api/projects/{l1['id']}/milestones")
    m2 = next(m for m in r.json() if m["code"] == "M2")
    assert m2["reached"] is False
    sub_id = m2["submission_id"]

    set_owner_sme(db, sub_id, owner_emails=["m2.owner@algihaz.com"], sme_emails=["m2.sme@algihaz.com"])
    act_as("Owner", "m2.owner@algihaz.com")
    r = client.post(f"/api/deliverables/{sub_id}/mark-complete", json={"comment": "Mobilization plan attached."})
    assert r.status_code == 200, r.text
    act_as("SME", "m2.sme@algihaz.com")
    r = client.post(f"/api/deliverables/{sub_id}/review", data={"approved": "true", "comment": "Approved."})
    assert r.status_code == 200, r.text

    r = client.get(f"/api/projects/{l1['id']}/milestones")
    m2_after = next(m for m in r.json() if m["code"] == "M2")
    assert m2_after["reached"] is True
    assert m2_after["actual_date"] is not None
