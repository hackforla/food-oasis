/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `ALTER TABLE public.suggestion
    ADD COLUMN status character varying;
    `
  );
};

exports.down = (pgm) => {
  pgm.sql(
    `ALTER TABLE public.suggestion
      DROP COLUMN status character varying;
    `
  );
};
