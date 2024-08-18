/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
   ALTER TABLE public.feature_flag
   ADD COLUMN is_enabled boolean NOT NULL DEFAULT false;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  ALTER TABLE public.feature_flag
  DROP COLUMN is_enabled;
  `);
};
