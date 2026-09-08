SET search_path TO scm;

INSERT INTO permissions (permission_key, permission_name) VALUES
    ('all_modules', 'All Modules')
ON CONFLICT (permission_key) DO NOTHING;

INSERT INTO permission_modules (permission_key, module_key)
SELECT 'all_modules', module_key FROM modules WHERE module_key != 'admin'
ON CONFLICT DO NOTHING;

SELECT count(*) AS all_modules_module_count FROM permission_modules WHERE permission_key = 'all_modules';
