import announcementsController from "../app/controllers/announcements-controller";
import announcementsService from "../app/services/announcements-service";
import { mockNext, mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/announcements-service");

const service = announcementsService as jest.Mocked<
  typeof announcementsService
>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

const announcement = {
  id: 1,
  title: "Closure",
  description: "Closed for the holiday",
  is_enabled: true,
  severity: "warning",
  created_at: "2026-01-01T00:00:00Z",
} as any;

describe("announcementsController.getAll", () => {
  it("responds 200 with every announcement", async () => {
    service.getAll.mockResolvedValue([announcement]);
    const res = mockResponse();

    await announcementsController.getAll(mockRequest(), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([announcement]);
  });

  it("responds 500 with a generic error when the service fails", async () => {
    service.getAll.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await announcementsController.getAll(mockRequest(), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("announcementsController.post", () => {
  it("responds 201 with the inserted announcement", async () => {
    service.insert.mockResolvedValue(announcement);
    const res = mockResponse();

    await announcementsController.post(
      mockRequest({ body: announcement }),
      res,
      mockNext()
    );

    expect(service.insert).toHaveBeenCalledWith(announcement);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(announcement);
  });

  it("responds 500 when the insert fails", async () => {
    service.insert.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await announcementsController.post(
      mockRequest({ body: announcement }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("announcementsController.update", () => {
  it("updates by route id and responds 200 with the result", async () => {
    service.update.mockResolvedValue(announcement);
    const res = mockResponse();

    await announcementsController.update(
      mockRequest({ params: { id: "1" }, body: announcement }),
      res,
      mockNext()
    );

    expect(service.update).toHaveBeenCalledWith("1", announcement);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(announcement);
  });

  it("responds 500 when the update fails", async () => {
    service.update.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await announcementsController.update(
      mockRequest({ params: { id: "1" }, body: announcement }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("announcementsController.remove", () => {
  it("responds 204 when the service reports success", async () => {
    service.remove.mockResolvedValue({ success: true, message: "deleted" });
    const res = mockResponse();

    await announcementsController.remove(
      mockRequest({ params: { id: "1" } }),
      res,
      mockNext()
    );

    expect(service.remove).toHaveBeenCalledWith("1");
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("responds 500 when removal fails", async () => {
    service.remove.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await announcementsController.remove(
      mockRequest({ params: { id: "1" } }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
