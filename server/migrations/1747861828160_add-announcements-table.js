/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.sql(`
	CREATE TABLE IF NOT EXISTS announcements (
		id integer primary key GENERATED ALWAYS AS IDENTITY,
		title character varying NOT NULL,
		description character varying NOT NULL,
		is_enabled boolean NOT NULL DEFAULT false
		);
	`);
};

exports.down = pgm => {
	pgm.sql(`
	DROP TABLE announcements;
	`)
};
