/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`INSERT INTO tenant (id, name, code) VALUES (3, 'Hawaii', 'HI')`);
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM tenant WHERE id = 3`);
};
