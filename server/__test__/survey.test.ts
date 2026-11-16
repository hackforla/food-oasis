jest.mock("../middleware/jwt-session", () => ({
  __esModule: true,
  default: {
    validateUserHasRequiredRoles: jest.fn(
      () => (_req: unknown, _res: unknown, next: () => void) => next()
    ),
  },
}));

jest.mock("../app/services/survey-service", () => {
  return {
    __esModule: true,
    default: {
      getPublicByTenantId: jest.fn(),
      getAdminByTenantId: jest.fn(),
      create: jest.fn(),
      updateCurrent: jest.fn(),
    },
  };
});

import { Survey, AdminSurvey, SurveyRequest } from "../types/survey-types";
import surveyController from "../app/controllers/survey-controller";
import surveyService from "../app/services/survey-service";
import { requestValidationMiddleware } from "../middleware/request-validation-middlewares";
import {
  SurveyRequestSchema,
  SURVEY_TITLE_MAX,
  SURVEY_PROMPT_MAX,
  SURVEY_LINK_LABEL_MAX,
  SURVEY_LINKS_ITEMS_MAX,
} from "../app/validation-schema/survey-schema";
import jwtSession from "../middleware/jwt-session";
import "../app/routes/survey-router";
import { mockNext, mockRequest, mockResponse } from "./utils";

const survey: Survey = {
  id: 1,
  tenantId: 1,
  timeToPromptSeconds: 30,
  whereToPrompt: "all",
  title: "Help us improve",
  prompt: "Take a short survey?",
  links: [
    {
      display: "button",
      label: "Sure",
      url: "https://example.test",
      action: "navigate",
    },
    { display: "text", label: "No thanks", action: "optOut" },
  ],
  isEnabled: true,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

const adminSurvey: AdminSurvey = {
  ...survey,
  updatedByName: "Jane Doe",
};

const surveyRequest: SurveyRequest = {
  tenantId: 1,
  timeToPromptSeconds: 30,
  whereToPrompt: "all",
  title: "Help us improve",
  prompt: "Take a short survey?",
  links: survey.links,
  isEnabled: true,
};

const service = surveyService as jest.Mocked<typeof surveyService>;

const roleCalls = (jwtSession.validateUserHasRequiredRoles as jest.Mock).mock
  .calls;
const [adminGetRoles, postRoles, putRoles] = roleCalls.map(([roles]) => roles);

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("survey route roles", () => {
  it("has role checks on exactly the admin GET, POST and PUT", () => {
    expect(roleCalls).toHaveLength(3);
  });
  it("restricts admin-protected get to admin and coordinator", () => {
    expect([...adminGetRoles].sort()).toEqual(["admin", "coordinator"].sort());
  });
  it("restricts post to admin and coordinator", () => {
    expect([...postRoles].sort()).toEqual(["admin", "coordinator"]);
  });
  it("restricts put to admin and coordinator", () => {
    expect([...putRoles].sort()).toEqual(["admin", "coordinator"]);
  });
});

describe("SurveyRequestSchema", () => {
  const validate = (body: unknown) => {
    const next = mockNext();
    const res = mockResponse();
    requestValidationMiddleware(SurveyRequestSchema)(
      mockRequest({ body }),
      res,
      next
    );
    return next.mock.calls.length === 1;
  };
  it("accepts a full request body with all fields present", () => {
    expect(validate(surveyRequest)).toBe(true);
  });
  it.each([
    "tenantId",
    "timeToPromptSeconds",
    "whereToPrompt",
    "title",
    "prompt",
    "links",
    "isEnabled",
  ])("rejects a body missing %s", (field) => {
    const body: Record<string, unknown> = { ...surveyRequest };
    delete body[field];
    expect(validate(body)).toBe(false);
  });
  it.each([
    ["zero", 0],
    ["negative", -2],
    ["non-integer", 1.2],
    ["non-numeric", "abc"],
  ])("rejects a %s tenantId", (_label, tenantId) => {
    expect(validate({ ...surveyRequest, tenantId: tenantId })).toBe(false);
  });
  it("rejects a body with additional properties", () => {
    expect(
      validate({
        ...surveyRequest,
        test: "additional property",
      })
    ).toBe(false);
  });
  it("rejects a navigate link with no URL in the body", () => {
    expect(
      validate({
        ...surveyRequest,
        links: [
          { display: "button", label: "Sure", action: "navigate" },
          { display: "text", label: "No thanks", action: "optOut" },
        ],
      })
    ).toBe(false);
  });
  it.each([
    ["title", SURVEY_TITLE_MAX],
    ["prompt", SURVEY_PROMPT_MAX],
  ])("enforces the %s length limit", (field, max) => {
    const atMax = { ...surveyRequest, [field]: "a".repeat(max) };
    const overMax = { ...surveyRequest, [field]: "a".repeat(max + 1) };

    expect(validate(atMax)).toBe(true);
    expect(validate(overMax)).toBe(false);
  });
  it("enforces the link label length limit", () => {
    const link = surveyRequest.links[0];
    const atMax = "a".repeat(SURVEY_LINK_LABEL_MAX);
    const atMaxLink = { ...link, label: atMax };
    const overMaxLink = { ...link, label: atMax + "a" };

    expect(validate({ ...surveyRequest, links: [atMaxLink] })).toBe(true);
    expect(validate({ ...surveyRequest, links: [overMaxLink] })).toBe(false);
  });
  it("requires between 1 and the max number of links", () => {
    const withLinks = (count: number) => ({
      ...surveyRequest,
      links: Array.from({ length: count }, () => surveyRequest.links[1]),
    });

    expect(validate(withLinks(0))).toBe(false);
    expect(validate(withLinks(1))).toBe(true);
    expect(validate(withLinks(SURVEY_LINKS_ITEMS_MAX))).toBe(true);
    expect(validate(withLinks(SURVEY_LINKS_ITEMS_MAX + 1))).toBe(false);
  });
});

describe.each([
  {
    name: "getPublicByTenantId",
    handler: surveyController.getPublicByTenantId,
    serviceFn: service.getPublicByTenantId as jest.Mock,
    fixture: survey,
  },
  {
    name: "getAdminByTenantId",
    handler: surveyController.getAdminByTenantId,
    serviceFn: service.getAdminByTenantId as jest.Mock,
    fixture: adminSurvey,
  },
])("surveyController.$name", ({ handler, serviceFn, fixture }) => {
  it("returns the survey for the requested tenant", async () => {
    serviceFn.mockResolvedValue(fixture);
    const res = mockResponse();

    await handler(mockRequest({ query: { tenantId: "1" } }), res, mockNext());

    expect(serviceFn).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fixture);
  });
  it.each([
    ["missing", undefined],
    ["zero", "0"],
    ["negative", "-2"],
    ["non-integer", "1.2"],
    ["non-numeric", "abc"],
  ])(
    "returns 400 when tenantId is %s without touching the db",
    async (_label, tenantId) => {
      const res = mockResponse();
      await handler(
        mockRequest({ query: { tenantId: tenantId } }),
        res,
        mockNext()
      );
      expect(serviceFn).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    }
  );
  it("returns 204 with no body when there is no survey to show", async () => {
    serviceFn.mockResolvedValue(null);
    const res = mockResponse({ end: jest.fn() });

    await handler(mockRequest({ query: { tenantId: "1" } }), res, mockNext());
    expect(res.end).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).not.toHaveBeenCalled();
    expect(serviceFn).toHaveBeenCalledWith(1);
  });
  it("returns 500 when the service throws", async () => {
    serviceFn.mockRejectedValue(new Error("connection refused"));
    const res = mockResponse();

    await handler(mockRequest({ query: { tenantId: "1" } }), res, mockNext());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(console.error).toHaveBeenCalled();
  });
});

