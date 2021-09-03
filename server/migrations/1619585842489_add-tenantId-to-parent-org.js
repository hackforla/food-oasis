/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `ALTER TABLE public.parent_organization
    ADD COLUMN tenant_id integer;`
  );
};

exports.down = (pgm) => {
  pgm.sql(
    `ALTER TABLE public.parent_organization
      DROP COLUMN tenant_id integer;`
  );
};
