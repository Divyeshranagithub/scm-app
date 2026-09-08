FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

# ROOT_PATH lets this run correctly behind an nginx path prefix (e.g. /scm/)
# so /docs, /openapi.json, and every route generate correct URLs — same
# pattern as Reinvention's own deployment. Empty by default for local runs.
CMD exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --root-path "${ROOT_PATH:-}"
