import stakeholderController from "../app/controllers/stakeholder-controller";
import stakeholderService from "../app/services/stakeholder-service";
import { mockNext, mockRequest, mockResponse } from "./utils";
import jwt from "jsonwebtoken";
import jwtSession from "../middleware/jwt-session";

jest.mock("../app/services/stakeholder-service");

const selectByIdMock = stakeholderService.selectById as jest.MockedFunction<
  typeof stakeholderService.selectById
>;
const isStakeholderAssignedToUserMock =
  stakeholderService.isStakeholderAssignedToUser as jest.MockedFunction<
    typeof stakeholderService.isStakeholderAssignedToUser
  >;
const updateMock = stakeholderService.update as jest.MockedFunction<
  typeof stakeholderService.update
>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Stakeholder controller authorization", () => {
  it("blocks data entry users from reading unassigned stakeholders", async () => {
    const req = mockRequest({
      params: { id: "42" },
      user: { id: "7", sub: "data_entry" },
    });
    const res = mockResponse();
    const next = mockNext();
    isStakeholderAssignedToUserMock.mockResolvedValue(false);

    await stakeholderController.getById(req, res, next);

    expect(isStakeholderAssignedToUserMock).toHaveBeenCalledWith(42, 7);
    expect(selectByIdMock).not.toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  it("allows data entry users to read assigned stakeholders", async () => {
    const req = mockRequest({
      params: { id: "42" },
      user: { id: "7", sub: "data_entry" },
    });
    const res = mockResponse();
    const next = mockNext();
    const stakeholder = { id: 42, name: "Assigned stakeholder" } as any;
    isStakeholderAssignedToUserMock.mockResolvedValue(true);
    selectByIdMock.mockResolvedValue(stakeholder);

    await stakeholderController.getById(req, res, next);

    expect(isStakeholderAssignedToUserMock).toHaveBeenCalledWith(42, 7);
    expect(selectByIdMock).toHaveBeenCalledWith("42");
    expect(res.send).toHaveBeenCalledWith(stakeholder);
  });

  it("blocks data entry users from updating unassigned stakeholders", async () => {
    const req = mockRequest({
      params: { id: "42" },
      body: { id: 99, name: "Updated stakeholder" },
      user: { id: "7", sub: "data_entry" },
    });
    const res = mockResponse();
    const next = mockNext();
    isStakeholderAssignedToUserMock.mockResolvedValue(false);

    await stakeholderController.put(req, res, next);

    expect(isStakeholderAssignedToUserMock).toHaveBeenCalledWith(42, 7);
    expect(updateMock).not.toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  it("uses the route id as the source of truth for updates", async () => {
    const req = mockRequest({
      params: { id: "42" },
      body: { id: 99, name: "Updated stakeholder" },
      user: { id: "7", sub: "data_entry" },
    });
    const res = mockResponse();
    const next = mockNext();
    isStakeholderAssignedToUserMock.mockResolvedValue(true);

    await stakeholderController.put(req, res, next);

    expect(isStakeholderAssignedToUserMock).toHaveBeenCalledWith(42, 7);
    expect(updateMock).toHaveBeenCalledWith({
      id: 42,
      name: "Updated stakeholder",
    });
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("does not apply assignment checks to admins", async () => {
    const req = mockRequest({
      params: { id: "42" },
      user: { id: "1", sub: "admin,data_entry" },
    });
    const res = mockResponse();
    const next = mockNext();
    const stakeholder = { id: 42, name: "Any stakeholder" } as any;
    selectByIdMock.mockResolvedValue(stakeholder);

    await stakeholderController.getById(req, res, next);

    expect(isStakeholderAssignedToUserMock).not.toHaveBeenCalled();
    expect(selectByIdMock).toHaveBeenCalledWith("42");
    expect(res.send).toHaveBeenCalledWith(stakeholder);
  });
});

describe("DELETE /stakeholders/:id authorization", () => {
  const jwtSecret = process.env.JWT_SECRET || "mark it zero";
  const guard = jwtSession.validateUserHasRequiredRoles(["admin"]);

  const signToken = (payload: object) =>
    jwt.sign(payload, jwtSecret, { algorithm: "HS256" });

  it("rejects an unauthenticated request", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {},
      params: { id: "42" },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("rejects an authenticated non-admin caller", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {
        jwt: signToken({ email: "user@test.com", sub: "data_entry" }),
      },
      params: { id: "42" },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("allows an authenticated admin through to the handler", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: { jwt: signToken({ email: "admin@test.com", sub: "admin" }) },
      params: { id: "42" },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
