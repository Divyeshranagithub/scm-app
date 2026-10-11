"""Query-count regression tests -- the kind of thing a functional test can
never catch (the endpoint still returns the right data either way) but a
load test immediately exposes: an N+1 query pattern that's invisible with
a handful of rows and severe with a realistic catalog.

[load test finding, 2026-09-22]: creating an L0 project was doing an
O(departments x submissions) scan with `.definition` lazy-loaded per
access, timing at ~3.4s for a single project against the real catalog
(~114 L0 items across ~20 departments) -- 11x slower than it needed to be.
Fixed in projects.py's `_instantiate_deliverables` tail (see its own
comment). This test asserts the query count stays flat and low regardless
of catalog size, so a future change reintroducing the same pattern fails
here instead of only showing up as "the app feels slow" much later.
"""
from sqlalchemy import event

from backend.database import engine
from .helpers import create_l0_project


def _count_queries(fn):
    count = 0

    def _on_execute(*args, **kwargs):
        nonlocal count
        count += 1

    event.listen(engine, "before_cursor_execute", _on_execute)
    try:
        fn()
    finally:
        event.remove(engine, "before_cursor_execute", _on_execute)
    return count


def test_l0_creation_does_not_scale_with_catalog_size(client):
    """Not a hard-coded magic number by accident -- the real L0 catalog is
    ~114 items across ~20 departments. Creation legitimately issues roughly
    one query per submission for other reasons (inserts, due-date lookups),
    observed at ~237 post-fix; the bug this guards against was O(depts x
    items) from re-scanning every submission once per department with a
    lazy-loaded relationship, which would put this in the thousands, not
    comfortably under 500.
    """
    queries = _count_queries(lambda: create_l0_project(client))
    assert queries < 500, (
        f"L0 project creation issued {queries} queries -- expected roughly "
        f"one per department/submission batch operation, not one per "
        f"(department, submission) pair. See this file's module docstring."
    )
