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
        # A handler that only reads (no explicit commit/rollback) leaves the
        # transaction open -- returning it to the pool like that means the
        # next request to reuse this connection inherits an "idle in
        # transaction" session, and enough of those exhaust the pool's fixed
        # maxconn, hanging every future request. Closing out any leftover
        # transaction here, once, makes that impossible regardless of what
        # any individual handler does or forgets to do. A harmless no-op for
        # handlers that already committed/rolled back themselves.
        try:
            conn.rollback()
        except Exception:
            pass
        _pool.putconn(conn)
