import csv
import json
import os
import sys
from pathlib import Path

import psycopg2
from dotenv import load_dotenv

DDL = """
CREATE SCHEMA IF NOT EXISTS scm;

CREATE TABLE IF NOT EXISTS scm.lme_snapshots (
    id                 UUID PRIMARY KEY,
    name               TEXT NOT NULL,
    payload_json       JSONB NOT NULL,
    report_date        DATE NOT NULL,
    report_date_label  TEXT NOT NULL,
    status_code        SMALLINT,
    state_code         SMALLINT,
    version_number     BIGINT,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (report_date)
);

CREATE INDEX IF NOT EXISTS idx_lme_snapshots_report_date
    ON scm.lme_snapshots (report_date DESC);
"""

UPSERT = """
INSERT INTO scm.lme_snapshots (
    id, name, payload_json, report_date, report_date_label,
    status_code, state_code, version_number
)
VALUES (%s, %s, %s::jsonb, %s::timestamp::date, %s, %s, %s, %s)
ON CONFLICT (report_date) DO UPDATE SET
    id                = EXCLUDED.id,
    name              = EXCLUDED.name,
    payload_json      = EXCLUDED.payload_json,
    report_date_label = EXCLUDED.report_date_label,
    status_code       = EXCLUDED.status_code,
    state_code        = EXCLUDED.state_code,
    version_number    = EXCLUDED.version_number
"""


def to_int(value: str):
    value = (value or "").strip()
    return int(value) if value else None


def main():
    load_dotenv()

    csv_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
        r"C:\Users\VISHAL RANA\Downloads\cra95_lmesnapshots.csv"
    )
    if not csv_path.exists():
        print(f"CSV not found: {csv_path}", file=sys.stderr)
        sys.exit(1)

    conn = psycopg2.connect(
        host=os.environ["PGHOST"],
        port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ["PGDATABASE"],
        user=os.environ["PGUSER"],
        password=os.environ["PGPASSWORD"],
    )
    conn.autocommit = False

    loaded = 0
    try:
        with conn.cursor() as cur:
            cur.execute(DDL)

            skipped = 0
            with open(csv_path, newline="", encoding="utf-8-sig") as f:
                reader = csv.DictReader(f)
                for row_num, row in enumerate(reader, start=2):
                    if not row.get("cra95_reportdate", "").strip():
                        print(f"Skipping row {row_num} ({row.get('cra95_name')}): report_date is blank", file=sys.stderr)
                        skipped += 1
                        continue

                    raw_payload = row["cra95_payloadjson"]
                    try:
                        payload_obj = json.loads(raw_payload)
                    except json.JSONDecodeError as e:
                        print(f"Skipping row {row_num} ({row.get('cra95_name')}): invalid JSON payload — {e}", file=sys.stderr)
                        skipped += 1
                        continue

                    cur.execute(
                        UPSERT,
                        (
                            row["cra95_lmesnapshotid"],
                            row["cra95_name"],
                            json.dumps(payload_obj),
                            row["cra95_reportdate"],
                            row["cra95_reportdatelabel"],
                            to_int(row.get("statuscode")),
                            to_int(row.get("statecode")),
                            to_int(row.get("versionnumber")),
                        ),
                    )
                    loaded += 1

        conn.commit()
        print(f"Loaded/updated {loaded} rows ({skipped} skipped).")

        with conn.cursor() as cur:
            cur.execute("SELECT count(*) FROM scm.lme_snapshots")
            (total,) = cur.fetchone()
            print(f"Table scm.lme_snapshots now has {total} rows.")
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    main()
