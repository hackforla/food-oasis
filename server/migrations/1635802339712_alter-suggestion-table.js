/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `ALTER TABLE public.suggestion
    ADD COLUMN tenant_id int not null default 1;

    ALTER TABLE public.suggestion
    DROP COLUMN status;
    `
  );
};

exports.down = (pgm) => {
  pgm.sql(
    `ALTER TABLE public.suggestion
      DROP COLUMN tenant_id;

    ALTER TABLE public.suggestion
      ADD COLUMN status character varying;
    `
  );
};
