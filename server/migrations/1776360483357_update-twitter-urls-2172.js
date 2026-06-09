/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    UPDATE stakeholder
    SET twitter = REPLACE(twitter, 'twitter.com', 'x.com')
    WHERE twitter ILIKE '%twitter.com%';
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    UPDATE stakeholder
    SET twitter = REPLACE(twitter, 'x.com', 'twitter.com')
    WHERE twitter ILIKE '%x.com%';
  `);
};