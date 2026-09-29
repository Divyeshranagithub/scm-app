import json
from typing import Optional


def log_action(cur, actor_email: str, action: str, target: Optional[str] = None, detail: Optional[dict] = None) -> None:
    """Append one row to scm.audit_log. Caller still owns commit/rollback --
    this just queues the insert on the same cursor/transaction as the action
    it's recording, so the log entry and the action it describes always
    succeed or fail together.
    """
    cur.execute(
        "INSERT INTO audit_log (actor_email, action, target, detail) VALUES (%s, %s, %s, %s)",
        (actor_email, action, target, json.dumps(detail) if detail is not None else None),
    )
