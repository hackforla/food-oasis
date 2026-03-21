import {
  stakeholderPostRequestSchema,
  stakeholderPutRequestSchema,
} from "../app/validation-schema/stakeholder-schema";
import { requestValidationMiddleware } from "../middleware/request-validation-middlewares";
import { mockNext, mockRequest, mockResponse } from "./utils";

const validStakeholderPayload = {
  id: 4460,
  tenantId: 1,
  loginId: 108,
  name: "Test Org",
  phone: "(213) 555-1212",
  address1: "123 Test St",
  city: "Los Angeles",
  state: "CA",
  zip: "90012",
  latitude: 34.05,
  longitude: -118.24,
  selectedCategoryIds: [1],
};

describe("stakeholder request validation", () => {
  it("accepts a valid stakeholder POST payload", () => {
    const middleware = requestValidationMiddleware(
      stakeholderPostRequestSchema
    );
    const req = mockRequest({
      body: {
        ...validStakeholderPayload,
      },
    });
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

  it("rejects stakeholder POST without name", () => {
    const middleware = requestValidationMiddleware(
      stakeholderPostRequestSchema
    );
    const req = mockRequest({
      body: {
        ...validStakeholderPayload,
      },
    });
    delete req.body.name;
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  it("accepts a valid stakeholder PUT payload with extra fields", () => {
    const middleware = requestValidationMiddleware(stakeholderPutRequestSchema);
    const req = mockRequest({
      body: {
        ...validStakeholderPayload,
        createdDate: "2026-03-10T01:53:11",
        modifiedUser: "Admin User",
        tags: [],
        hours: [],
      },
    });
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

  it("rejects stakeholder PUT without name", () => {
    const middleware = requestValidationMiddleware(stakeholderPutRequestSchema);
    const req = mockRequest({
      body: {
        ...validStakeholderPayload,
      },
    });
    delete req.body.name;
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  it("rejects stakeholder PUT with string coordinates", () => {
    const middleware = requestValidationMiddleware(stakeholderPutRequestSchema);
    const req = mockRequest({
      body: {
        ...validStakeholderPayload,
        latitude: "abc",
        longitude: "def",
      },
    });
    const res = mockResponse();
    const next = mockNext();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });
});
