# SCM LME API

Small FastAPI service that reads `scm.lme_snapshots` from Postgres and serves it
as JSON for the SCM SSOT app's Daily LME Alert page. This exists because a
browser can't talk to Postgres directly — this is the server-side piece that
holds the DB credentials and the CloudFront frontend calls over HTTPS instead.

## Endpoints

- `GET /healthz` — liveness check
- `GET /api/lme/dates` — `[{ "reportDate": "2026-08-31", "reportDateLabel": "31 Aug 2026" }, ...]`, newest first
- `GET /api/lme/snapshot/{report_date}` — full payload JSON for one date (`report_date` as `YYYY-MM-DD`)
- `GET /api/lme/latest` — full payload JSON for the newest date

## 1. Load the data (one-time)

Needs `psql` (the Postgres command-line client) able to reach your Postgres server,
and the CSV at `C:\Users\VISHAL RANA\Downloads\cra95_lmesnapshots.csv`.

```
psql "postgresql://<user>:<password>@<host>:5432/<database>" -f scripts/load_lme_data.sql
```

`\copy` inside that script streams the CSV from wherever `psql` is running — so
this works run either from this Windows machine (connecting out to Postgres on
EC2) or from the EC2 box itself after copying the CSV there. It also creates the
schema/table if they don't already exist, so it's safe to run standalone.

## 2. Run locally to test

```
cd scm-lme-backend
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env      REM then fill in real PGHOST/PGUSER/PGPASSWORD
uvicorn app.main:app --reload --port 8000
```

Visit `http://localhost:8000/api/lme/dates` to confirm it returns data.

## 3. Deploy to EC2 — option A: Docker (matches your Tender Workflow backend pattern)

Build and test locally first (already verified to work):

```
docker build -t scm-lme-api:1.0.0 .
docker run --rm -p 8000:8000 --env-file .env scm-lme-api:1.0.0
curl http://localhost:8000/healthz
```

Ship it to EC2 the same way as Tender Workflow — save, transfer, load:

```
docker save scm-lme-api:1.0.0 | gzip > scm-lme-api.tar.gz
scp scm-lme-api.tar.gz ubuntu@<ec2-host>:~/
```

```
# on the EC2 box
gunzip -c scm-lme-api.tar.gz | docker load
```

Create `.env` on the EC2 box (copy `.env.example`, fill in real values — if
Postgres runs on this same EC2 instance, `PGHOST=host.docker.internal` won't
work on plain Docker on Linux; use the box's actual IP or `172.17.0.1`, the
default Docker bridge gateway, or run the container with `--network host`).

```
docker run -d --name scm-lme-api --restart always \
  -p 127.0.0.1:8000:8000 \
  --env-file .env \
  scm-lme-api:1.0.0
curl http://127.0.0.1:8000/healthz
```

It's published to `127.0.0.1` only — not exposed to the internet directly.
Put nginx in front of it, same as below.

## 3. Deploy to EC2 — option B: plain venv + systemd

```
# on the EC2 box
sudo apt update && sudo apt install -y python3-venv python3-pip
git clone <this-repo>  # or scp the scm-lme-backend folder over
cd scm-lme-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
nano .env   # fill in real PGHOST/PGUSER/PGPASSWORD — if Postgres runs on this
            # same EC2 box, PGHOST=localhost
```

Run it as a systemd service so it survives reboots/crashes — create
`/etc/systemd/system/scm-lme-api.service`:

```ini
[Unit]
Description=SCM LME API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/scm-lme-backend
EnvironmentFile=/home/ubuntu/scm-lme-backend/.env
ExecStart=/home/ubuntu/scm-lme-backend/.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload
sudo systemctl enable --now scm-lme-api
sudo systemctl status scm-lme-api
curl http://127.0.0.1:8000/healthz
```

It binds to `127.0.0.1` only — not exposed to the internet directly. Put nginx
in front of it (same reverse-proxy pattern as the Tender Workflow backend in
your UAT guide), e.g. inside the existing 443 `server {}` block in
`/etc/nginx/sites-available/default`:

```nginx
location /lme-api/ {
    proxy_pass http://127.0.0.1:8000/;
}
```

```
sudo nginx -t
sudo systemctl reload nginx
```

Then the frontend calls `https://<your-ec2-domain>/lme-api/api/lme/dates` etc.

## CORS

`app/main.py` only allows requests from `https://dsgvjfnd2ao8v.cloudfront.net`
plus local dev ports. If the CloudFront URL ever changes, update
`ALLOWED_ORIGINS` in that file.
