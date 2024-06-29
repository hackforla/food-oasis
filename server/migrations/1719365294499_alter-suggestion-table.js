/* eslint-disable camelcase */
exports.shorthands = undefined;

const formTypeTyping = {
  Suggestion: "suggestion",
  Correction: "correction",
};
exports.up = (pgm) => {
  pgm.addColumn("suggestion", {
    form_type: {
      type: "text",
      default: formTypeTyping.Suggestion,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("suggestion", {
    form_type: {
      ifExists: true,
    },
  });
};
