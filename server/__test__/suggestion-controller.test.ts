import suggestionController from "../app/controllers/suggestion-controller";
import suggestionService from "../app/services/suggestion-service";
import { mockNext, mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/suggestion-service");

const service = suggestionService as jest.Mocked<typeof suggestionService>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("suggestionController.getAll", () => {
  it("passes the query through to the service and sends the result", async () => {
    const query = { statusIds: ["1", "2"], tenantId: "1" };
    const suggestions = [{ id: 1, name: "Pantry" }] as any;
    service.selectAll.mockResolvedValue(suggestions);
    const req = mockRequest({ query });
    const res = mockResponse();

    await suggestionController.getAll(req, res, mockNext());

    expect(service.selectAll).toHaveBeenCalledWith(query);
    expect(res.send).toHaveBeenCalledWith(suggestions);
  });

  it("responds 500 when the service fails", async () => {
    service.selectAll.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await suggestionController.getAll(
      mockRequest({ query: {} }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("suggestionController.getById", () => {
  it("sends the matching suggestion", async () => {
    const suggestion = { id: 5, name: "Pantry" } as any;
    service.selectById.mockResolvedValue(suggestion);
    const res = mockResponse();

    await suggestionController.getById(
      mockRequest({ params: { id: "5" } }),
      res,
      mockNext()
    );

    expect(service.selectById).toHaveBeenCalledWith("5");
    expect(res.send).toHaveBeenCalledWith(suggestion);
  });

  it("responds 404 when pg-promise reports no rows", async () => {
    service.selectById.mockRejectedValue(
      Object.assign(new Error("No data returned"), { code: 0 })
    );
    const res = mockResponse();

    await suggestionController.getById(
      mockRequest({ params: { id: "999" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("responds 500 for other errors", async () => {
    service.selectById.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await suggestionController.getById(
      mockRequest({ params: { id: "5" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("suggestionController.getByStakeholderId", () => {
  it("sends suggestions for the stakeholder", async () => {
    const suggestions = [{ id: 1 }, { id: 2 }] as any;
    service.selectByStakeholderId.mockResolvedValue(suggestions);
    const res = mockResponse();

    await suggestionController.getByStakeholderId(
      mockRequest({ params: { id: "4460" } }),
      res,
      mockNext()
    );

    expect(service.selectByStakeholderId).toHaveBeenCalledWith("4460");
    expect(res.send).toHaveBeenCalledWith(suggestions);
  });

  it("responds 404 when no rows are found", async () => {
    service.selectByStakeholderId.mockRejectedValue(
      Object.assign(new Error("No data returned"), { code: 0 })
    );
    const res = mockResponse();

    await suggestionController.getByStakeholderId(
      mockRequest({ params: { id: "4460" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });
});

describe("suggestionController.post", () => {
  const body = { name: "New Pantry", tenantId: 1 } as any;

  it("inserts the body and responds 201 with the new id", async () => {
    service.insert.mockResolvedValue({ id: 77 });
    const res = mockResponse();

    await suggestionController.post(mockRequest({ body }), res, mockNext());

    expect(service.insert).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 77 });
  });

  it("responds 400 on a duplicate row", async () => {
    service.insert.mockRejectedValue(
      new Error("duplicate key value violates unique constraint")
    );
    const res = mockResponse();

    await suggestionController.post(mockRequest({ body }), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Cannot insert duplicate row.",
    });
  });

  it("responds 500 on other errors", async () => {
    service.insert.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await suggestionController.post(mockRequest({ body }), res, mockNext());

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("suggestionController.put", () => {
  it("updates using the route id and responds 200", async () => {
    service.update.mockResolvedValue(undefined as any);
    const body = { id: 5, adminNotes: "done" } as any;
    const res = mockResponse();

    await suggestionController.put(
      mockRequest({ params: { id: "5" }, body }),
      res,
      mockNext()
    );

    expect(service.update).toHaveBeenCalledWith("5", body);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("sets a 500 status when the update fails", async () => {
    service.update.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await suggestionController.put(
      mockRequest({ params: { id: "5" }, body: {} }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.sendStatus).not.toHaveBeenCalledWith(200);
  });
});

describe("suggestionController.remove", () => {
  it("removes by route id and responds 200", async () => {
    service.remove.mockResolvedValue(undefined as any);
    const res = mockResponse();

    await suggestionController.remove(
      mockRequest({ params: { id: "5" } }),
      res,
      mockNext()
    );

    expect(service.remove).toHaveBeenCalledWith("5");
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("responds 500 when removal fails", async () => {
    service.remove.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await suggestionController.remove(
      mockRequest({ params: { id: "5" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
