import json
import os

import psycopg2
from dotenv import load_dotenv

DATASETS = {
    'overview': r'D:\Algihaz Project\scm-ssot-local-app\scm-overview.json',
    'masterdata': r'D:\Algihaz Project\scm-ssot-local-app\scm-masterdata.json',
    'coststructure': r'D:\Algihaz Project\scm-ssot-local-app\cost-structure.json',
    'monthly': r'D:\Algihaz Project\scm-ssot-local-app\scm-monthly.json',
    'embed-scmkpi': r'D:\Algihaz Project\scm-ssot-local-app\scm-embed-scmkpi.json',
    'embed-secavl': r'D:\Algihaz Project\scm-ssot-local-app\scm-embed-secavl.json',
    'embed-riskregister': r'D:\Algihaz Project\scm-ssot-local-app\scm-embed-riskregister.json',
    'embed-cfpPt': r'D:\Algihaz Project\scm-ssot-local-app\scm-embed-cfp-powertransformers.json',
}


def main():
    load_dotenv()
    conn = psycopg2.connect(
        host=os.environ["PGHOST"], port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ["PGDATABASE"], user=os.environ["PGUSER"], password=os.environ["PGPASSWORD"],
        options="-c search_path=scm",
    )
    try:
        with conn.cursor() as cur:
            for key, path in DATASETS.items():
                with open(path, "r", encoding="utf-8") as f:
                    payload = json.load(f)
                cur.execute(
                    """
                    INSERT INTO datasets (dataset_key, payload, updated_by)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (dataset_key) DO UPDATE SET payload = EXCLUDED.payload, updated_at = now(), updated_by = EXCLUDED.updated_by
                    """,
                    (key, json.dumps(payload), "migration"),
                )
                print(f"seeded {key} ({len(json.dumps(payload))} bytes)")
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    main()
