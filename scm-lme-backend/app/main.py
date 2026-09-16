import json
import uuid
from contextlib import asynccontextmanager
from datetime import date

from dotenv import load_dotenv
from fastapi import Body, Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import db, datasets, rbac
from .auth import get_api_key

load_dotenv()

ALLOWED_ORIGINS = [
    "https://dsgvjfnd2ao8v.cloudfront.net",
    "http://localhost:8080",
    "http://localhost:8099",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5501",
    "http://127.0.0.1:5501",
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_pool()
    yield
    db.close_pool()


app = FastAPI(title="SCM LME API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)

app.include_router(rbac.router)
app.include_router(datasets.router)


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.get("/api/lme/dates")
def list_dates(api_key: str = Depends(get_api_key)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT report_date, report_date_label
                FROM lme_snapshots
                ORDER BY report_date DESC
                """
            )
            rows = cur.fetchall()
    finally:
        db.put_conn(conn)

    return [
        {"reportDate": report_date.isoformat(), "reportDateLabel": label}
        for report_date, label in rows
    ]


@app.get("/api/lme/snapshot/{report_date}")
def get_snapshot(report_date: str, api_key: str = Depends(get_api_key)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT payload_json::text, report_date_label
                FROM lme_snapshots
                WHERE report_date = %s
                """,
                (report_date,),
            )
            row = cur.fetchone()
    finally:
        db.put_conn(conn)

    if row is None:
        raise HTTPException(status_code=404, detail=f"No LME snapshot for {report_date}")

    payload_text, label = row
    payload = json.loads(payload_text)
    payload.setdefault("reportDate", report_date)
    payload.setdefault("reportDateLabel", label)
    return payload


@app.get("/api/lme/latest")
def get_latest(api_key: str = Depends(get_api_key)):
    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT payload_json::text, report_date, report_date_label
                FROM lme_snapshots
                ORDER BY report_date DESC
                LIMIT 1
                """
            )
            row = cur.fetchone()
    finally:
        db.put_conn(conn)

    if row is None:
        raise HTTPException(status_code=404, detail="No LME snapshots available")

    payload_text, report_date, label = row
    payload = json.loads(payload_text)
    payload.setdefault("reportDate", report_date.isoformat())
    payload.setdefault("reportDateLabel", label)
    return payload


@app.put("/api/lme/snapshot/{report_date}")
def put_snapshot(report_date: str, body: dict = Body(...), api_key: str = Depends(get_api_key)):
    try:
        date.fromisoformat(report_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="report_date must be YYYY-MM-DD")
    if not isinstance(body, dict) or not body.get("metals"):
        raise HTTPException(status_code=400, detail="Body must be the full Golden Schema payload (missing 'metals')")

    report_date_label = body.get("reportDateLabel") or report_date
    name = f"LME Snapshot {report_date_label}"

    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO lme_snapshots (id, report_date, report_date_label, payload_json, name)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (report_date) DO UPDATE SET
                    report_date_label = EXCLUDED.report_date_label,
                    payload_json = EXCLUDED.payload_json,
                    name = EXCLUDED.name
                RETURNING id, (xmax = 0) AS inserted
                """,
                (str(uuid.uuid4()), report_date, report_date_label, json.dumps(body), name),
            )
            row_id, inserted = cur.fetchone()
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        db.put_conn(conn)

    return {
        "status": "ok",
        "action": "insert" if inserted else "update",
        "reportDate": report_date,
        "id": str(row_id),
    }


UPDATABLE_SNAPSHOT_COLUMNS = {"report_date_label", "payload_json", "name", "status_code", "state_code", "version_number"}


def _update_snapshot_by_id(cur, record_id: str, item: dict) -> dict:
    if not isinstance(item, dict) or not item:
        return {"recordId": record_id, "status": "error", "error": "item must be a non-empty object"}
    unknown = set(item) - UPDATABLE_SNAPSHOT_COLUMNS
    if unknown:
        return {
            "recordId": record_id,
            "status": "error",
            "error": f"unsupported field(s): {', '.join(sorted(unknown))}",
        }

    set_parts, values = [], []
    for col, val in item.items():
        set_parts.append(f"{col} = %s")
        values.append(json.dumps(val) if col == "payload_json" else val)
    values.append(record_id)

    cur.execute(
        f"UPDATE lme_snapshots SET {', '.join(set_parts)} WHERE id = %s RETURNING id, report_date",
        values,
    )
    row = cur.fetchone()
    if row is None:
        return {"recordId": record_id, "status": "error", "error": "not found"}
    return {"recordId": record_id, "status": "ok", "reportDate": row[1].isoformat()}


@app.patch("/api/lme/snapshot/id")
def update_snapshot_by_id(body: dict = Body(...), api_key: str = Depends(get_api_key)):
    """Update one or more LME snapshot rows by id. Mirrors the Dataverse 'update row(s)' tool:
    pass 'recordId'+'item' for one row, or 'records' (array of {recordId, item}) for several."""
    if not isinstance(body, dict):
        raise HTTPException(status_code=400, detail="Body must be a JSON object")

    conn = db.get_conn()
    try:
        with conn.cursor() as cur:
            if "records" in body:
                records = body["records"]
                if not isinstance(records, list) or not records:
                    raise HTTPException(status_code=400, detail="'records' must be a non-empty array")
                results = []
                for rec in records:
                    if not isinstance(rec, dict) or "recordId" not in rec or "item" not in rec:
                        results.append({"status": "error", "error": "each record needs 'recordId' and 'item'"})
                        continue
                    results.append(_update_snapshot_by_id(cur, rec["recordId"], rec["item"]))
                conn.commit()
                return {"status": "ok", "results": results}

            if "recordId" in body and "item" in body:
                result = _update_snapshot_by_id(cur, body["recordId"], body["item"])
                conn.commit()
                if result["status"] == "error":
                    code = 404 if result.get("error") == "not found" else 400
                    raise HTTPException(status_code=code, detail=result["error"])
                return result

            raise HTTPException(status_code=400, detail="Provide either ('recordId' and 'item') or 'records'")
    except HTTPException:
        conn.rollback()
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        db.put_conn(conn)
