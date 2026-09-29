SET search_path TO scm;

-- Admin-visible activity log: who logged in, and who last changed which
-- piece of content. Append-only -- rows are never updated or deleted, so
-- this table is a straight history, not a "last changed by" pointer (that
-- already exists per-row on scm.datasets via updated_by/updated_at).

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,        -- e.g. 'login', 'dataset.update', 'user.add', 'user.remove'
    target TEXT,                 -- e.g. the dataset_key, or the affected user's email
    detail JSONB
);

CREATE INDEX IF NOT EXISTS audit_log_occurred_at_idx ON audit_log (occurred_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_actor_email_idx ON audit_log (actor_email);

SELECT count(*) FROM audit_log;
