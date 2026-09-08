SET search_path TO scm;

-- v2 RBAC model: role (administrator/editor/viewer) is the access level;
-- permission (the named groups from the sheet) is a separate many-to-many
-- layer a user can hold several of. Replaces the earlier granular-role model.

DROP TABLE IF EXISTS user_permissions;
DROP TABLE IF EXISTS permission_modules;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS role_modules;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    role_key  TEXT PRIMARY KEY,
    role_name TEXT NOT NULL
);

CREATE TABLE permissions (
    permission_key  TEXT PRIMARY KEY,
    permission_name TEXT NOT NULL
);

CREATE TABLE permission_modules (
    permission_key TEXT NOT NULL REFERENCES permissions(permission_key) ON DELETE CASCADE,
    module_key     TEXT NOT NULL REFERENCES modules(module_key) ON DELETE CASCADE,
    PRIMARY KEY (permission_key, module_key)
);

CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    username   TEXT,
    role_key   TEXT NOT NULL REFERENCES roles(role_key),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_users_email_lower ON users (lower(email));

CREATE TABLE user_permissions (
    user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permission_key TEXT NOT NULL REFERENCES permissions(permission_key) ON DELETE CASCADE,
    PRIMARY KEY (user_id, permission_key)
);

INSERT INTO roles (role_key, role_name) VALUES
    ('administrator', 'Administrator'),
    ('editor',        'Editor'),
    ('viewer',        'Viewer');

INSERT INTO permissions (permission_key, permission_name) VALUES
    ('scm_data_analytics',            'SCM Data Analytics'),
    ('procurement_risk_intelligence', 'Procurement Risk & Intelligence'),
    ('item_master_data_management',   'Item Master Data Management'),
    ('vendormaster_data_management',  'VendorMaster Data Management');

INSERT INTO permission_modules (permission_key, module_key) VALUES
    ('scm_data_analytics','overview'),
    ('scm_data_analytics','scmkpi'),

    ('procurement_risk_intelligence','monthly'),
    ('procurement_risk_intelligence','lme'),
    ('procurement_risk_intelligence','categoryfactpacks'),
    ('procurement_risk_intelligence','coststructure'),
    ('procurement_risk_intelligence','shouldcost'),
    ('procurement_risk_intelligence','strategy'),
    ('procurement_risk_intelligence','secavl'),
    ('procurement_risk_intelligence','secsole'),
    ('procurement_risk_intelligence','riskregister'),
    ('procurement_risk_intelligence','l0projects'),

    ('item_master_data_management','masterdata'),

    ('vendormaster_data_management','avl');

-- re-seed the first admin (chicken-and-egg: needs to exist before the
-- admin console can be used to add anyone else)
INSERT INTO users (email, username, role_key) VALUES
    ('EXT-Divyesh.Rana@Algihaz.com', 'Divyesh Rana', 'administrator')
ON CONFLICT (email) DO UPDATE SET role_key = EXCLUDED.role_key;

SELECT 'roles' AS table_name, count(*) FROM roles
UNION ALL SELECT 'permissions', count(*) FROM permissions
UNION ALL SELECT 'permission_modules', count(*) FROM permission_modules
UNION ALL SELECT 'users', count(*) FROM users;
