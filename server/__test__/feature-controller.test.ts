import featureController from "../app/controllers/feature-controller";
import featureService from "../app/services/feature-service";
import { mockNext, mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/feature-service");

const service = featureService as jest.Mocked<typeof featureService>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

const feature = { id: 2, name: "reports", is_enabled: true };

describe("featureController.getAll", () => {
  it("responds 200 with every feature", async () => {
    service.getAll.mockResolvedValue([feature]);
    const res = mockResponse();

    await featureController.getAll(mockRequest(), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([feature]);
  });

  it("responds 500 when the service fails", async () => {
    service.getAll.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await featureController.getAll(mockRequest(), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("featureController.post", () => {
  it("responds 201 with the inserted feature", async () => {
    service.insert.mockResolvedValue(feature);
    const res = mockResponse();

    await featureController.post(
      mockRequest({ body: feature }),
      res,
      mockNext()
    );

    expect(service.insert).toHaveBeenCalledWith(feature);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(feature);
  });

  it("responds 500 when the insert fails", async () => {
    service.insert.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await featureController.post(
      mockRequest({ body: feature }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("featureController.update", () => {
  it("coerces the route id to a number and passes the enabled flag", async () => {
    service.update.mockResolvedValue({ ...feature, is_enabled: false });
    const res = mockResponse();

    await featureController.update(
      mockRequest({ params: { id: "2" }, body: { is_enabled: false } }),
      res,
      mockNext()
    );

    expect(service.update).toHaveBeenCalledWith(2, false);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ...feature, is_enabled: false });
  });

  it("responds 500 when the update fails", async () => {
    service.update.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await featureController.update(
      mockRequest({ params: { id: "2" }, body: { is_enabled: true } }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("featureController.remove", () => {
  it("responds 204 when the service reports success", async () => {
    service.remove.mockResolvedValue({ success: true, message: "deleted" });
    const res = mockResponse();

    await featureController.remove(
      mockRequest({ params: { id: "2" } }),
      res,
      mockNext()
    );

    expect(service.remove).toHaveBeenCalledWith("2");
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("responds 500 when removal fails", async () => {
    service.remove.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await featureController.remove(
      mockRequest({ params: { id: "2" } }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
