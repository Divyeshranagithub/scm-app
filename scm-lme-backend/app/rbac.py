from typing import List, Optional

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

    if row is None or row[0] != "administrator":
        raise HTTPException(status_code=403, detail="Admin access required")
    return x_user_email


def _user_modules(cur, user_id: int) -> List[str]:
    cur.execute("SELECT module_key FROM user_modules WHERE user_id = %s ORDER BY module_key", (user_id,))
    return [r[0] for r in cur.fetchall()]


def _all_module_keys(cur, include_admin: bool) -> List[str]:
    if include_admin:
        cur.execute("SELECT module_key FROM modules")
    else:
        cur.execute("SELECT module_key FROM modules WHERE module_key != 'admin'")
    return [r[0] for r in cur.fetchall()]


@router.get("/api/auth/me")
def auth_me(email: str = Query(...)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT u.id, u.email, u.username, r.role_key, r.role_name
                FROM users u JOIN roles r ON r.role_key = u.role_key
                WHERE lower(u.email) = lower(%s)
                """,
                (email,),
            )
            row = cur.fetchone()
            if row is None:
                raise HTTPException(status_code=404, detail="User not registered for this app")

            user_id, email_, username, role_key, role_name = row
            editable_modules = _user_modules(cur, user_id)

            if role_key == "administrator":
                modules = _all_module_keys(cur, include_admin=True)
            elif role_key == "editor":
                modules = _all_module_keys(cur, include_admin=False)
            else:  # viewer
                modules = editable_modules
    except HTTPException:
        raise
    finally:
        db.put_conn(conn)

    return {
        "email": email_,
        "username": username,
        "roleKey": role_key,
        "roleName": role_name,
        "modules": modules,
        "editableModules": editable_modules,
    }


@router.get("/api/admin/roles")
def list_roles(admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT role_key, role_name FROM roles ORDER BY role_key")
            rows = cur.fetchall()
    finally:
        db.put_conn(conn)
    return [{"roleKey": k, "roleName": n} for k, n in rows]


@router.get("/api/admin/modules")
def list_modules(admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT module_key, module_name FROM modules WHERE module_key != 'admin' ORDER BY sort_order")
            rows = cur.fetchall()
    finally:
        db.put_conn(conn)
    return [{"moduleKey": k, "moduleName": n} for k, n in rows]


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
            users = cur.fetchall()
            result = []
            for i, e, un, rk, rn, ca in users:
                cur.execute(
                    """
                    SELECT m.module_key, m.module_name
                    FROM user_modules um JOIN modules m ON m.module_key = um.module_key
                    WHERE um.user_id = %s ORDER BY m.sort_order
                    """,
                    (i,),
                )
                mods = cur.fetchall()
                result.append({
                    "id": i, "email": e, "username": un,
                    "roleKey": rk, "roleName": rn,
                    "moduleKeys": [k for k, _ in mods],
                    "moduleNames": [n for _, n in mods],
                    "createdAt": ca.isoformat(),
                })
    finally:
        db.put_conn(conn)
    return result


class NewUser(BaseModel):
    email: str
    username: Optional[str] = None
    roleKey: str
    moduleKeys: List[str] = []


@router.post("/api/admin/users")
def add_user(body: NewUser, admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM roles WHERE role_key = %s", (body.roleKey,))
            if cur.fetchone() is None:
                raise HTTPException(status_code=400, detail=f"Unknown roleKey: {body.roleKey}")

            for mk in body.moduleKeys:
                cur.execute("SELECT 1 FROM modules WHERE module_key = %s", (mk,))
                if cur.fetchone() is None:
                    raise HTTPException(status_code=400, detail=f"Unknown moduleKey: {mk}")

            cur.execute(
                """
                INSERT INTO users (email, username, role_key)
                VALUES (%s, %s, %s)
                ON CONFLICT (email) DO UPDATE SET username = EXCLUDED.username, role_key = EXCLUDED.role_key
                RETURNING id, email, username, role_key, created_at
                """,
                (body.email, body.username, body.roleKey),
            )
            user_id, e, un, rk, ca = cur.fetchone()

            cur.execute("DELETE FROM user_modules WHERE user_id = %s", (user_id,))
            for mk in body.moduleKeys:
                cur.execute(
                    "INSERT INTO user_modules (user_id, module_key) VALUES (%s, %s)",
                    (user_id, mk),
                )
        conn.commit()
    except HTTPException:
        conn.rollback()
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        db.put_conn(conn)

    return {
        "id": user_id, "email": e, "username": un, "roleKey": rk,
        "moduleKeys": body.moduleKeys, "createdAt": ca.isoformat(),
    }


class BulkUserRow(BaseModel):
    email: str
    username: Optional[str] = None
    roleKey: str
    moduleKeys: List[str] = []


class BulkUsersRequest(BaseModel):
    users: List[BulkUserRow]


@router.post("/api/admin/users/bulk")
def bulk_add_users(body: BulkUsersRequest, admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    results = []
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT role_key FROM roles")
            valid_roles = {r[0] for r in cur.fetchall()}
            cur.execute("SELECT module_key FROM modules")
            valid_modules = {r[0] for r in cur.fetchall()}

        for row in body.users:
            try:
                email = (row.email or "").strip()
                if not email or "@" not in email:
                    raise ValueError(f"invalid email: '{row.email}'")
                if row.roleKey not in valid_roles:
                    raise ValueError(f"unknown role '{row.roleKey}' (must be one of {sorted(valid_roles)})")
                bad_modules = [m for m in row.moduleKeys if m not in valid_modules]
                if bad_modules:
                    raise ValueError(f"unknown module(s): {', '.join(bad_modules)}")

                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO users (email, username, role_key)
                        VALUES (%s, %s, %s)
                        ON CONFLICT (email) DO UPDATE SET username = EXCLUDED.username, role_key = EXCLUDED.role_key
                        RETURNING id
                        """,
                        (email, row.username, row.roleKey),
                    )
                    (user_id,) = cur.fetchone()
                    cur.execute("DELETE FROM user_modules WHERE user_id = %s", (user_id,))
                    for mk in row.moduleKeys:
                        cur.execute(
                            "INSERT INTO user_modules (user_id, module_key) VALUES (%s, %s)",
                            (user_id, mk),
                        )
                conn.commit()
                results.append({"email": email, "status": "ok"})
            except Exception as e:
                conn.rollback()
                results.append({"email": row.email, "status": "error", "detail": str(e)})
    finally:
        db.put_conn(conn)

    return {"results": results}


@router.delete("/api/admin/users/{email}")
def remove_user(email: str, admin_email: str = Depends(require_admin)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT count(*) FROM users u JOIN roles r ON r.role_key = u.role_key
                WHERE r.role_key = 'administrator' AND lower(u.email) != lower(%s)
                """,
                (email,),
            )
            (other_admins,) = cur.fetchone()
            cur.execute("SELECT role_key FROM users WHERE lower(email) = lower(%s)", (email,))
            target = cur.fetchone()
            if target and target[0] == "administrator" and other_admins == 0:
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
