"""Read-heavy load test against the running app -- simulates the browsing
patterns that would actually dominate real concurrent usage (dashboard,
lists, project detail, assigned deliverables) rather than the low-frequency
write actions (submit/review). Run against loadtest/seed_data.py's output,
never against production or a database with real data.

Usage (headless, 50 concurrent users, 2/s spawn rate, 60s):
    locust -f loadtest/locustfile.py --host http://127.0.0.1:8010 \
        --headless -u 50 -r 2 -t 60s --csv loadtest/results
"""
import random

from locust import HttpUser, task, between


class BrowsingUser(HttpUser):
    wait_time = between(1, 3)  # a real person pauses between clicks
    project_ids: list[int] = []

    def on_start(self):
        if not BrowsingUser.project_ids:
            r = self.client.get("/api/projects", name="/api/projects [warm cache]")
            if r.ok:
                BrowsingUser.project_ids = [p["id"] for p in r.json()]

    def _random_project_id(self):
        return random.choice(BrowsingUser.project_ids) if BrowsingUser.project_ids else 1

    @task(5)
    def dashboard(self):
        self.client.get("/api/dashboard", name="/api/dashboard")

    @task(3)
    def matrix(self):
        stage = random.choice(["L0", "L1"])
        self.client.get(f"/api/dashboard/matrix?stage={stage}", name="/api/dashboard/matrix?stage=")

    @task(3)
    def project_list(self):
        stage = random.choice(["L0", "L1"])
        self.client.get(f"/api/projects?stage={stage}", name="/api/projects?stage=")

    @task(4)
    def project_detail(self):
        pid = self._random_project_id()
        self.client.get(f"/api/projects/{pid}", name="/api/projects/[id]")

    @task(3)
    def project_deliverables(self):
        pid = self._random_project_id()
        self.client.get(f"/api/projects/{pid}/deliverables", name="/api/projects/[id]/deliverables")

    @task(2)
    def assigned_deliverables(self):
        self.client.get("/api/deliverables", name="/api/deliverables")

    @task(2)
    def performance(self):
        self.client.get("/api/dashboard/performance", name="/api/dashboard/performance")

    @task(1)
    def performance_breakdown(self):
        self.client.get(
            "/api/dashboard/performance/breakdown?department=Engineering%20Department&stage=L0",
            name="/api/dashboard/performance/breakdown?department=&stage=",
        )

    @task(1)
    def top_achievers(self):
        self.client.get("/api/dashboard/top-achievers", name="/api/dashboard/top-achievers")

    @task(1)
    def gantt_timeline(self):
        stage = random.choice(["L0", "L1"])
        self.client.get(f"/api/gantt/timeline?stage={stage}", name="/api/gantt/timeline?stage=")

    @task(1)
    def milestones(self):
        pid = self._random_project_id()
        self.client.get(f"/api/projects/{pid}/milestones", name="/api/projects/[id]/milestones")

    @task(1)
    def bm_triage_status(self):
        self.client.get("/api/projects/bm-triage-status?actor_role=Admin", name="/api/projects/bm-triage-status")
