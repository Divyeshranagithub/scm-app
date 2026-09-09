SET search_path TO scm;

-- v3 RBAC model: drop the named "permission" middle layer entirely. A user's
-- editable/viewable modules are now assigned directly, module by module, no
-- reusable named group in between. Role (administrator/editor/viewer) is
-- unchanged — still the access level; user_modules only ever matters for
-- editors (which modules they can edit) and viewers (which modules they can
-- see at all). Administrators ignore it, same as before.

CREATE TABLE IF NOT EXISTS user_modules (
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module_key TEXT NOT NULL REFERENCES modules(module_key) ON DELETE CASCADE,
    PRIMARY KEY (user_id, module_key)
);

-- carry forward any existing permission-based assignments as direct module
-- assignments, so nobody's access silently changes on cutover
INSERT INTO user_modules (user_id, module_key)
SELECT DISTINCT up.user_id, pm.module_key
FROM user_permissions up
JOIN permission_modules pm ON pm.permission_key = up.permission_key
ON CONFLICT DO NOTHING;

DROP TABLE user_permissions;
DROP TABLE permission_modules;
DROP TABLE permissions;

SELECT 'user_modules' AS table_name, count(*) FROM user_modules;
