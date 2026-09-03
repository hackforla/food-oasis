import categoryController from "../app/controllers/category-controller";
import categoryService from "../app/services/category-service";
import { mockNext, mockRequest, mockResponse } from "./utils";

jest.mock("../app/services/category-service");

const service = categoryService as jest.Mocked<typeof categoryService>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("categoryController.getAll", () => {
  it("sends every category", async () => {
    const categories = [{ id: 1, name: "Food Pantry" }] as any;
    service.selectAll.mockResolvedValue(categories);
    const res = mockResponse();

    await categoryController.getAll(mockRequest(), res, mockNext());

    expect(res.send).toHaveBeenCalledWith(categories);
  });

  it("responds 500 when the service fails", async () => {
    service.selectAll.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await categoryController.getAll(mockRequest(), res, mockNext());

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("categoryController.getById", () => {
  it("sends the matching category", async () => {
    const category = { id: 9, name: "Meal Program" } as any;
    service.selectById.mockResolvedValue(category);
    const res = mockResponse();

    await categoryController.getById(
      mockRequest({ params: { id: "9" } }),
      res,
      mockNext()
    );

    expect(service.selectById).toHaveBeenCalledWith("9");
    expect(res.send).toHaveBeenCalledWith(category);
  });

  it("responds 404 when no row is found", async () => {
    service.selectById.mockRejectedValue(
      Object.assign(new Error("No data returned"), { code: 0 })
    );
    const res = mockResponse();

    await categoryController.getById(
      mockRequest({ params: { id: "999" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("responds 500 for other errors", async () => {
    service.selectById.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await categoryController.getById(
      mockRequest({ params: { id: "9" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("categoryController.post", () => {
  const body = { name: "Soup Kitchen" } as any;

  it("responds 201 with the inserted id", async () => {
    service.insert.mockResolvedValue({ id: "12" } as any);
    const res = mockResponse();

    await categoryController.post(mockRequest({ body }), res, mockNext());

    expect(service.insert).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "12" });
  });

  it("responds 400 on a duplicate row", async () => {
    service.insert.mockRejectedValue(new Error("duplicate key value"));
    const res = mockResponse();

    await categoryController.post(mockRequest({ body }), res, mockNext());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Cannot insert duplicate row.",
    });
  });

  it("responds 500 on other errors", async () => {
    service.insert.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await categoryController.post(mockRequest({ body }), res, mockNext());

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe("categoryController.put", () => {
  it("updates using the body and route id", async () => {
    service.update.mockResolvedValue(undefined as any);
    const body = { name: "Renamed" } as any;
    const res = mockResponse();

    await categoryController.put(
      mockRequest({ params: { id: "9" }, body }),
      res,
      mockNext()
    );

    expect(service.update).toHaveBeenCalledWith(body, "9");
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("sets a 500 status when the update fails", async () => {
    service.update.mockRejectedValue(new Error("db down"));
    const res = mockResponse();

    await categoryController.put(
      mockRequest({ params: { id: "9" }, body: {} }),
      res,
      mockNext()
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("categoryController.remove", () => {
  it("responds 204 when exactly one row was deleted", async () => {
    service.remove.mockResolvedValue(1);
    const res = mockResponse();

    await categoryController.remove(
      mockRequest({ params: { id: "9" } }),
      res,
      mockNext()
    );

    expect(service.remove).toHaveBeenCalledWith("9");
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("responds 400 when nothing was deleted", async () => {
    service.remove.mockResolvedValue(0);
    const res = mockResponse();

    await categoryController.remove(
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

    await categoryController.remove(
      mockRequest({ params: { id: "9" } }),
      res,
      mockNext()
    );

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
