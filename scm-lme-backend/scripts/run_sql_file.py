import os
import sys
from pathlib import Path

import psycopg2
from dotenv import load_dotenv


def main():
    load_dotenv()
    sql_path = Path(sys.argv[1])
    sql = sql_path.read_text(encoding="utf-8")

    conn = psycopg2.connect(
        host=os.environ["PGHOST"],
        port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ["PGDATABASE"],
        user=os.environ["PGUSER"],
        password=os.environ["PGPASSWORD"],
    )
    try:
        with conn.cursor() as cur:
            cur.execute(sql)
            try:
                rows = cur.fetchall()
                for row in rows:
                    print(row)
            except psycopg2.ProgrammingError:
                pass
        conn.commit()
        print("OK")
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    main()
