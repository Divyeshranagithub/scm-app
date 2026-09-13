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
    allow_methods=["GET", "POST", "PUT", "DELETE"],
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
