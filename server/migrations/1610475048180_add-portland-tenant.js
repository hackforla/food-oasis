exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`INSERT INTO tenant (id, name, code) VALUES (4, 'Portland', 'PDX')`);
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM tenant WHERE id = 4`);
};
