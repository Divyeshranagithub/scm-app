"""kpi_points: the Calculation Criteria scoring rule. Pure function, no DB
needed -- these pin down the exact point value at every timing boundary,
including the 4-day grace window that a plain reading of the walkthrough
tour's own summary table ("On Time = exactly on the due date") would miss.
"""
from datetime import date, timedelta

from backend.rules import kpi_points

DUE = date(2026, 6, 15)


def test_not_yet_due_and_not_submitted_is_unscored():
    far_future = date.today() + timedelta(days=365)
    assert kpi_points(far_future, None) is None


def test_overdue_and_never_submitted_scores_zero():
    # submitted_date=None with due_date already in the past -- nothing was
    # ever turned in, so it scores a real 0, not "not yet scoreable".
    assert kpi_points(date(2020, 1, 1), None) == 0.0


def test_submitted_before_due_date_earns_the_early_bonus():
    assert kpi_points(DUE, DUE - timedelta(days=3)) == 1.1


def test_submitted_exactly_on_due_date_is_on_time():
    assert kpi_points(DUE, DUE) == 1.0


def test_within_the_four_day_grace_window_still_scores_on_time():
    # grace_days=4: up to 4 calendar days late still nets the full 1.0 --
    # this is the exact boundary a naive "late means late" reading of the
    # tour copy would get wrong.
    assert kpi_points(DUE, DUE + timedelta(days=4)) == 1.0


def test_five_days_late_drops_out_of_the_grace_window():
    # 5 days late - 4 grace days = 1 day into the "1-7 days late" bucket.
    assert kpi_points(DUE, DUE + timedelta(days=5)) == 0.9


def test_late_bucket_boundaries():
    # days_late here is AFTER the 4-day grace subtraction.
    assert kpi_points(DUE, DUE + timedelta(days=4 + 7)) == 0.9    # exactly 7 days_late
    assert kpi_points(DUE, DUE + timedelta(days=4 + 8)) == 0.8    # rolls into 8-14
    assert kpi_points(DUE, DUE + timedelta(days=4 + 14)) == 0.8
    assert kpi_points(DUE, DUE + timedelta(days=4 + 15)) == 0.7   # rolls into 15-21
    assert kpi_points(DUE, DUE + timedelta(days=4 + 21)) == 0.7
    assert kpi_points(DUE, DUE + timedelta(days=4 + 22)) == 0.6   # rolls into 22-28
    assert kpi_points(DUE, DUE + timedelta(days=4 + 28)) == 0.6


def test_more_than_28_days_late_scores_zero():
    assert kpi_points(DUE, DUE + timedelta(days=4 + 29)) == 0.0


def test_no_due_date_is_never_scoreable():
    # client_dependent / library / on_request items have no computable due
    # date at all -- always None regardless of submission.
    assert kpi_points(None, date(2026, 1, 1)) is None
