import os
import sys

import psycopg2
from dotenv import load_dotenv

EMAIL = "EXT-Divyesh.Rana@Algihaz.com"
USERNAME = "Divyesh Rana"
ROLE_KEY = "ssot_administrator"


def main():
    load_dotenv()
    conn = psycopg2.connect(
        host=os.environ["PGHOST"],
        port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ["PGDATABASE"],
        user=os.environ["PGUSER"],
        password=os.environ["PGPASSWORD"],
        options="-c search_path=scm",
    )
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO users (email, username, role_key)
                VALUES (%s, %s, %s)
                ON CONFLICT (email) DO UPDATE SET
                    username = EXCLUDED.username,
                    role_key = EXCLUDED.role_key
                RETURNING id, email, username, role_key
                """,
                (EMAIL, USERNAME, ROLE_KEY),
            )
            print(cur.fetchone())
        conn.commit()
        print("OK")
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    main()
