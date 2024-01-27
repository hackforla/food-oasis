/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE feature_flag (
    id integer primary key,
    name character varying NOT NULL
    );
  `);
  pgm.sql(`
  CREATE TABLE feature_to_login (
    id integer primary key,
    feature_id integer NOT NULL,
    login_id integer NOT NULL
    );
  `);
  pgm.sql(`
  ALTER TABLE public.feature_to_login 
  ADD CONSTRAINT 
    fk_feature_flag_feature_to_login
    FOREIGN KEY (feature_id) REFERENCES feature_flag(id),
    ADD CONSTRAINT 
    fk_login_feature_to_login
    FOREIGN KEY (login_id) REFERENCES login(id)
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
