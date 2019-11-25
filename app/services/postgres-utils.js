// Module of utilties for working with PostgreSQL

// Convert a javascript string to a string for postgres
const toSqlString = originalString => {
  if (!originalString) {
    return "''";
  }
  return "'" + originalString.replace("'", "''") + "'";
};

const toSqlNumeric = originalNumeric => {
  if (!originalNumeric) {
    return "null";
  }
  return originalNumeric;
};

const toSqlBoolean = originalBoolean => (originalBoolean ? "true" : "false");

module.exports = {
  toSqlString,
  toSqlNumeric,
  toSqlBoolean
};
