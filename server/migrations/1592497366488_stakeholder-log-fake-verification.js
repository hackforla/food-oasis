/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`update stakeholder_log 
  SET verification_status_id = 4
  WHERE complete_critical_percent = 100`);
  pgm.sql(`update stakeholder_best
  SET verification_status_id = 4, is_verified = true
  WHERE complete_critical_percent = 100`);
};

exports.down = false;
