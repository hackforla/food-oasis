import * as tagController from "../app/controllers/tag-controller";
import * as tagService from "../app/services/tag-service";
import { mockNext, mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/tag-service");

const service = tagService as jest.Mocked<typeof tagService>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("tagController.getAllByTenantId", () => {
  it("looks tags up by the tenant in the route", async () => {
    const tags = [{ id: 1, name: "Halal" }] as any;
    service.selectAllById.mockResolvedValue(tags);
    const res = mockResponse();

    await tagController.getAllByTenantId(
      mockRequest({ params: { tenantId: "2" } }),
      res,
      mockNext()
    );

    expect(service.selectAllById).toHaveBeenCalledWith("2");
    expect(res.send).toHaveBeenCalledWith(tags);
  });

  it("responds 500 when the service fails", async () => {
    service.selectAllById.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await tagController.getAllByTenantId(
      mockRequest({ params: { tenantId: "2" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("tagController.post", () => {
  const body = { name: "Halal", tenantId: 1 };

  it("responds 201 with the new id", async () => {
    service.insert.mockResolvedValue({ id: 3 });
    const res = mockResponse();

    await tagController.post(mockRequest({ body }), res, mockNext());

    expect(service.insert).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 3 });
  });

  it("responds 400 on a duplicate row", async () => {
    service.insert.mockRejectedValue(new Error("duplicate key value"));
    const res = mockResponse();

    await tagController.post(mockRequest({ body }), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Cannot insert duplicate row.",
    });
  });

  it("responds 500 on other errors", async () => {
    service.insert.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await tagController.post(mockRequest({ body }), res, mockNext());

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("tagController.put", () => {
  it("updates using the body and the tagId route param", async () => {
    service.update.mockResolvedValue(undefined as any);
    const body = { name: "Kosher" } as any;
    const res = mockResponse();

    await tagController.put(
      mockRequest({ params: { tagId: "3" }, body }),
      res,
      mockNext()
    );

    expect(service.update).toHaveBeenCalledWith(body, "3");
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("sets a 500 status when the update fails", async () => {
    service.update.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await tagController.put(
      mockRequest({ params: { tagId: "3" }, body: {} }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("tagController.remove", () => {
  it("responds 204 when exactly one row was deleted", async () => {
    service.remove.mockResolvedValue(1);
    const res = mockResponse();

    await tagController.remove(
      mockRequest({ params: { tagId: "3" } }),
      res,
      mockNext()
    );

    expect(service.remove).toHaveBeenCalledWith("3");
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("responds 400 when the tag does not exist", async () => {
    service.remove.mockResolvedValue(0);
    const res = mockResponse();

    await tagController.remove(
      mockRequest({ params: { tagId: "999" } }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Record not found" });
  });

  it("responds 500 when removal fails", async () => {
    service.remove.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await tagController.remove(
      mockRequest({ params: { tagId: "3" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
