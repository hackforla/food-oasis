import awsService from "../app/services/aws-service";
import importUtils from "../app/services/import-utils";
import { STAKEHOLDER_SCHEMA } from "../app/services/import-constants";

jest.mock("../app/services/aws-service");

const getCoordsMock = awsService.getCoords as jest.MockedFunction<
  typeof awsService.getCoords
>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("formatMapAddress", () => {
  it("joins the address parts into a geocodable string", () => {
    expect(
      importUtils.formatMapAddress({
        address_1: "123 Main St",
        address_2: "Suite 4",
        city: "Los Angeles",
        state: "CA",
        zip: "90012",
      })
    ).toBe("123 Main St Suite 4 Los Angeles, CA 90012");
  });

  it("tolerates missing parts", () => {
    expect(
      importUtils.formatMapAddress({ address_1: "123 Main St", city: "LA" })
    ).toBe("123 Main St  LA,  ");
  });
});

describe("setDefaultValues", () => {
  it("fills in schema defaults for missing or empty fields", () => {
    const row = importUtils.setDefaultValues({ name: "Pantry", languages: "" });

    expect(row.name).toBe("Pantry");
    expect(row.languages).toBe("English");
    expect(row.inactive).toBe("f");
    expect(row.verificationStatusId).toBe("1");
    expect(row.selectedCategoryIds).toBe("1");
    expect(row.createdLoginId).toBe("Auto");
    expect(row.address1).toBe("");
  });

  it("keeps values that are already present", () => {
    const row = importUtils.setDefaultValues({
      languages: "Spanish",
      inactive: "t",
      verificationStatusId: "4",
    });

    expect(row.languages).toBe("Spanish");
    expect(row.inactive).toBe("t");
    expect(row.verificationStatusId).toBe("4");
  });

  it("sets a value for every schema column", () => {
    const row = importUtils.setDefaultValues({});

    for (const column of STAKEHOLDER_SCHEMA) {
      expect(row).toHaveProperty(column.name, column.default_value);
    }
  });

  it("mutates and returns the same row object", () => {
    const input = {};
    expect(importUtils.setDefaultValues(input)).toBe(input);
  });
});

describe("getDefaultStakeholderValues", () => {
  it("returns only the columns flagged as hidden", () => {
    const schema = [
      { name: "a", show: false },
      { name: "b", show: true },
      { name: "c" },
      { name: "d", show: false },
    ];

    expect(importUtils.getDefaultStakeholderValues(schema)).toEqual([
      { name: "a", show: false },
      { name: "d", show: false },
    ]);
  });
});

