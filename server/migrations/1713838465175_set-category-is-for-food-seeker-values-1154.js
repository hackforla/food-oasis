/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`UPDATE Category SET is_for_food_seeker = false;

  UPDATE Category SET is_for_food_seeker = true
  WHERE id in (1,9,7,8,10 );`);
};

exports.down = (pgm) => {};
