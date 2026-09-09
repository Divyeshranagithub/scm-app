import json
import os

import psycopg2
from dotenv import load_dotenv

DATASETS = {
    'avl': r'D:\Algihaz Project\scm-ssot-local-app\avl.json',
    'sec-sole-source': r'D:\Algihaz Project\scm-ssot-local-app\sec-sole-source.json',
    'sec-avl-details': r'D:\Algihaz Project\scm-ssot-local-app\sec-avl-details.json',
}


def main():
    load_dotenv()
    conn = psycopg2.connect(
        host=os.environ["PGHOST"], port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ["PGDATABASE"], user=os.environ["PGUSER"], password=os.environ["PGPASSWORD"],
    )
    try:
        with conn.cursor() as cur:
            for key, path in DATASETS.items():
                with open(path, "r", encoding="utf-8") as f:
                    payload = json.load(f)
                cur.execute(
                    """
                    INSERT INTO scm.datasets (dataset_key, payload, updated_by)
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
