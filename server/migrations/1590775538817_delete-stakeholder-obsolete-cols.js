/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns("stakeholder", "daycode", { ifExists: true });
  pgm.dropColumns("stakeholder", "open", { ifExists: true });
  pgm.dropColumns("stakeholder", "close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode1", { ifExists: true });
  pgm.dropColumns("stakeholder", "day1_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day1_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode2", { ifExists: true });
  pgm.dropColumns("stakeholder", "day2_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day2_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode3", { ifExists: true });
  pgm.dropColumns("stakeholder", "day3_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day3_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode4", { ifExists: true });
  pgm.dropColumns("stakeholder", "day4_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day4_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode5", { ifExists: true });
  pgm.dropColumns("stakeholder", "day5_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day5_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode6", { ifExists: true });
  pgm.dropColumns("stakeholder", "day6_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day6_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "daycode7", { ifExists: true });
  pgm.dropColumns("stakeholder", "day7_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "day7_close", { ifExists: true });
  pgm.dropColumns("stakeholder", "year_round", { ifExists: true });
  pgm.dropColumns("stakeholder", "season_open", { ifExists: true });
  pgm.dropColumns("stakeholder", "season_close", { ifExists: true });
};

exports.down = () => {
  // Dropping columns is not really reversible
};
