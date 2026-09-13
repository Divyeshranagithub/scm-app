SET search_path TO scm;

-- v4: split the single per-user module list into "can view" (row exists) and
-- "can edit" (can_edit=true on that row). Previously an Editor automatically
-- saw every page regardless of their assigned modules (view was hardcoded to
-- "all"); the business wants Editors to see ONLY their assigned pages too,
-- editing a subset of those. A user's current module list represented their
-- EDIT rights under the old model (view was implicit), so we preserve that
-- as their edit set on migration — nobody's edit access changes here, only
-- editors' view access narrows from "everything" to "their assigned pages",
-- which is the actual fix being made.

ALTER TABLE user_modules ADD COLUMN IF NOT EXISTS can_edit BOOLEAN NOT NULL DEFAULT false;

UPDATE user_modules um
SET can_edit = true
FROM users u
WHERE u.id = um.user_id AND u.role_key = 'editor';

SELECT u.email, u.role_key, um.module_key, um.can_edit
FROM users u JOIN user_modules um ON um.user_id = u.id
WHERE u.role_key = 'editor'
ORDER BY u.email, um.module_key;
