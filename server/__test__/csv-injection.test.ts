import { once } from "events";
import { Writable } from "stream";
import stakeholderController from "../app/controllers/stakeholder-controller";
import loadController from "../app/controllers/load-controller";
import stakeholderService from "../app/services/stakeholder-service";
import loadOpenLADataService from "../app/services/load-open-la-data-service";
import loadLARFBService from "../app/services/load-larfb-service";
import { mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/stakeholder-service");
jest.mock("../app/services/load-open-la-data-service");
jest.mock("../app/services/load-larfb-service");

const selectCsvMock = stakeholderService.selectCsv as jest.MockedFunction<
  typeof stakeholderService.selectCsv
>;
const selectOpenLAMock = loadOpenLADataService.selectAll as jest.MockedFunction<
  typeof loadOpenLADataService.selectAll
>;
const selectLARFBMock = loadLARFBService.selectAll as jest.MockedFunction<
  typeof loadLARFBService.selectAll
>;

beforeEach(() => jest.resetAllMocks());

describe("CSV formula injection protection", () => {
  it("escapes formula-like stakeholder values", async () => {
    selectCsvMock.mockResolvedValueOnce([
      {
        id: 1,
        name: '=HYPERLINK("https://example.com")',
        address1: "+SUM(1,1)",
        city: "Safe value",
      },
    ] as any);

    const chunks: Buffer[] = [];
    const res = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
    }) as any;
    res.setHeader = jest.fn();
    res.status = jest.fn(() => res);

    await stakeholderController.csv(
      mockRequest({ body: { ids: ["1"] } }),
      res,
      jest.fn()
    );
    await once(res, "finish");

    const csv = Buffer.concat(chunks).toString();
    expect(csv).toContain("'=HYPERLINK");
    expect(csv).toContain("'+SUM(1,1)");
    expect(csv).toContain("Safe value");
  });

  it.each([
    ["Open LA", selectOpenLAMock, loadController.getOpenLA],
    ["LARFB", selectLARFBMock, loadController.getLARFB],
  ])(
    "sanitizes formula-like values in the %s export",
    async (_name, selectAll, handler) => {
      selectAll.mockResolvedValueOnce([
        {
          name: '=HYPERLINK("https://example.com")',
          description: "Safe value",
        },
      ] as any);
      const req = mockRequest({ query: {}, accepts: jest.fn(() => false) });
      const res = mockResponse({ setHeader: jest.fn() });

      await handler(req, res, jest.fn());

      const csv = res.send.mock.calls[0][0] as string;
      expect(csv).not.toContain("=HYPERLINK");
      expect(csv).toContain("HYPERLINK");
      expect(csv).toContain("Safe value");
    }
  );
});
