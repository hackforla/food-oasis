/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("suggestion", {
    closed_date: { type: "timestamp", notNull: false },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("suggestion", { closed_date: { ifExists: true } });
};
