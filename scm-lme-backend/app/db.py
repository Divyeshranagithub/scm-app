import os

from psycopg2.pool import ThreadedConnectionPool

_pool: ThreadedConnectionPool | None = None


def init_pool() -> None:
    global _pool
    if _pool is not None:
        return
    _pool = ThreadedConnectionPool(
        minconn=1,
        maxconn=10,
        host=os.environ["PGHOST"],
        port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ["PGDATABASE"],
        user=os.environ["PGUSER"],
        password=os.environ["PGPASSWORD"],
        options="-c search_path=scm",
    )


def close_pool() -> None:
    global _pool
    if _pool is not None:
        _pool.closeall()
        _pool = None


def get_conn():
    if _pool is None:
        raise RuntimeError("DB pool not initialized")
    return _pool.getconn()


def put_conn(conn) -> None:
    if _pool is not None:
        _pool.putconn(conn)
