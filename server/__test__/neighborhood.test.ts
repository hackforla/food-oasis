import db from "../app/services/db";
import neighborhoodService from "../app/services/neighborhood-service";

// Ported from the old Mocha test (server/test/test_neighborhood_service.ts),
// which needed a live PostGIS database. The DB is mocked here, like the rest
// of the Jest suite, so these check the queries and result handling instead.
jest.mock("../app/services/db", () => ({
  __esModule: true,
  default: {
    manyOrNone: jest.fn(),
  },
}));

const manyOrNoneMock = db.manyOrNone as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("neighborhoodService.selectAll", () => {
  it("returns the tenant's neighborhoods with camelCased keys", async () => {
    manyOrNoneMock.mockResolvedValue([
      { id: 1, name: "ARLETA NC", empower_link: "https://a.test", zoom: 13 },
      { id: 2, name: "BOYLE HEIGHTS NC", empower_link: null, zoom: 14 },
    ]);

    const result = await neighborhoodService.selectAll(1);

    expect(manyOrNoneMock).toHaveBeenCalledWith(
      expect.stringContaining("where tenant_id = $<tenantId>"),
      { tenantId: 1 }
    );
    expect(result).toEqual([
      { id: 1, name: "ARLETA NC", empowerLink: "https://a.test", zoom: 13 },
      { id: 2, name: "BOYLE HEIGHTS NC", empowerLink: null, zoom: 14 },
    ]);
  });
});

describe("neighborhoodService.findNeighborhood", () => {
  it("passes lon/lat into the ST_Contains query and returns the first row", async () => {
    manyOrNoneMock.mockResolvedValue([
      { id: 42, name: "LINCOLN HEIGHTS NC" },
      { id: 43, name: "MONTECITO HEIGHTS NC" },
    ]);

    const result = await neighborhoodService.findNeighborhood(
      34.0711511,
      -118.2095018
    );

    expect(manyOrNoneMock).toHaveBeenCalledWith(
      expect.stringContaining("POINT($<longitude> $<latitude>)"),
      { latitude: 34.0711511, longitude: -118.2095018 }
    );
    expect(result).toEqual({ id: 42, name: "LINCOLN HEIGHTS NC" });
  });

  it("returns null when the query finds no neighborhood", async () => {
    manyOrNoneMock.mockResolvedValue([]);

    const result = await neighborhoodService.findNeighborhood(
      41.8840586,
      -87.6323658
    );

    expect(result).toBeNull();
  });
});
