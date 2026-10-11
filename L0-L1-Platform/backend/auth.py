"""Session auth: DronaHQ container identity -> a verified role from the roster.

Same email-only trust model QMS360's Drona email exception uses: the
container SDK (not a password) establishes who's asking. This module's job
is to look up THAT email's current role in our own `models.User` roster and
sign a short-lived token for it -- the role is still re-read live from the
DB on every request (get_current_actor), never cached in the token itself
for authorization purposes, so an Admin revoking someone's access takes
effect on their very next request, not whenever the token happens to expire.

This is not verified SSO in the cryptographic sense (no Drona nonce check
here either, same as QMS360's exception) -- it is however a real step up
from the pilot's old model, where the browser could simply claim any role
for itself. Once real Azure AD / Algihaz SSO is wired up (see docs/RUNBOOK),
only `_resolve_sso_email` below needs to change; everything downstream
(the roster lookup, the token, every route's authorization check) stays
the same.
"""
import os
import time
from typing import Optional

import jwt
from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session

from . import models
from .database import get_db

SESSION_SECRET = os.environ.get("SESSION_SECRET") or "local-dev-only-insecure-secret-change-in-env"
TOKEN_TTL_SECONDS = 60 * 60 * 12  # 12h -- the frontend re-establishes the session on every page load anyway


def issue_token(user: "models.User") -> str:
    now = int(time.time())
    payload = {"sub": user.email, "iat": now, "exp": now + TOKEN_TTL_SECONDS}
    return jwt.encode(payload, SESSION_SECRET, algorithm="HS256")


class CurrentActor:
    __slots__ = ("id", "email", "role", "name")

    def __init__(self, user: "models.User"):
        self.id = user.id
        self.email = user.email
        self.role = user.role
        self.name = user.name


def synthetic_actor(role: str, email: str = "", name: str = "") -> CurrentActor:
    """A CurrentActor not backed by a real signed-in session -- for trusted
    internal call paths that invoke an auth-gated router function directly
    as plain Python (not over HTTP), e.g. ai_support.py's cross-router
    "look this specific person's requests/tenders up for the asker" tools,
    which intentionally need broader-than-the-real-asker visibility.
    """
    actor = object.__new__(CurrentActor)
    actor.id = None
    actor.role = role
    actor.email = email
    actor.name = name
    return actor


def get_current_actor(
    authorization: Optional[str] = Header(default=None),
    db: Session = Depends(get_db),
) -> CurrentActor:
    """The one place "who is making this request" gets decided. Every route
    that used to read actor_role/actor_email off the request body now takes
    `current: CurrentActor = Depends(get_current_actor)` instead -- the
    client can no longer simply assert a role, it has to actually be on the
    roster under the signed-in email.
    """
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Sign in required")
    token = authorization.split(" ", 1)[1].strip()
    try:
        payload = jwt.decode(token, SESSION_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Session expired -- sign in again")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid session")
    email = payload.get("sub")
    user = db.query(models.User).filter(models.User.email.ilike(email)).first() if email else None
    if not user:
        raise HTTPException(401, "No longer on the roster -- sign in again")
    return CurrentActor(user)


def require_admin(current: CurrentActor = Depends(get_current_actor)) -> CurrentActor:
    if current.role != "Admin":
        raise HTTPException(403, "Admin access is required")
    return current
