-- Project Readiness (L0/L1) Platform -- PostgreSQL schema
-- Generated directly from backend/models.py (SQLAlchemy metadata),
-- compiled for the postgresql dialect. Structure only -- no data.
-- Reproduces exactly what `python -m backend.seed` builds against
-- any blank Postgres database in production.
--
-- Run top to bottom against an empty database. Enum types are created
-- first, then tables (without foreign keys), then every foreign key is
-- added via ALTER TABLE -- a couple of tables reference each other, so
-- this order is what lets the whole file run cleanly in one pass.

-- ============================================================
-- 1. ENUM TYPES
-- ============================================================

CREATE TYPE stage AS ENUM ('L0', 'L1');
CREATE TYPE projectstatus AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'CANCELLED', 'COMPLETED');
CREATE TYPE contractstatus AS ENUM ('NOT_SIGNED', 'SIGNED');
CREATE TYPE submissionstatus AS ENUM ('NO_PROGRESS', 'IN_PROGRESS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'PENDING_TRIAGE', 'NOT_REQUIRED', 'NOT_DUE', 'DUE', 'OVERDUE', 'PENDING_COMPLETION');
CREATE TYPE announcementtype AS ENUM ('BROADCAST', 'OWNER', 'SME_REQUEST', 'SME_DECISION', 'UNLOCK', 'DEADLINE', 'CLOSED', 'MILESTONE', 'BSD_EXTENDED', 'DOC_ADDED', 'DELIVERABLE_APPROVED', 'EXTENSION_REQUEST', 'EXTENSION_DECISION', 'HOLD_REQUEST', 'HOLD_DECISION', 'REASSIGNMENT_DECISION', 'SME_NOMINATION_DECISION', 'BID_VALUE_ACCESS_DECISION', 'COMM_OFFER_ACCESS_DECISION', 'GROUP_ADD_DECISION', 'FORMULA_CHANGE_DECISION', 'REVERTED');

-- ============================================================
-- 2. TABLES
-- ============================================================

-- departments
CREATE TABLE departments (
	id SERIAL NOT NULL, 
	name VARCHAR NOT NULL, 
	number INTEGER, 
	focal_point_name VARCHAR, 
	focal_point_email VARCHAR, 
	is_international BOOLEAN, 
	active BOOLEAN, 
	PRIMARY KEY (id), 
	UNIQUE (name)
);

-- users
CREATE TABLE users (
	id SERIAL NOT NULL, 
	name VARCHAR NOT NULL, 
	email VARCHAR NOT NULL, 
	role VARCHAR, 
	department_id INTEGER, 
	manager_email VARCHAR, 
	PRIMARY KEY (id), 
	UNIQUE (email)
);

-- bid_managers
CREATE TABLE bid_managers (
	id SERIAL NOT NULL, 
	email VARCHAR NOT NULL, 
	name VARCHAR, 
	active BOOLEAN, 
	PRIMARY KEY (id), 
	UNIQUE (email)
);

-- projects
CREATE TABLE projects (
	id SERIAL NOT NULL, 
	est_no VARCHAR NOT NULL, 
	name VARCHAR NOT NULL, 
	stage stage NOT NULL, 
	region JSON, 
	region_other VARCHAR, 
	scope JSON, 
	scope_other VARCHAR, 
	rfx_number VARCHAR, 
	scope_contains_pbu BOOLEAN, 
	business_units JSON, 
	is_international BOOLEAN, 
	country VARCHAR, 
	bid_manager VARCHAR, 
	project_manager VARCHAR, 
	status projectstatus, 
	contract_status contractstatus, 
	announcement_date DATE, 
	bsd DATE, 
	site_visit_date DATE, 
	pre_bid_meeting_date DATE, 
	pre_bid_deadline DATE, 
	l0_source_id INTEGER, 
	onedrive_folder_id VARCHAR, 
	onedrive_folder_path VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	due_dates_computed_on DATE, 
	last_triage_reminder_at TIMESTAMP WITHOUT TIME ZONE, 
	duration_ratio FLOAT, 
	duration_ratio_insufficient BOOLEAN, 
	bid_value FLOAT, 
	archived BOOLEAN, 
	archived_at TIMESTAMP WITHOUT TIME ZONE, 
	closed_at TIMESTAMP WITHOUT TIME ZONE, 
	due_date_shift_days INTEGER, 
	PRIMARY KEY (id)
);

-- deliverable_definitions
CREATE TABLE deliverable_definitions (
	id SERIAL NOT NULL, 
	stage stage NOT NULL, 
	item_no VARCHAR NOT NULL, 
	name VARCHAR NOT NULL, 
	short_name VARCHAR, 
	department_id INTEGER NOT NULL, 
	anchor_type VARCHAR, 
	predecessor_item_no VARCHAR, 
	offset_days INTEGER, 
	offset_direction VARCHAR, 
	deliverable_type VARCHAR, 
	is_milestone BOOLEAN, 
	milestone_code VARCHAR, 
	milestone_name VARCHAR, 
	kpi_relevant BOOLEAN, 
	kpi_weight FLOAT, 
	default_owner_email VARCHAR, 
	default_sme_email VARCHAR, 
	active BOOLEAN, 
	focal_point_name VARCHAR, 
	focal_point_email VARCHAR, 
	focal_point_emails JSON, 
	default_sme_emails JSON, 
	default_owner_emails JSON, 
	line_item_category VARCHAR, 
	is_customized BOOLEAN, 
	seed_key VARCHAR, 
	PRIMARY KEY (id)
);

-- deliverable_formula_branches
CREATE TABLE deliverable_formula_branches (
	id SERIAL NOT NULL, 
	deliverable_definition_id INTEGER NOT NULL, 
	branch_order INTEGER, 
	condition_type VARCHAR NOT NULL, 
	condition_value INTEGER, 
	anchor_type VARCHAR NOT NULL, 
	predecessor_item_no VARCHAR, 
	offset_days INTEGER, 
	offset_direction VARCHAR, 
	workday_duration BOOLEAN, 
	tie_break VARCHAR, 
	active BOOLEAN, 
	PRIMARY KEY (id)
);

-- deliverable_definition_change_log
CREATE TABLE deliverable_definition_change_log (
	id SERIAL NOT NULL, 
	deliverable_definition_id INTEGER NOT NULL, 
	changed_at TIMESTAMP WITHOUT TIME ZONE, 
	actor_email VARCHAR, 
	actor_name VARCHAR, 
	source VARCHAR NOT NULL, 
	change_type VARCHAR NOT NULL, 
	before_snapshot JSON, 
	after_snapshot JSON, 
	summary TEXT, 
	origin_request_id INTEGER, 
	reverted BOOLEAN, 
	PRIMARY KEY (id)
);

-- department_change_log
CREATE TABLE department_change_log (
	id SERIAL NOT NULL, 
	department_id INTEGER NOT NULL, 
	changed_at TIMESTAMP WITHOUT TIME ZONE, 
	actor_email VARCHAR, 
	actor_name VARCHAR, 
	change_type VARCHAR NOT NULL, 
	before_snapshot JSON, 
	after_snapshot JSON, 
	summary TEXT, 
	reverted BOOLEAN, 
	PRIMARY KEY (id)
);

-- formula_change_requests
CREATE TABLE formula_change_requests (
	id SERIAL NOT NULL, 
	deliverable_definition_id INTEGER NOT NULL, 
	requested_by_email VARCHAR NOT NULL, 
	requested_by_name VARCHAR, 
	current_summary TEXT, 
	proposed_branches JSON NOT NULL, 
	proposed_weight FLOAT, 
	comment TEXT NOT NULL, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_by_email VARCHAR, 
	decision_comment TEXT, 
	applied_change_log_id INTEGER, 
	PRIMARY KEY (id)
);

-- deliverable_submissions
CREATE TABLE deliverable_submissions (
	id SERIAL NOT NULL, 
	project_id INTEGER NOT NULL, 
	deliverable_definition_id INTEGER NOT NULL, 
	due_date DATE, 
	status submissionstatus, 
	applicability VARCHAR, 
	owner_email VARCHAR, 
	owner_emails JSON, 
	sme_email VARCHAR, 
	sme_emails JSON, 
	file_name VARCHAR, 
	file_ref VARCHAR, 
	submitted_at TIMESTAMP WITHOUT TIME ZONE, 
	review_comment TEXT, 
	reviewed_at TIMESTAMP WITHOUT TIME ZONE, 
	reviewed_by_email VARCHAR, 
	updated_at TIMESTAMP WITHOUT TIME ZONE, 
	auto_completed BOOLEAN, 
	on_hold BOOLEAN, 
	on_hold_since TIMESTAMP WITHOUT TIME ZONE, 
	hold_reason TEXT, 
	due_date_locked BOOLEAN, 
	due_soon_reminded_for_date DATE, 
	due_soon_reminded_offsets JSON, 
	po_line_item_id INTEGER, 
	po_selection JSON, 
	PRIMARY KEY (id)
);

-- workflow_history
CREATE TABLE workflow_history (
	id SERIAL NOT NULL, 
	submission_id INTEGER NOT NULL, 
	action VARCHAR NOT NULL, 
	actor_name VARCHAR, 
	note TEXT, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- po_line_items
CREATE TABLE po_line_items (
	id SERIAL NOT NULL, 
	project_id INTEGER NOT NULL, 
	category VARCHAR NOT NULL, 
	name VARCHAR NOT NULL, 
	source VARCHAR NOT NULL, 
	meta JSON, 
	status VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	created_by_email VARCHAR, 
	source_submission_id INTEGER, 
	po_number VARCHAR, 
	PRIMARY KEY (id)
);

-- documents
CREATE TABLE documents (
	id SERIAL NOT NULL, 
	submission_id INTEGER NOT NULL, 
	file_name VARCHAR NOT NULL, 
	file_ref VARCHAR NOT NULL, 
	uploaded_by VARCHAR, 
	uploaded_at TIMESTAMP WITHOUT TIME ZONE, 
	status VARCHAR, 
	comment TEXT, 
	reviewed_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- tender_documents
CREATE TABLE tender_documents (
	id SERIAL NOT NULL, 
	project_id INTEGER NOT NULL, 
	file_name VARCHAR NOT NULL, 
	file_ref VARCHAR NOT NULL, 
	folder_path VARCHAR NOT NULL, 
	uploaded_by VARCHAR, 
	uploaded_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- followers
CREATE TABLE followers (
	id SERIAL NOT NULL, 
	submission_id INTEGER NOT NULL, 
	email VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- reassignment_requests
CREATE TABLE reassignment_requests (
	id SERIAL NOT NULL, 
	submission_id INTEGER NOT NULL, 
	from_email VARCHAR, 
	to_email VARCHAR NOT NULL, 
	reason TEXT, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- bid_value_access_requests
CREATE TABLE bid_value_access_requests (
	id SERIAL NOT NULL, 
	project_id INTEGER NOT NULL, 
	requested_by_email VARCHAR NOT NULL, 
	requested_by_name VARCHAR, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_by_email VARCHAR, 
	PRIMARY KEY (id)
);

-- comm_offer_access_requests
CREATE TABLE comm_offer_access_requests (
	id SERIAL NOT NULL, 
	submission_id INTEGER NOT NULL, 
	requested_by_email VARCHAR NOT NULL, 
	requested_by_name VARCHAR, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_by_email VARCHAR, 
	PRIMARY KEY (id)
);

-- sme_nominations
CREATE TABLE sme_nominations (
	id SERIAL NOT NULL, 
	email VARCHAR NOT NULL, 
	name VARCHAR, 
	deliverable_definition_id INTEGER NOT NULL, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_by_email VARCHAR, 
	decision_comment TEXT, 
	PRIMARY KEY (id)
);

-- user_add_requests
CREATE TABLE user_add_requests (
	id SERIAL NOT NULL, 
	email VARCHAR NOT NULL, 
	name VARCHAR, 
	role VARCHAR, 
	requested_by_email VARCHAR NOT NULL, 
	requested_by_name VARCHAR, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_by_email VARCHAR, 
	decision_comment TEXT, 
	PRIMARY KEY (id)
);

-- due_date_requests
CREATE TABLE due_date_requests (
	id SERIAL NOT NULL, 
	submission_id INTEGER NOT NULL, 
	kind VARCHAR NOT NULL, 
	requested_by_email VARCHAR NOT NULL, 
	reason TEXT NOT NULL, 
	requested_due_date DATE, 
	status VARCHAR, 
	requested_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_at TIMESTAMP WITHOUT TIME ZONE, 
	decided_by_email VARCHAR, 
	decision_comment TEXT, 
	escalated_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- support_requests
CREATE TABLE support_requests (
	id SERIAL NOT NULL, 
	name VARCHAR, 
	email VARCHAR NOT NULL, 
	stage VARCHAR, 
	est_no VARCHAR, 
	deliverable VARCHAR, 
	target_email VARCHAR, 
	message TEXT NOT NULL, 
	status VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	resolved_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- support_messages
CREATE TABLE support_messages (
	id SERIAL NOT NULL, 
	request_id INTEGER NOT NULL, 
	author VARCHAR NOT NULL, 
	body TEXT NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	kb_reference_id INTEGER, 
	PRIMARY KEY (id)
);

-- kb_entries
CREATE TABLE kb_entries (
	id SERIAL NOT NULL, 
	category VARCHAR NOT NULL, 
	question TEXT NOT NULL, 
	answer TEXT NOT NULL, 
	source_request_id INTEGER, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	est_no VARCHAR, 
	deliverable VARCHAR, 
	PRIMARY KEY (id)
);

-- bm_triage_preferences
CREATE TABLE bm_triage_preferences (
	id SERIAL NOT NULL, 
	bid_manager VARCHAR NOT NULL, 
	item_no VARCHAR NOT NULL, 
	applicable BOOLEAN NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- performance_snapshots
CREATE TABLE performance_snapshots (
	id SERIAL NOT NULL, 
	department_id INTEGER NOT NULL, 
	stage stage NOT NULL, 
	month DATE NOT NULL, 
	pct FLOAT, 
	approved INTEGER NOT NULL, 
	total INTEGER NOT NULL, 
	captured_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- announcements
CREATE TABLE announcements (
	id SERIAL NOT NULL, 
	type announcementtype NOT NULL, 
	title VARCHAR NOT NULL, 
	body TEXT NOT NULL, 
	recipients VARCHAR, 
	project_id INTEGER, 
	submission_id INTEGER, 
	email_status VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY (id)
);

-- ai_chat_usage
CREATE TABLE ai_chat_usage (
	id SERIAL NOT NULL, 
	email VARCHAR NOT NULL, 
	usage_date DATE NOT NULL, 
	count INTEGER, 
	PRIMARY KEY (id), 
	CONSTRAINT uq_ai_chat_usage_email_date UNIQUE (email, usage_date)
);

-- ============================================================
-- 3. FOREIGN KEYS
-- ============================================================

ALTER TABLE users ADD FOREIGN KEY(department_id) REFERENCES departments (id);
ALTER TABLE projects ADD FOREIGN KEY(l0_source_id) REFERENCES projects (id);
ALTER TABLE deliverable_definitions ADD FOREIGN KEY(department_id) REFERENCES departments (id);
ALTER TABLE deliverable_formula_branches ADD FOREIGN KEY(deliverable_definition_id) REFERENCES deliverable_definitions (id);
ALTER TABLE deliverable_definition_change_log ADD FOREIGN KEY(origin_request_id) REFERENCES formula_change_requests (id);
ALTER TABLE deliverable_definition_change_log ADD FOREIGN KEY(deliverable_definition_id) REFERENCES deliverable_definitions (id);
ALTER TABLE department_change_log ADD FOREIGN KEY(department_id) REFERENCES departments (id);
ALTER TABLE formula_change_requests ADD FOREIGN KEY(deliverable_definition_id) REFERENCES deliverable_definitions (id);
ALTER TABLE formula_change_requests ADD FOREIGN KEY(applied_change_log_id) REFERENCES deliverable_definition_change_log (id);
ALTER TABLE deliverable_submissions ADD FOREIGN KEY(project_id) REFERENCES projects (id);
ALTER TABLE deliverable_submissions ADD FOREIGN KEY(po_line_item_id) REFERENCES po_line_items (id);
ALTER TABLE deliverable_submissions ADD FOREIGN KEY(deliverable_definition_id) REFERENCES deliverable_definitions (id);
ALTER TABLE workflow_history ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE po_line_items ADD FOREIGN KEY(source_submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE po_line_items ADD FOREIGN KEY(project_id) REFERENCES projects (id);
ALTER TABLE documents ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE tender_documents ADD FOREIGN KEY(project_id) REFERENCES projects (id);
ALTER TABLE followers ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE reassignment_requests ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE bid_value_access_requests ADD FOREIGN KEY(project_id) REFERENCES projects (id);
ALTER TABLE comm_offer_access_requests ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE sme_nominations ADD FOREIGN KEY(deliverable_definition_id) REFERENCES deliverable_definitions (id);
ALTER TABLE due_date_requests ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);
ALTER TABLE support_messages ADD FOREIGN KEY(kb_reference_id) REFERENCES kb_entries (id);
ALTER TABLE support_messages ADD FOREIGN KEY(request_id) REFERENCES support_requests (id);
ALTER TABLE kb_entries ADD FOREIGN KEY(source_request_id) REFERENCES support_requests (id);
ALTER TABLE performance_snapshots ADD FOREIGN KEY(department_id) REFERENCES departments (id);
ALTER TABLE announcements ADD FOREIGN KEY(project_id) REFERENCES projects (id);
ALTER TABLE announcements ADD FOREIGN KEY(submission_id) REFERENCES deliverable_submissions (id);

-- ============================================================
-- 4. INDEXES
-- ============================================================
