exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`INSERT INTO tenant (id, name, code) VALUES (5, 'McKinney', 'MCK')`);
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM tenant WHERE id = 5`);
};
