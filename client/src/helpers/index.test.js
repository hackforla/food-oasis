import {
  formatDate,
  formatDateMMMddYYYY,
  formatDatewTimeZoneDD,
  formatDatewTimeZonehhmmss,
  formatDatewTimeZoneWeekdayShort,
  formatDatewTimeZoneMMM,
} from "helpers";

describe("Date utility functions", () => {
  const ts = 1616947200000; // March 28, 2021 12:00:00 UTC
  const timeZoneNY = "America/New_York";
  const timeZoneLA = "America/Los_Angeles";
  const timeZoneHI = "Pacific/Honolulu";

  // should pass regardless of the user's timezone since new Date() without options returns date in user's timezone
  test("formatDate", () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const expectedOutput = new Date(ts).toLocaleString("en-US", {
      timeZone: userTimeZone,
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    expect(formatDate(ts)).toEqual(expectedOutput);
    expect(formatDate(null)).toBeNull();
  });

  test("formatDateMMMddYYYY", () => {
    expect(formatDateMMMddYYYY(ts)).toEqual("Mar 28, 2021");
    expect(formatDateMMMddYYYY(null)).toBeNull();
  });

  test("formatDatewTimeZoneDD", () => {
    expect(formatDatewTimeZoneDD(ts, timeZoneNY)).toEqual("28");
    expect(formatDatewTimeZoneDD(ts, null)).toBeNull();
    expect(formatDatewTimeZoneDD(null, timeZoneNY)).toBeNull();
  });

  test("formatDatewTimeZonehhmmss", () => {
    expect(formatDatewTimeZonehhmmss(ts, timeZoneNY)).toEqual("12:00:00");
    expect(formatDatewTimeZonehhmmss(ts, timeZoneLA)).toEqual("09:00:00");
    expect(formatDatewTimeZonehhmmss(ts, timeZoneHI)).toEqual("06:00:00");
    expect(formatDatewTimeZonehhmmss(ts, null)).toBeNull();
    expect(formatDatewTimeZonehhmmss(null, timeZoneNY)).toBeNull();
  });

  test("formatDatewTimeZoneWeekdayShort", () => {
    expect(formatDatewTimeZoneWeekdayShort(ts, timeZoneNY)).toEqual("Sun");
    expect(formatDatewTimeZoneWeekdayShort(ts, null)).toBeNull();
    expect(formatDatewTimeZoneWeekdayShort(null, timeZoneNY)).toBeNull();
  });

  test("formatDatewTimeZoneMMM", () => {
    expect(formatDatewTimeZoneMMM(ts, timeZoneNY)).toEqual("Mar");
    expect(formatDatewTimeZoneMMM(ts, timeZoneLA)).toEqual("Mar");
    expect(formatDatewTimeZoneMMM(ts, timeZoneHI)).toEqual("Mar");
    expect(formatDatewTimeZoneMMM(ts, null)).toBeNull();
    expect(formatDatewTimeZoneMMM(null, timeZoneNY)).toBeNull();
  });

  // Add any additional test cases you think are necessary
});
