/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`ALTER TABLE public.neighborhood
  ADD COLUMN zoom numeric(6,2) DEFAULT 10;`);

  pgm.sql(`UPDATE public.neighborhood SET zoom = 10`);

  pgm.sql(`ALTER TABLE public.neighborhood
  ADD COLUMN tenant_id integer DEFAULT 1;`);
};

exports.down = (pgm) => {
  pgm.sql(`ALTER TABLE public.neighborhood
  DROP zoom`);

  pgm.sql(`ALTER TABLE public.neighborhood
  DROP tenant_id;`);
};
