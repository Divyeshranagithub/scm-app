"""compute_due_date: the formula engine every one of the 329 real catalog
items runs through. These build small, isolated definitions/branches
directly (not the real catalog, which can and does change) so the engine's
branching logic itself -- not any one item's specific formula -- is what's
under test: announcement/BSD/predecessor anchors, conditional branch
selection, and the predecessor chain's "start the day after, run N working
days" math.
"""
from datetime import date, timedelta

from backend import models, rules
from backend.rules import skip_weekend_forward, _skip_weekend_backward, next_workday_after, duration_end


def _make_department(db, name):
    dept = models.Department(name=name)
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept


def _make_project(db, stage=models.Stage.L1, **overrides):
    # Relative to "today" (not a hardcoded date) so these stay valid no
    # matter when the suite runs, and stay far enough out that a computed
    # due date is never itself already in the past -- see the predecessor
    # test below for why that specifically matters.
    project = models.Project(
        est_no="Est-TEST" + str(id(overrides) % 100000), name="Due Date Test Project", stage=stage,
        announcement_date=date.today() + timedelta(days=60), bsd=date.today() + timedelta(days=120),
    )
    for k, v in overrides.items():
        setattr(project, k, v)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def _make_definition_with_branches(db, dept, item_no, stage, branches: list[dict]):
    d = models.DeliverableDefinition(stage=stage, item_no=item_no, name=f"Test item {item_no}", department_id=dept.id)
    db.add(d)
    db.commit()
    db.refresh(d)
    for i, b in enumerate(branches):
        db.add(models.DeliverableFormulaBranch(deliverable_definition_id=d.id, branch_order=i, **b))
    db.commit()
    db.refresh(d)
    return d


def _make_submission(db, project, definition, **overrides):
    sub = models.DeliverableSubmission(project_id=project.id, deliverable_definition_id=definition.id)
    for k, v in overrides.items():
        setattr(sub, k, v)
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub


def test_announcement_anchor_simple_offset(db):
    dept = _make_department(db, "Test Dept A")
    project = _make_project(db)
    definition = _make_definition_with_branches(db, dept, "T.1", project.stage, [
        {"condition_type": "always", "anchor_type": "announcement", "offset_days": 10, "workday_duration": False},
    ])
    sub = _make_submission(db, project, definition)

    result = rules.compute_due_date(db, sub, project)
    expected = skip_weekend_forward(project.announcement_date + timedelta(days=10))
    assert result == expected


def test_bsd_anchor_counts_backward(db):
    dept = _make_department(db, "Test Dept B")
    project = _make_project(db)
    definition = _make_definition_with_branches(db, dept, "T.2", project.stage, [
        {"condition_type": "always", "anchor_type": "bsd", "offset_days": 15},
    ])
    sub = _make_submission(db, project, definition)

    result = rules.compute_due_date(db, sub, project)
    expected = _skip_weekend_backward(project.bsd - timedelta(days=15))
    assert result == expected


def test_predecessor_anchor_chains_off_an_unapproved_items_due_date(db):
    dept = _make_department(db, "Test Dept C")
    project = _make_project(db, stage=models.Stage.L1)  # L1 -> no tight-BSD duration scaling to account for

    pred_def = _make_definition_with_branches(db, dept, "T.3", project.stage, [
        {"condition_type": "always", "anchor_type": "announcement", "offset_days": 5},
    ])
    pred_sub = _make_submission(db, project, pred_def)
    pred_sub.due_date = rules.compute_due_date(db, pred_sub, project)
    db.commit()

    dep_def = _make_definition_with_branches(db, dept, "T.4", project.stage, [
        {"condition_type": "always", "anchor_type": "predecessor", "predecessor_item_no": "T.3",
         "offset_days": 6, "offset_direction": "after"},
    ])
    dep_sub = _make_submission(db, project, dep_def)

    result = rules.compute_due_date(db, dep_sub, project)
    # Predecessor not yet approved -> anchor is the later of its planned
    # due_date or today (a still-open predecessor past its own due date
    # keeps sliding the anchor forward; here it isn't overdue, so its
    # planned due_date wins). Work starts the next working day and runs 6
    # working days (duration_end counts day 1 as the start day itself).
    anchor = max(pred_sub.due_date, date.today())
    start = next_workday_after(anchor)
    expected = duration_end(start, 6)
    assert result == expected