describe("surveyController.post", () => {
  it("returns 201 and the saved survey on success", async () => {
    service.create.mockResolvedValue(adminSurvey);
    const res = mockResponse();
    await surveyController.post(
      mockRequest({ body: surveyRequest, user: { id: "9" } }),
      res,
      mockNext()
    );
    expect(service.create).toHaveBeenCalledWith(surveyRequest, 9);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(adminSurvey);
  });
  it.each([
    ["missing", undefined],
    ["non-numeric", { id: "abc" }],
    ["zero", { id: "0" }],
  ])("saves with no updater when user is %s", async (_label, user) => {
    service.create.mockResolvedValue(adminSurvey);
    const res = mockResponse();
    await surveyController.post(
      mockRequest({ body: surveyRequest, user: user }),
      res,
      mockNext()
    );
    expect(service.create).toHaveBeenCalledWith(surveyRequest, null);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(adminSurvey);
  });
  it("returns 400 for an unknown tenant (FK violation)", async () => {
    service.create.mockRejectedValue({
      code: "23503",
      constraint: "fk_survey_tenant",
    });
    const res = mockResponse();
    await surveyController.post(
      mockRequest({ body: surveyRequest }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Unknown tenant" });
  });

  it("returns 500 when the service throws", async () => {
    service.create.mockRejectedValue(new Error("connection refused"));
    const res = mockResponse();
    await surveyController.post(
      mockRequest({ body: surveyRequest }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(console.error).toHaveBeenCalled();
  });
});

/**
 * put controller:
 * exits:
 * 404
 * 200
 * 500
 */
describe("surveyController.put", () => {
  it("returns 200 and the updated survey on success", async () => {
    service.updateCurrent.mockResolvedValue(adminSurvey);
    const res = mockResponse();
    await surveyController.put(
      mockRequest({ body: surveyRequest, user: { id: "9" } }),
      res,
      mockNext()
    );
    expect(service.updateCurrent).toHaveBeenCalledWith(surveyRequest, 9);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(adminSurvey);
  });
  it.each([
    ["missing", undefined],
    ["non-numeric", { id: "abc" }],
    ["zero", { id: "0" }],
  ])("saves with no updater when user is %s", async (_label, user) => {
    service.updateCurrent.mockResolvedValue(adminSurvey);
    const res = mockResponse();
    await surveyController.put(
      mockRequest({ body: surveyRequest, user: user }),
      res,
      mockNext()
    );
    expect(service.updateCurrent).toHaveBeenCalledWith(surveyRequest, null);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(adminSurvey);
  });
  it("returns 404 when tenant has no survey", async () => {
    service.updateCurrent.mockResolvedValue(null);
    const res = mockResponse();
    await surveyController.put(
      mockRequest({ body: surveyRequest, user: { id: "9" } }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No current survey for this tenant",
    });
  });
  it("returns 500 when service throws", async () => {
    service.updateCurrent.mockRejectedValue(new Error("connection refused"));
    const res = mockResponse();
    await surveyController.put(
      mockRequest({ body: surveyRequest, user: { id: "9" } }),
      res,
      mockNext()
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(console.error).toHaveBeenCalled();
  });
});
