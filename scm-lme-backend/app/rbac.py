from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from pydantic import BaseModel

from . import db
from .auth import get_api_key

router = APIRouter(dependencies=[Depends(get_api_key)])


def require_admin(x_user_email: str = Header(...)) -> str:
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT r.role_key
                FROM users u JOIN roles r ON r.role_key = u.role_key
                WHERE lower(u.email) = lower(%s)
                """,
                (x_user_email,),
            )
            row = cur.fetchone()
    finally:
        db.put_conn(conn)

    if row is None or row[0] != "ssot_administrator":
        raise HTTPException(status_code=403, detail="Admin access required")
    return x_user_email


@router.get("/api/auth/me")
def auth_me(email: str = Query(...)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT u.email, u.username, r.role_key, r.role_name, r.role_category,
                       coalesce(array_agg(rm.module_key) FILTER (WHERE rm.module_key IS NOT NULL), '{}')
                FROM users u
                JOIN roles r ON r.role_key = u.role_key
                LEFT JOIN role_modules rm ON rm.role_key = r.role_key
                WHERE lower(u.email) = lower(%s)
                GROUP BY u.email, u.username, r.role_key, r.role_name, r.role_category
                """,
                (email,),
            )
            row = cur.fetchone()
    finally:
        db.put_conn(conn)

    if row is None:
        raise HTTPException(status_code=404, detail="User not registered for this app")

    email_, username, role_key, role_name, role_category, modules = row
    return {
        "email": email_,
        "username": username,
        "roleKey": role_key,
        "roleName": role_name,
        "roleCategory": role_category,
        "modules": modules,
    }


@router.get("/api/admin/roles")
def list_roles(admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT role_key, role_name, role_category FROM roles ORDER BY role_category, role_name")
            rows = cur.fetchall()
    finally:
        db.put_conn(conn)
    return [{"roleKey": k, "roleName": n, "roleCategory": c} for k, n, c in rows]


@router.get("/api/admin/users")
def list_users(admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT u.id, u.email, u.username, r.role_key, r.role_name, u.created_at
                FROM users u JOIN roles r ON r.role_key = u.role_key
                ORDER BY u.created_at DESC
                """
            )
            rows = cur.fetchall()
    finally:
        db.put_conn(conn)
    return [
        {"id": i, "email": e, "username": un, "roleKey": rk, "roleName": rn, "createdAt": ca.isoformat()}
        for i, e, un, rk, rn, ca in rows
    ]


class NewUser(BaseModel):
    email: str
    username: Optional[str] = None
    roleKey: str


@router.post("/api/admin/users")
def add_user(body: NewUser, admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM roles WHERE role_key = %s", (body.roleKey,))
            if cur.fetchone() is None:
                raise HTTPException(status_code=400, detail=f"Unknown roleKey: {body.roleKey}")
            cur.execute(
                """
                INSERT INTO users (email, username, role_key)
                VALUES (%s, %s, %s)
                ON CONFLICT (email) DO UPDATE SET username = EXCLUDED.username, role_key = EXCLUDED.role_key
                RETURNING id, email, username, role_key, created_at
                """,
                (body.email, body.username, body.roleKey),
            )
            row = cur.fetchone()
        conn.commit()
    except HTTPException:
        conn.rollback()
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        db.put_conn(conn)

    i, e, un, rk, ca = row
    return {"id": i, "email": e, "username": un, "roleKey": rk, "createdAt": ca.isoformat()}


@router.delete("/api/admin/users/{email}")
def remove_user(email: str, admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT count(*) FROM users u JOIN roles r ON r.role_key = u.role_key
                WHERE r.role_key = 'ssot_administrator' AND lower(u.email) != lower(%s)
                """,
                (email,),
            )
            (other_admins,) = cur.fetchone()
            cur.execute("SELECT role_key FROM users WHERE lower(email) = lower(%s)", (email,))
            target = cur.fetchone()
            if target and target[0] == "ssot_administrator" and other_admins == 0:
                raise HTTPException(status_code=400, detail="Cannot remove the last remaining administrator")

            cur.execute("DELETE FROM users WHERE lower(email) = lower(%s) RETURNING id", (email,))
            deleted = cur.fetchone()
        conn.commit()
    except HTTPException:
        conn.rollback()
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        db.put_conn(conn)

    if deleted is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "deleted", "email": email}
