/* eslint-disable camelcase */
exports.shorthands = undefined;

const SuggestionOrCorrectionType = {
  Suggestion: "suggestion",
  Correction: "correction",
};
exports.up = (pgm) => {
  pgm.addColumn("suggestion", {
    suggestion_or_correction: {
      type: "text",
      default: SuggestionOrCorrectionType.Suggestion,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("suggestion", {
    suggestion_or_correction: {
      ifExists: true,
    },
  });
};
