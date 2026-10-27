import parentOrganizationController from "../app/controllers/parent-organization-controller";
import parentOrganizationService from "../app/services/parent-organization-service";
import { mockNext, mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/parent-organization-service");

const service = parentOrganizationService as jest.Mocked<
  typeof parentOrganizationService
>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("parentOrganizationController.getAllByTenantId", () => {
  it("looks organizations up by the tenant in the route", async () => {
    const orgs = [{ id: 1, name: "LA Food Bank", code: "LAFB" }] as any;
    service.selectAllById.mockResolvedValue(orgs);
    const res = mockResponse();

    await parentOrganizationController.getAllByTenantId(
      mockRequest({ params: { tenantId: "1" } }),
      res,
      mockNext()
    );

    expect(service.selectAllById).toHaveBeenCalledWith("1");
    expect(res.send).toHaveBeenCalledWith(orgs);
  });

  it("responds 500 when the service fails", async () => {
    service.selectAllById.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await parentOrganizationController.getAllByTenantId(
      mockRequest({ params: { tenantId: "1" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("parentOrganizationController.insert", () => {
  const body = { name: "LA Food Bank", code: "LAFB", tenantId: 1 };

  it("responds 201 with the new id", async () => {
    service.insert.mockResolvedValue({ id: 4 });
    const res = mockResponse();

    await parentOrganizationController.insert(
      mockRequest({ body }),
      res,
      mockNext()
    );

    expect(service.insert).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 4 });
  });

  it("responds 400 on a duplicate row", async () => {
    service.insert.mockRejectedValue(new Error("duplicate key value"));
    const res = mockResponse();

    await parentOrganizationController.insert(
      mockRequest({ body }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Cannot insert duplicate row.",
    });
  });

  it("responds 500 on other errors", async () => {
    service.insert.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await parentOrganizationController.insert(
      mockRequest({ body }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("parentOrganizationController.update", () => {
  const body = { id: 4, name: "LA Food Bank", code: "LAFB", tenantId: 1 };

  it("updates and responds with success", async () => {
    service.update.mockResolvedValue(undefined as any);
    const res = mockResponse();

    await parentOrganizationController.update(
      mockRequest({ params: { id: "4" }, body }),
      res,
      mockNext()
    );

    expect(service.update).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it.each([
    ["id", { ...body, id: undefined }],
    ["name", { ...body, name: "" }],
    ["tenantId", { ...body, tenantId: 0 }],
  ])(
    "responds 400 without calling the service when %s is missing",
    async (_field, incomplete) => {
      const res = mockResponse();

      await parentOrganizationController.update(
        mockRequest({ params: { id: "4" }, body: incomplete }),
        res,
        mockNext()
      );

      expect(service.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing required fields.",
      });
    }
  );

  it("responds 500 with a generic message when the update fails", async () => {
    service.update.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await parentOrganizationController.update(
      mockRequest({ params: { id: "4" }, body }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error." });
  });
});

describe("parentOrganizationController.remove", () => {
  it("responds 200 when exactly one row was deleted", async () => {
    service.remove.mockResolvedValue(1);
    const res = mockResponse();

    await parentOrganizationController.remove(
      mockRequest({ params: { id: "4" } }),
      res,
      mockNext()
    );

    expect(service.remove).toHaveBeenCalledWith("4");
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("responds 400 when the organization does not exist", async () => {
    service.remove.mockResolvedValue(0);
    const res = mockResponse();

    await parentOrganizationController.remove(
      mockRequest({ params: { id: "999" } }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Record not found" });
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

  it("responds 500 when removal fails", async () => {
    service.remove.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await parentOrganizationController.remove(
      mockRequest({ params: { id: "4" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
