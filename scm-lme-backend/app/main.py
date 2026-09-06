import json
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import db, rbac
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
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

app.include_router(rbac.router)


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