def test_predecessor_anchor_uses_the_real_approval_date_once_approved(db):
    """A predecessor that finished late shifts the dependent item's start
    forward to the real finish date, not the original plan -- otherwise a
    late predecessor would silently understate how long downstream work
    actually has.
    """
    dept = _make_department(db, "Test Dept D")
    project = _make_project(db, stage=models.Stage.L1)

    pred_def = _make_definition_with_branches(db, dept, "T.5", project.stage, [
        {"condition_type": "always", "anchor_type": "announcement", "offset_days": 5},
    ])
    pred_sub = _make_submission(db, project, pred_def)
    planned_due = rules.compute_due_date(db, pred_sub, project)
    pred_sub.due_date = planned_due
    # Approved 9 days after the original plan.
    from datetime import datetime
    real_finish = planned_due + timedelta(days=9)
    pred_sub.status = models.SubmissionStatus.APPROVED
    pred_sub.reviewed_at = datetime.combine(real_finish, datetime.min.time())
    db.commit()

    dep_def = _make_definition_with_branches(db, dept, "T.6", project.stage, [
        {"condition_type": "always", "anchor_type": "predecessor", "predecessor_item_no": "T.5",
         "offset_days": 3, "offset_direction": "after"},
    ])
    dep_sub = _make_submission(db, project, dep_def)

    result = rules.compute_due_date(db, dep_sub, project)
    start = next_workday_after(real_finish)
    expected = duration_end(start, 3)
    assert result == expected
    assert result != duration_end(next_workday_after(planned_due), 3), \
        "sanity check: the late finish must actually change the result vs. the original plan"


def test_conditional_branch_only_fires_for_l0_non_international(db):
    """scope_contains_pbu (and every other non-'always' condition) is
    blanket-gated to L0: the same branch config on an L1 or international
    row must fall through to the next branch rather than misfiring.
    """
    dept = _make_department(db, "Test Dept E")
    branches = [
        {"condition_type": "scope_contains_pbu", "anchor_type": "announcement", "offset_days": 5},
        {"condition_type": "always", "anchor_type": "announcement", "offset_days": 20},
    ]

    # L0, scope_contains_pbu=True -> the conditional (first) branch fires.
    l0_project = _make_project(db, stage=models.Stage.L0, scope_contains_pbu=True, is_international=False)
    definition = _make_definition_with_branches(db, dept, "T.7", models.Stage.L0, branches)
    sub = _make_submission(db, l0_project, definition)
    result = rules.compute_due_date(db, sub, l0_project)
    assert result == skip_weekend_forward(l0_project.announcement_date + timedelta(days=5))

    # L0, scope_contains_pbu=False -> falls through to the "always" branch.
    l0_project_no_pbu = _make_project(db, stage=models.Stage.L0, scope_contains_pbu=False, is_international=False)
    definition2 = _make_definition_with_branches(db, dept, "T.7", models.Stage.L0, branches)
    sub2 = _make_submission(db, l0_project_no_pbu, definition2)
    result2 = rules.compute_due_date(db, sub2, l0_project_no_pbu)
    assert result2 == skip_weekend_forward(l0_project_no_pbu.announcement_date + timedelta(days=20))

    # International tenders never evaluate the conditional branch, even
    # though stage is still "L0" and scope_contains_pbu is True -- always
    # falls straight to the unconditional branch.
    intl_project = _make_project(db, stage=models.Stage.L0, scope_contains_pbu=True, is_international=True)
    definition3 = _make_definition_with_branches(db, dept, "T.7", models.Stage.L0, branches)
    sub3 = _make_submission(db, intl_project, definition3)
    result3 = rules.compute_due_date(db, sub3, intl_project)
    assert result3 == skip_weekend_forward(intl_project.announcement_date + timedelta(days=20))


def test_item_with_no_branches_has_no_computable_due_date(db):
    """client_dependent / library / on_request items: zero active branches
    means no formula at all, not an error -- these are submitted whenever
    the real event happens, with no due date to chase.
    """
    dept = _make_department(db, "Test Dept F")
    project = _make_project(db)
    definition = _make_definition_with_branches(db, dept, "T.8", project.stage, [])
    sub = _make_submission(db, project, definition)

    assert rules.compute_due_date(db, sub, project) is None
