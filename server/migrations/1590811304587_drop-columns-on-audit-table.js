/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns("stakeholder_log", "verified_date", { ifExists: true });
  pgm.dropColumns("stakeholder_log", "verified_login_id", { ifExists: true });
};

exports.down = () => {};
