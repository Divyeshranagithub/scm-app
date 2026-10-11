FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
# main.py unconditionally mounts FRONTEND_DIR/static and data/local_storage
# at import time (app.mount(...) outside any request handler) -- even in a
# split S3/CloudFront deploy where nginx never actually proxies /static/* or
# /local-files/* to this container, the process still crashes on startup if
# these directories don't exist. Copying frontend/ costs nothing (plain
# HTML/JS, no build step) and makes the container self-sufficient regardless
# of which origin ends up serving those paths.
COPY frontend ./frontend
RUN mkdir -p data/local_storage

EXPOSE 8000

# ROOT_PATH lets this run correctly behind an nginx path prefix (e.g. /l0l1/)
# so every generated URL (including /docs, /openapi.json) is correct --
# same pattern as scm-lme-backend's deployment. Empty by default for local runs.
CMD exec uvicorn backend.main:app --host 0.0.0.0 --port 8000 --root-path "${ROOT_PATH:-}"
