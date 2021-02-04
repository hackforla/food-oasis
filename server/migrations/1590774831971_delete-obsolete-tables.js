/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("webinar_stakeholder_schedule", { ifExists: true });
  pgm.dropTable("webinar_stakeholder_category", { ifExists: true });
  pgm.dropTable("webinar_stakeholder", { ifExists: true });
  pgm.dropTable("stakeholderbu", { ifExists: true });
  pgm.dropTable("stakeholder_season", { ifExists: true });
  pgm.dropTable("updated_stakeholders", { ifExists: true });
};

exports.down = () => {
  // Drop table is not reversible
};
