SET search_path TO scm;

CREATE TABLE IF NOT EXISTS lme_snapshots (
    id                 UUID PRIMARY KEY,
    name               TEXT NOT NULL,
    payload_json       JSONB NOT NULL,
    report_date        DATE NOT NULL,
    report_date_label  TEXT NOT NULL,
    status_code        SMALLINT,
    state_code         SMALLINT,
    version_number     BIGINT,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (report_date)
);

CREATE INDEX IF NOT EXISTS idx_lme_snapshots_report_date
    ON lme_snapshots (report_date DESC);

CREATE TEMP TABLE lme_staging (
    importsequencenumber      TEXT,
    cra95_lmesnapshotid       TEXT,
    cra95_name                TEXT,
    cra95_payloadjson         TEXT,
    cra95_reportdate          TEXT,
    cra95_reportdatelabel     TEXT,
    statuscode                TEXT,
    statecode                 TEXT,
    timezoneruleversionnumber TEXT,
    utcconversiontimezonecode TEXT,
    versionnumber             TEXT,
    owningbusinessunit        TEXT
);

\copy lme_staging FROM 'C:\Users\VISHAL RANA\Downloads\cra95_lmesnapshots.csv' WITH (FORMAT csv, HEADER true)

INSERT INTO lme_snapshots (
    id, name, payload_json, report_date, report_date_label,
    status_code, state_code, version_number
)
SELECT
    cra95_lmesnapshotid::uuid,
    cra95_name,
    cra95_payloadjson::jsonb,
    cra95_reportdate::timestamp::date,
    cra95_reportdatelabel,
    NULLIF(statuscode, '')::smallint,
    NULLIF(statecode, '')::smallint,
    NULLIF(versionnumber, '')::bigint
FROM lme_staging
ON CONFLICT (report_date) DO UPDATE SET
    id                = EXCLUDED.id,
    name              = EXCLUDED.name,
    payload_json      = EXCLUDED.payload_json,
    report_date_label = EXCLUDED.report_date_label,
    status_code       = EXCLUDED.status_code,
    state_code        = EXCLUDED.state_code,
    version_number    = EXCLUDED.version_number;

SELECT count(*) AS rows_loaded FROM lme_snapshots;
