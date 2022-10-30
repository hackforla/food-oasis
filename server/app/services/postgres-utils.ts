// Module of utilties for working with PostgreSQL

// Convert a javascript string to a string for postgres
export const toSqlString = (originalString: string): string => {
  if (!originalString) {
    return "''";
  }
  return "'" + originalString.replace(/'/g, "''") + "'";
};

export const toSqlNumeric = (originalNumeric: number): string => {
  if (!originalNumeric) {
    return "null";
  }
  return originalNumeric.toString();
};

export const toSqlTimestamp = (originalDatetime: Date): string => {
  if (!originalDatetime) {
    return "null";
  }
  return `'${originalDatetime.toString()}'`;
};

export const toSqlBoolean = (originalBoolean: boolean): string =>
  originalBoolean ? "true" : "false";
