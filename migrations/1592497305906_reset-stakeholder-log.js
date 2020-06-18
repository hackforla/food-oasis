/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql("DELETE FROM stakeholder_best_category");
  pgm.sql("DELETE FROM stakeholder_best");
  pgm.sql("TRUNCATE TABLE stakeholder_log");

  // Use the trigger to populate the stakeholder_log
  // and stakeholder_best tables
  // with current data by doing a dummy update of the
  // stakeholder table.
  pgm.sql("update stakeholder set agency_type = agency_type");
};

exports.down = false;
