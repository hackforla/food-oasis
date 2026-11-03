jest.mock("../middleware/jwt-session", () => ({
  __esModule: true,
  default: {
    validateUserHasRequiredRoles: jest.fn(
      () => (_req: unknown, _res: unknown, next: () => void) => next()
    ),
  },
}));

jest.mock("../app/services/email-template-service", () => {
  const actual = jest.requireActual("../app/services/email-template-service");
  return {
    __esModule: true,
    default: {
      isKnownKey: actual.default.isKnownKey,
      getByKey: jest.fn(),
      upsert: jest.fn(),
    },
  };
});

import emailTemplateController from "../app/controllers/email-template-controller";
import emailTemplateService from "../app/services/email-template-service";
import { requestValidationMiddleware } from "../middleware/request-validation-middlewares";
import { EmailTemplatePostRequestSchema } from "../app/validation-schema/email-template-schema";
import jwtSession from "../middleware/jwt-session";
import "../app/routes/email-template-router";
import { mockNext, mockRequest, mockResponse } from "./utils";

const service = emailTemplateService as jest.Mocked<
  typeof emailTemplateService
>;

// The router registers its role checks at import time, in declaration order:
// GET first, then POST. Capture them before beforeEach clears the mock.
const [[getRoles], [postRoles]] = (
  jwtSession.validateUserHasRequiredRoles as jest.Mock
).mock.calls as string[][][];

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("email-template route roles", () => {
  it("lets data entry, coordinator and admin read", () => {
    expect([...getRoles].sort()).toEqual(
      ["admin", "coordinator", "data_entry"].sort()
    );
  });

  it("restricts writes to admin and coordinator", () => {
    expect([...postRoles].sort()).toEqual(["admin", "coordinator"]);
    expect(postRoles).not.toContain("data_entry");
    expect(postRoles).not.toContain("global_admin");
  });
});

describe("EmailTemplatePostRequestSchema", () => {
  const validate = (body: unknown) => {
    const next = mockNext();
    const res = mockResponse();
    requestValidationMiddleware(EmailTemplatePostRequestSchema)(
      mockRequest({ body }),
      res,
      next
    );
    return next.mock.calls.length === 1;
  };

  it("accepts subject only, intro only, or both", () => {
    expect(validate({ tenantId: 1, subject: "s" })).toBe(true);
    expect(validate({ tenantId: 1, intro: "i" })).toBe(true);
    expect(validate({ tenantId: 1, subject: "s", intro: "i" })).toBe(true);
  });

  it("rejects missing tenantId, neither field, and extra properties", () => {
    expect(validate({ subject: "s" })).toBe(false);
    expect(validate({ tenantId: 1 })).toBe(false);
    expect(validate({ tenantId: 1, subject: "s", key: "x" })).toBe(false);
  });

  it("rejects empty, non-string and over-long values", () => {
    expect(validate({ tenantId: 1, subject: "" })).toBe(false);
    expect(validate({ tenantId: 1, intro: 5 })).toBe(false);
    expect(validate({ tenantId: 1, subject: "a".repeat(201) })).toBe(false);
    expect(validate({ tenantId: 1, intro: "a".repeat(5001) })).toBe(false);
    expect(validate({ tenantId: "1", subject: "s" })).toBe(false);
  });

  it("rejects whitespace-only subject and intro", () => {
    expect(validate({ tenantId: 1, subject: "   " })).toBe(false);
    expect(validate({ tenantId: 1, intro: "   " })).toBe(false);
    expect(validate({ tenantId: 1, intro: " \n\t " })).toBe(false);
    expect(validate({ tenantId: 1, intro: "  ok  " })).toBe(true);
  });
});

describe("emailTemplateController.getByKey", () => {
  it("returns 404 for an unknown key without touching the db", async () => {
    const res = mockResponse();
    await emailTemplateController.getByKey(
      mockRequest({ params: { key: "nope" }, query: { tenantId: "1" } }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(service.getByKey).not.toHaveBeenCalled();
  });

  it("returns 400 when tenantId is missing or invalid", async () => {
    const res = mockResponse();
    await emailTemplateController.getByKey(
      mockRequest({ params: { key: "verification" }, query: {} }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns the template for the requested tenant", async () => {
    service.getByKey.mockResolvedValue({ subject: "s", intro: "i" });
    const res = mockResponse();
    await emailTemplateController.getByKey(
      mockRequest({
        params: { key: "verification" },
        query: { tenantId: "3" },
      }),
      res,
      mockNext()
    );
    expect(service.getByKey).toHaveBeenCalledWith("verification", 3);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ subject: "s", intro: "i" });
  });
});

describe("emailTemplateController.post", () => {
  it("returns 404 for an unknown key", async () => {
    const res = mockResponse();
    await emailTemplateController.post(
      mockRequest({
        params: { key: "nope" },
        body: { tenantId: 1, intro: "i" },
      }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(service.upsert).not.toHaveBeenCalled();
  });

  it("upserts for the tenant with the caller as updater", async () => {
    service.upsert.mockResolvedValue({ subject: "s", intro: "i" });
    const res = mockResponse();
    await emailTemplateController.post(
      mockRequest({
        params: { key: "verification" },
        body: { tenantId: 2, subject: "s" },
        user: { id: "9" },
      }),
      res,
      mockNext()
    );
    expect(service.upsert).toHaveBeenCalledWith(
      "verification",
      2,
      { subject: "s", intro: undefined },
      9
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("returns 500, not 400, for other foreign key violations", async () => {
    service.upsert.mockRejectedValue({
      code: "23503",
      constraint: "fk_email_template_updated_by",
    });
    const res = mockResponse();
    await emailTemplateController.post(
      mockRequest({
        params: { key: "verification" },
        body: { tenantId: 1, subject: "s" },
      }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("returns 400 for an unknown tenant (FK violation)", async () => {
    service.upsert.mockRejectedValue({
      code: "23503",
      constraint: "fk_email_template_tenant",
    });
    const res = mockResponse();
    await emailTemplateController.post(
      mockRequest({
        params: { key: "verification" },
        body: { tenantId: 999, subject: "s" },
      }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
