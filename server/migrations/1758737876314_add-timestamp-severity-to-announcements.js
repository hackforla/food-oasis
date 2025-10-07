/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
	ALTER TABLE announcements
	ADD COLUMN created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	ADD COLUMN severity character varying(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'success'));
	`);
};

exports.down = (pgm) => {
  pgm.sql(`
	ALTER TABLE announcements
	DROP COLUMN IF EXISTS created_at,
	DROP COLUMN IF EXISTS severity;
	`);
};
