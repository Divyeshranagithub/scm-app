import json
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Query

from . import db
from .auth import get_api_key
from .rbac import _all_module_keys, _user_modules

router = APIRouter(dependencies=[Depends(get_api_key)])

# dataset_key -> the module a caller must have (to view) / have edit rights
# on (to write) before this endpoint will serve or accept it. Extend this as
# more datasets move off static files.
DATASET_MODULE = {
    'avl': 'avl',
    'sec-sole-source': 'secsole',
    'sec-avl-details': 'secsole',
    'overview': 'overview',
    'masterdata': 'masterdata',
    'coststructure': 'coststructure',
    'monthly': 'monthly',
    'embed-scmkpi': 'scmkpi',
    'embed-secavl': 'secavl',
    'embed-riskregister': 'riskregister',
    'embed-cfpPt': 'categoryfactpacks',
}


def _resolve_access(email: str) -> Optional[dict]:
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT u.id, r.role_key
                FROM users u JOIN roles r ON r.role_key = u.role_key
                WHERE lower(u.email) = lower(%s)
                """,
                (email,),
            )
            row = cur.fetchone()
            if row is None:
                return None
            user_id, role_key = row

            editable = _user_modules(cur, user_id)
            if role_key == "administrator":
                modules = _all_module_keys(cur, include_admin=True)
            elif role_key == "editor":
                modules = _all_module_keys(cur, include_admin=False)
            else:
                modules = editable

            return {"roleKey": role_key, "modules": modules, "editableModules": editable}
    finally:
        db.put_conn(conn)


@router.get("/api/data/{dataset_key}")
def get_dataset(dataset_key: str, email: str = Query(...)):
    module_key = DATASET_MODULE.get(dataset_key)
    if module_key is None:
        raise HTTPException(status_code=404, detail=f"Unknown dataset: {dataset_key}")

    access = _resolve_access(email)
    if access is None:
        raise HTTPException(status_code=404, detail="User not registered for this app")
    if module_key not in access["modules"]:
        raise HTTPException(status_code=403, detail="Not permitted to view this dataset")

    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT payload::text FROM scm.datasets WHERE dataset_key = %s", (dataset_key,))
            row = cur.fetchone()
    finally:
        db.put_conn(conn)

    if row is None:
        raise HTTPException(status_code=404, detail="Dataset has no data yet")
    return json.loads(row[0])


@router.put("/api/data/{dataset_key}")
def put_dataset(dataset_key: str, body: dict, x_user_email: str = Header(...)):
    module_key = DATASET_MODULE.get(dataset_key)
    if module_key is None:
        raise HTTPException(status_code=404, detail=f"Unknown dataset: {dataset_key}")

    access = _resolve_access(x_user_email)
    if access is None:
        raise HTTPException(status_code=403, detail="Not registered for this app")

    can_edit = access["roleKey"] == "administrator" or module_key in access["editableModules"]
    if not can_edit:
        raise HTTPException(status_code=403, detail="Not permitted to edit this dataset")

    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO scm.datasets (dataset_key, payload, updated_by)
                VALUES (%s, %s, %s)
                ON CONFLICT (dataset_key) DO UPDATE SET
                    payload = EXCLUDED.payload, updated_at = now(), updated_by = EXCLUDED.updated_by
                RETURNING updated_at
                """,
                (dataset_key, json.dumps(body), x_user_email),
            )
            (updated_at,) = cur.fetchone()
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        db.put_conn(conn)

    return {"status": "ok", "datasetKey": dataset_key, "updatedAt": updated_at.isoformat()}
