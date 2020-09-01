/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE public.suggestion (
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    stakeholder_id int NULL,
    name varchar NOT NULL DEFAULT '',
    address_1 varchar NOT NULL DEFAULT '',
    address_2 varchar NOT NULL DEFAULT '',
    city varchar NOT NULL DEFAULT '',
    state varchar NOT NULL DEFAULT '',
    zip varchar NOT NULL DEFAULT '',
    phone varchar NOT NULL DEFAULT '',
    email varchar NOT NULL DEFAULT '',
    notes varchar NOT NULL DEFAULT '',
    tipster_name varchar NOT NULL DEFAULT '',
    tipster_phone varchar NOT NULL DEFAULT '',
    tipster_email varchar NOT NULL DEFAULT '',
    hours varchar NOT NULL DEFAULT '',
    category varchar NOT NULL DEFAULT '',
    created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    suggestion_status_id int NOT NULL DEFAULT 1,
    admin_notes varchar NOT NULL DEFAULT ''
  );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE public.suggestion;
  `);
};
