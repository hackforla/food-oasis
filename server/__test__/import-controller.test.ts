import importController from "../app/controllers/import-controller";
import importService from "../app/services/import-service";
import { mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/import-service");

const parseCsvMock = importService.parseCsv as jest.MockedFunction<
  typeof importService.parseCsv
>;

describe("stakeholder CSV upload controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it("returns 400 when no file is uploaded", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await importController.uploadStakeholderCsv(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "CSV file is required." });
    expect(parseCsvMock).not.toHaveBeenCalled();
  });

  it("returns 400 when the CSV cannot be parsed", async () => {
    const file = { buffer: Buffer.from("invalid CSV") };
    const req = mockRequest({ file });
    const res = mockResponse();
    parseCsvMock.mockRejectedValueOnce(new Error("Invalid CSV"));

    await importController.uploadStakeholderCsv(req, res, jest.fn());

    expect(parseCsvMock).toHaveBeenCalledWith(file);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "CSV file could not be parsed.",
    });
  });
});
