import {
  toSqlBoolean,
  toSqlNumeric,
  toSqlString,
  toSqlTimestamp,
} from "../app/services/postgres-utils";

describe("toSqlString", () => {
  it("wraps a string in single quotes", () => {
    expect(toSqlString("hello")).toBe("'hello'");
  });

  it("escapes embedded single quotes by doubling them", () => {
    expect(toSqlString("St. Mary's Pantry")).toBe("'St. Mary''s Pantry'");
    expect(toSqlString("a'b'c")).toBe("'a''b''c'");
  });

  it("returns an empty SQL string for empty or missing input", () => {
    expect(toSqlString("")).toBe("''");
    expect(toSqlString(undefined as unknown as string)).toBe("''");
    expect(toSqlString(null as unknown as string)).toBe("''");
  });
});

describe("toSqlNumeric", () => {
  it("renders numbers as bare literals", () => {
    expect(toSqlNumeric(42)).toBe("42");
    expect(toSqlNumeric(-1.5)).toBe("-1.5");
  });

  it("renders zero and missing values as null", () => {
    expect(toSqlNumeric(0)).toBe("null");
    expect(toSqlNumeric(undefined as unknown as number)).toBe("null");
  });
});

describe("toSqlTimestamp", () => {
  it("quotes the date's string form", () => {
    const date = new Date("2026-01-02T03:04:05Z");
    expect(toSqlTimestamp(date)).toBe(`'${date.toString()}'`);
  });

  it("renders a missing date as null", () => {
    expect(toSqlTimestamp(undefined as unknown as Date)).toBe("null");
  });
});

describe("toSqlBoolean", () => {
  it("renders true and false literals", () => {
    expect(toSqlBoolean(true)).toBe("true");
    expect(toSqlBoolean(false)).toBe("false");
  });

  it("treats a missing value as false", () => {
    expect(toSqlBoolean(undefined as unknown as boolean)).toBe("false");
  });
});
