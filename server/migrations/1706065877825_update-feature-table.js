/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  DROP TABLE feature_to_login;
  `);
  pgm.sql(`
  DROP TABLE feature_flag;
  `);
  pgm.sql(`
  CREATE TABLE feature_flag (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    name character varying NOT NULL
    );
  `);
  pgm.sql(`
  CREATE TABLE feature_to_login (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    feature_id integer NOT NULL,
    login_id integer NOT NULL 
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE feature_to_login;
  `);
  pgm.sql(`
  DROP TABLE feature_flag;
  `);
};
