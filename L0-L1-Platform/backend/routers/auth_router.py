"""DronaHQ-identified sign-in. The browser never asserts a role -- it sends
only the email the DronaHQ container gave it, and this endpoint either
returns a signed session for whatever role that email already has on the
roster, or tells the frontend the account isn't provisioned yet so it can
show the waiting-for-role screen instead of the app.
"""
import re

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .. import models
from ..auth import CurrentActor, get_current_actor, issue_token
from ..database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])

_EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class SignInBody(BaseModel):
    email: str
    name: str | None = None


@router.post("/session")
def sign_in(payload: SignInBody, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    if not _EMAIL_RE.match(email):
        raise HTTPException(400, "A valid email is required")
    user = db.query(models.User).filter(models.User.email.ilike(email)).first()
    if not user:
        # Auto-file the same self-service join request the old "add people
        # to L0L1" button created -- an Admin sees this in Requests without
        # the brand-new user needing any screen to click it from themselves,
        # since they have no role yet and therefore see no app at all.
        existing = db.query(models.UserAddRequest).filter(
            models.UserAddRequest.email.ilike(email), models.UserAddRequest.status == "pending",
        ).first()
        if not existing:
            db.add(models.UserAddRequest(
                email=email, name=(payload.name or "").strip() or None,
                role="Viewer", requested_by_email=email, requested_by_name=(payload.name or "").strip() or None,
            ))
            db.commit()
        return {"status": "pending", "email": email}
    return {
        "status": "ok", "token": issue_token(user),
        "email": user.email, "role": user.role, "name": user.name,
    }


@router.get("/me")
def me(current: CurrentActor = Depends(get_current_actor)):
    return {"email": current.email, "role": current.role, "name": current.name}