describe("parseStakeholderHours", () => {
  it("returns an empty list when no hours are present", () => {
    expect(importUtils.parseStakeholderHours({})).toEqual([]);
    expect(importUtils.parseStakeholderHours({ hours: "" })).toEqual([]);
  });

  describe("legacy single-column format", () => {
    it("parses week-of-month entries from the hours column", () => {
      const result = importUtils.parseStakeholderHours({
        hours: "(1,Mon,10:00,13:00),(2,Wed,10:00,15:00)",
      });

      expect(result).toEqual([
        { weekOfMonth: 1, dayOfWeek: "Mon", open: "10:00", close: "13:00" },
        { weekOfMonth: 2, dayOfWeek: "Wed", open: "10:00", close: "15:00" },
      ]);
    });

    it("maps numeric day codes to day names", () => {
      const result = importUtils.parseStakeholderHours({
        hours: "(1,2,10:00,13:00),(-1,7,08:00,12:00)",
      });

      expect(result).toEqual([
        { weekOfMonth: 1, dayOfWeek: "Mon", open: "10:00", close: "13:00" },
        { weekOfMonth: -1, dayOfWeek: "Sat", open: "08:00", close: "12:00" },
      ]);
    });

    it("ignores whitespace and quotes", () => {
      const result = importUtils.parseStakeholderHours({
        hours: "( 3, 'Fri', 09:00, 17:00 )",
      });

      expect(result).toEqual([
        { weekOfMonth: 3, dayOfWeek: "Fri", open: "09:00", close: "17:00" },
      ]);
    });

    it("skips entries that do not have four fields", () => {
      const result = importUtils.parseStakeholderHours({
        hours: "(1,Mon,10:00),(2,Tue,10:00,13:00)",
      });

      expect(result).toEqual([
        { weekOfMonth: 2, dayOfWeek: "Tue", open: "10:00", close: "13:00" },
      ]);
    });

    it("takes precedence over the per-week columns", () => {
      const result = importUtils.parseStakeholderHours({
        hours: "(1,Mon,10:00,13:00)",
        hoursWeek2: "(Tue,10:00,13:00)",
      });

      expect(result).toEqual([
        { weekOfMonth: 1, dayOfWeek: "Mon", open: "10:00", close: "13:00" },
      ]);
    });
  });

  describe("per-week column format", () => {
    it("collects entries from each hoursWeek column", () => {
      const result = importUtils.parseStakeholderHours({
        hoursWeek1: "(Mon,10:00,13:00),(Tue,09:00,12:00)",
        hoursWeek3: "(Wed,08:00,11:00)",
        hoursWeekLast: "(5,08:00,10:00)",
      });

      expect(result).toEqual([
        { weekOfMonth: 1, dayOfWeek: "Mon", open: "10:00", close: "13:00" },
        { weekOfMonth: 1, dayOfWeek: "Tue", open: "09:00", close: "12:00" },
        { weekOfMonth: 3, dayOfWeek: "Wed", open: "08:00", close: "11:00" },
        { weekOfMonth: -1, dayOfWeek: "Thu", open: "08:00", close: "10:00" },
      ]);
    });

    it("skips entries that do not have three fields", () => {
      const result = importUtils.parseStakeholderHours({
        hoursWeek1: "(Mon,10:00),(Tue,09:00,12:00,extra),(Wed,08:00,11:00)",
      });

      expect(result).toEqual([
        { weekOfMonth: 1, dayOfWeek: "Wed", open: "08:00", close: "11:00" },
      ]);
    });
  });
});

describe("getLatLong", () => {
  it("uses coordinates from the row when present, converted to numbers", async () => {
    const result = await importUtils.getLatLong({
      latitude: "34.05",
      longitude: "-118.24",
    });

    expect(result).toEqual({ latitude: 34.05, longitude: -118.24 });
    expect(getCoordsMock).not.toHaveBeenCalled();
  });

  it("geocodes the formatted address when coordinates are missing", async () => {
    getCoordsMock.mockResolvedValue({
      Results: [{ Place: { Geometry: { Point: [-118.24, 34.05] } } }],
    } as any);

    const result = await importUtils.getLatLong({
      address_1: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90012",
    });

    expect(getCoordsMock).toHaveBeenCalledWith(
      "123 Main St  Los Angeles, CA 90012"
    );
    expect(result).toEqual({ latitude: 34.05, longitude: -118.24 });
  });

  it("geocodes when only one coordinate is present", async () => {
    getCoordsMock.mockResolvedValue({
      Results: [{ Place: { Geometry: { Point: [-1, 2] } } }],
    } as any);

    const result = await importUtils.getLatLong({ latitude: "34.05" });

    expect(getCoordsMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ latitude: 2, longitude: -1 });
  });

  it("falls back to 0,0 when geocoding fails", async () => {
    getCoordsMock.mockRejectedValue(new Error("network"));

    const result = await importUtils.getLatLong({ address_1: "nowhere" });

    expect(result).toEqual({ latitude: 0, longitude: 0 });
  });

  it("falls back to 0,0 when geocoding returns no results", async () => {
    getCoordsMock.mockResolvedValue({ Results: [] } as any);

    const result = await importUtils.getLatLong({ address_1: "nowhere" });

    expect(result).toEqual({ latitude: 0, longitude: 0 });
  });
});
