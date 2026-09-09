SET search_path TO scm;

-- cfp-power-transformers is a drill-down sub-page reached from Category Fact
-- Packs, but was never registered as its own module — meaning it's been
-- unreachable under RBAC (even for administrators) since RBAC went live.
-- Grant it everywhere categoryfactpacks is granted.

INSERT INTO modules (module_key, module_name, sort_order) VALUES
    ('cfp-power-transformers', 'Category Fact Packs — Power Transformers', 11)
ON CONFLICT (module_key) DO NOTHING;

INSERT INTO permission_modules (permission_key, module_key)
SELECT permission_key, 'cfp-power-transformers'
FROM permission_modules WHERE module_key = 'categoryfactpacks'
ON CONFLICT DO NOTHING;

INSERT INTO permission_modules (permission_key, module_key)
VALUES ('all_modules', 'cfp-power-transformers')
ON CONFLICT DO NOTHING;

SELECT count(*) AS grants_for_cfp_pt FROM permission_modules WHERE module_key = 'cfp-power-transformers';
