SET search_path TO scm;

CREATE TABLE IF NOT EXISTS modules (
    module_key   TEXT PRIMARY KEY,
    module_name  TEXT NOT NULL,
    sort_order   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    role_key      TEXT PRIMARY KEY,
    role_name     TEXT NOT NULL,
    role_category TEXT NOT NULL CHECK (role_category IN ('administrator','editor','viewer'))
);

CREATE TABLE IF NOT EXISTS role_modules (
    role_key   TEXT NOT NULL REFERENCES roles(role_key) ON DELETE CASCADE,
    module_key TEXT NOT NULL REFERENCES modules(module_key) ON DELETE CASCADE,
    PRIMARY KEY (role_key, module_key)
);

CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    username   TEXT,
    role_key   TEXT NOT NULL REFERENCES roles(role_key),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_users_email_lower ON users (lower(email));

-- 14 modules from the sheet, plus the admin-only user-management console
INSERT INTO modules (module_key, module_name, sort_order) VALUES
    ('admin',             'User Management (Admin)',        0),
    ('overview',          'Overview',                        1),
    ('scmkpi',            'SCM KPIs',                         2),
    ('monthly',           'Monthly Intelligence',             3),
    ('lme',               'Daily LME Alert',                  4),
    ('masterdata',        'Master Data Management',           5),
    ('avl',               'AGC Approved Vendor List',         6),
    ('secavl',            'SEC Approved Vendor List',         7),
    ('secsole',           'SEC AVL Sole Source Risk',         8),
    ('riskregister',      'Risk Register',                    9),
    ('l0projects',        'L0 Projects',                     10),
    ('categoryfactpacks', 'Category Fact Packs',             11),
    ('coststructure',     'Cost Structure',                  12),
    ('shouldcost',        'Should-Cost Model',               13),
    ('strategy',          'Strategy Recommendation',         14)
ON CONFLICT (module_key) DO NOTHING;

INSERT INTO roles (role_key, role_name, role_category) VALUES
    ('ssot_administrator',           'SSOT Administrator',              'administrator'),
    ('scm_data_analytics',           'SCM Data Analytics',              'editor'),
    ('procurement_risk_intelligence','Procurement Risk & Intelligence', 'editor'),
    ('item_master_data_management',  'Item Master Data Management',     'editor'),
    ('vendormaster_data_management', 'VendorMaster Data Management',    'editor'),
    ('viewer_level_1', 'Viewer Level 1', 'viewer'),
    ('viewer_level_2', 'Viewer Level 2', 'viewer'),
    ('viewer_level_3', 'Viewer Level 3', 'viewer'),
    ('viewer_level_4', 'Viewer Level 4', 'viewer'),
    ('viewer_level_5', 'Viewer Level 5', 'viewer')
ON CONFLICT (role_key) DO NOTHING;

INSERT INTO role_modules (role_key, module_key) VALUES
    -- Administrator: everything, including the admin console
    ('ssot_administrator','admin'),
    ('ssot_administrator','overview'),
    ('ssot_administrator','scmkpi'),
    ('ssot_administrator','monthly'),
    ('ssot_administrator','lme'),
    ('ssot_administrator','masterdata'),
    ('ssot_administrator','avl'),
    ('ssot_administrator','secavl'),
    ('ssot_administrator','secsole'),
    ('ssot_administrator','riskregister'),
    ('ssot_administrator','l0projects'),
    ('ssot_administrator','categoryfactpacks'),
    ('ssot_administrator','coststructure'),
    ('ssot_administrator','shouldcost'),
    ('ssot_administrator','strategy'),

    -- SCM Data Analytics
    ('scm_data_analytics','overview'),
    ('scm_data_analytics','scmkpi'),

    -- Procurement Risk & Intelligence
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

    -- Item Master Data Management
    ('item_master_data_management','masterdata'),

    -- VendorMaster Data Management
    ('vendormaster_data_management','avl')
    -- Viewer Level 1-5: intentionally no modules yet ("to be defined later" per the sheet)
ON CONFLICT DO NOTHING;

SELECT 'modules' AS table_name, count(*) FROM modules
UNION ALL SELECT 'roles', count(*) FROM roles
UNION ALL SELECT 'role_modules', count(*) FROM role_modules
UNION ALL SELECT 'users', count(*) FROM users;
