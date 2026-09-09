SET search_path TO scm;

CREATE TABLE IF NOT EXISTS datasets (
    dataset_key TEXT PRIMARY KEY,
    payload     JSONB NOT NULL,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_by  TEXT
);

SELECT count(*) FROM datasets;
