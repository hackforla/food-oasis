exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `INSERT INTO tenant (id, name, code) VALUES (6, 'Santa Barbara', 'SB')`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM tenant WHERE id = 6`);
};
