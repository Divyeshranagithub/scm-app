FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend

EXPOSE 8000

# ROOT_PATH lets this run correctly behind an nginx path prefix (e.g. /l0l1/)
# so every generated URL (including /docs, /openapi.json) is correct --
# same pattern as scm-lme-backend's deployment. Empty by default for local runs.
CMD exec uvicorn backend.main:app --host 0.0.0.0 --port 8000 --root-path "${ROOT_PATH:-}"
