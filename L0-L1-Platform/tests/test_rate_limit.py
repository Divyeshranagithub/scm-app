"""Rate limiting (backend/main.py's RateLimitMiddleware).

[load test follow-up, 2026-09-22]: the first implementation used the
slowapi package's own SlowAPIMiddleware, which looked correctly configured
in isolation -- but its route-handler resolution turned out to silently
no-op against this FastAPI version (0.141.1) for every route registered via
app.include_router(), i.e. every real route in this app. It only ever
worked on the two routes declared directly on `app` (/, /health). Confirmed
by direct testing before writing this test, not assumed -- see the comment
in main.py for the full story. These tests exercise the real hand-written
replacement, not a reimplementation of it.

The 429-triggering test swaps backend.main's module-level rate limit item
to a tiny one for its own duration (restored in a `finally`) rather than
tripping the real 300/minute default -- that default is shared, global
middleware state for the whole test session; exhausting it here would 429
every other test's requests for the rest of that one-minute window.
"""
import limits

import backend.main as main


def test_client_ip_prefers_x_forwarded_for():
    """Render (like most PaaS/reverse-proxy setups) puts the real client
    address in X-Forwarded-For -- request.client alone would just be the
    proxy's own address for every request, collapsing every real visitor
    into one shared bucket.
    """
    class _FakeRequest:
        def __init__(self, headers, client_host):
            self.headers = headers
            self.client = type("C", (), {"host": client_host})() if client_host else None

    req = _FakeRequest({"x-forwarded-for": "203.0.113.5, 10.0.0.1"}, "10.0.0.1")
    assert main._client_ip(req) == "203.0.113.5"

    req_no_xff = _FakeRequest({}, "192.168.1.1")
    assert main._client_ip(req_no_xff) == "192.168.1.1"

    req_neither = _FakeRequest({}, None)
    assert main._client_ip(req_neither) == "unknown"


def test_health_is_exempt_from_rate_limiting(client):
    for _ in range(20):
        assert client.get("/health").status_code == 200


def test_exceeding_the_limit_returns_429(client):
    original_item = main._rate_limit_item
    main._rate_limit_item = limits.parse("3/minute")
    try:
        statuses = [client.get("/api/gantt/timeline?stage=L0").status_code for _ in range(6)]
    finally:
        main._rate_limit_item = original_item

    assert statuses[:3] == [200, 200, 200], f"expected the first 3 requests to succeed, got {statuses}"
    assert 429 in statuses[3:], f"expected at least one 429 after the limit, got {statuses}"
    assert statuses[3:].count(429) == len(statuses[3:]), f"expected every request past the limit to 429, got {statuses}"
