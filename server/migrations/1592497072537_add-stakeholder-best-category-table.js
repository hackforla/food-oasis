/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: "public", name: "stakeholder_best_category" },
    {},
    { like: "stakeholder_category" }
  );

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "stakeholder_best_category_pk",
    "PRIMARY KEY(stakeholder_id, category_id)"
  );

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "fk_stakeholder_best_category_stakeholder_best",
    "FOREIGN KEY (stakeholder_id) REFERENCES stakeholder_best(id)"
  );

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "fk_stakeholder_best_category_category",
    "FOREIGN KEY (category_id) REFERENCES category(id)"
  );
};

exports.down = (pgm) => {
  pgm.dropTable({ schema: "public", name: "stakeholder_best_category" });
};
