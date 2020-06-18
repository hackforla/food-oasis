/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "fk_stakeholder_best_category_category"
  );

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "fk_stakeholder_best_category_category",
    "FOREIGN KEY (category_id) REFERENCES category(id)"
  );

  pgm.dropConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "fk_stakeholder_best_category_stakeholder_best"
  );

  pgm.addConstraint(
    { schema: "public", name: "stakeholder_best_category" },
    "fk_stakeholder_best_category_stakeholder_best",
    "FOREIGN KEY (stakeholder_id) REFERENCES stakeholder_best(id) ON DELETE CASCADE"
  );
};

exports.down = () => {
  // Not reversible
};
