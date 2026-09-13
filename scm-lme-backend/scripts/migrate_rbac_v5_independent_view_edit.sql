SET search_path TO scm;

-- v5: make "can view" its own column instead of implying it from row
-- existence. Previously a user_modules row always meant "can view", with
-- can_edit layered on top — that structurally couldn't represent "can edit
-- but not view" (e.g. a data-entry role that updates a page's content
-- without seeing the live dashboard). Every existing row currently means
-- "can view" under the old model, so defaulting can_view to true preserves
-- everyone's current access exactly — this only adds a new possibility
-- (edit-only rows), it doesn't change anything that already exists.

ALTER TABLE user_modules ADD COLUMN IF NOT EXISTS can_view BOOLEAN NOT NULL DEFAULT true;

SELECT count(*) AS total_rows, count(*) FILTER (WHERE can_view) AS can_view_rows, count(*) FILTER (WHERE can_edit) AS can_edit_rows
FROM user_modules;
