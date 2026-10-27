import { requestValidationMiddleware } from "../middleware/request-validation-middlewares";
import {
  suggestionPostRequestSchema,
  suggestionPutRequestSchema,
} from "../app/validation-schema/suggestion-schema";
import {
  tagPostRequestSchema,
  tagPutRequestSchema,
} from "../app/validation-schema/tag-schema";
import {
  ParentOrganizationPostRequestSchema,
  ParentOrganizationPutRequestSchema,
} from "../app/validation-schema/parent-organization-schema";
import { AnnouncementsPostRequestSchema } from "../app/validation-schema/announcements-schema";
import { FeaturePostRequestSchema } from "../app/validation-schema/feature-schema";
import { tenantRequestSchema } from "../app/validation-schema/tenant-schema";
import { FeatureToLoginPostRequestSchema } from "../app/validation-schema/feature-to-login-schema";
import { mockNext, mockRequest, mockResponse } from "./utils";

// Runs a body through the validation middleware and reports whether it was
// passed on to the next handler (true) or rejected with a 400 (false).
function validate(schema: object, body: unknown): boolean {
  const middleware = requestValidationMiddleware(schema);
  const req = mockRequest({ body });
  const res = mockResponse();
  const next = mockNext();

  middleware(req, res, next);

  if (next.mock.calls.length === 1) {
    expect(res.sendStatus).not.toHaveBeenCalled();
    return true;
  }
  expect(res.sendStatus).toHaveBeenCalledWith(400);
  return false;
}

describe("requestValidationMiddleware", () => {
  const schema = {
    type: "object",
    required: ["name"],
    properties: { name: { type: "string" } },
  };

  it("calls next exactly once for a valid body", () => {
    expect(validate(schema, { name: "ok" })).toBe(true);
  });

  it("rejects an invalid body with 400 and does not call next", () => {
    expect(validate(schema, { name: 42 })).toBe(false);
  });

  it("rejects a missing body", () => {
    expect(validate(schema, undefined)).toBe(false);
  });
});

describe("suggestion POST schema", () => {
  const valid = {
    name: "New Pantry",
    address1: "1 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    phone: "(213) 555-1212",
    email: "pantry@example.com",
    notes: "Open late",
    tipsterName: "Pat",
    tipsterPhone: "",
    tipsterEmail: "",
    hours: "Mon 9-5",
    category: "Food Pantry",
    tenantId: 1,
    formType: "suggestion",
  };

  it("accepts a complete suggestion", () => {
    expect(validate(suggestionPostRequestSchema, valid)).toBe(true);
  });

  it("accepts the minimal required fields", () => {
    expect(
      validate(suggestionPostRequestSchema, { name: "Pantry", tenantId: 2 })
    ).toBe(true);
  });

  it("allows extra properties from the client form", () => {
    expect(
      validate(suggestionPostRequestSchema, { ...valid, somethingElse: true })
    ).toBe(true);
  });

  it("requires a tenantId", () => {
    const { tenantId: _tenantId, ...body } = valid;
    expect(validate(suggestionPostRequestSchema, body)).toBe(false);
  });

  it("rejects an empty name", () => {
    expect(validate(suggestionPostRequestSchema, { ...valid, name: "" })).toBe(
      false
    );
  });

  it("rejects a tenantId below 1", () => {
    expect(
      validate(suggestionPostRequestSchema, { ...valid, tenantId: 0 })
    ).toBe(false);
  });

  it("rejects a non-integer tenantId", () => {
    expect(
      validate(suggestionPostRequestSchema, { ...valid, tenantId: "1" })
    ).toBe(false);
  });

  it("accepts an empty email but rejects a malformed one", () => {
    expect(validate(suggestionPostRequestSchema, { ...valid, email: "" })).toBe(
      true
    );
    expect(
      validate(suggestionPostRequestSchema, { ...valid, email: "not-an-email" })
    ).toBe(false);
    expect(
      validate(suggestionPostRequestSchema, {
        ...valid,
        tipsterEmail: "not-an-email",
      })
    ).toBe(false);
  });

  it("only accepts known form types", () => {
    expect(
      validate(suggestionPostRequestSchema, {
        ...valid,
        formType: "correction",
      })
    ).toBe(true);
    expect(
      validate(suggestionPostRequestSchema, { ...valid, formType: "other" })
    ).toBe(false);
  });
});

describe("suggestion PUT schema", () => {
  const valid = {
    id: 12,
    stakeholderId: 4460,
    adminNotes: "Reviewed",
    suggestionStatusId: 2,
    name: "Pantry",
    address1: "1 Main St",
    address2: "",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    phone: "",
    email: "",
    notes: "",
    tipsterName: "",
    tipsterPhone: "",
    tipsterEmail: "",
    hours: "",
    category: "",
    tenantId: 1,
    formType: "suggestion",
    createdDate: "2026-01-01T00:00:00Z",
    closedDate: null,
  };

  it("accepts a full suggestion update", () => {
    expect(validate(suggestionPutRequestSchema, valid)).toBe(true);
  });

  it("only requires an id", () => {
    expect(validate(suggestionPutRequestSchema, { id: 12 })).toBe(true);
  });

  it("rejects unknown properties", () => {
    expect(
      validate(suggestionPutRequestSchema, { ...valid, unknownField: "x" })
    ).toBe(false);
  });

  it("enforces string length limits", () => {
    expect(
      validate(suggestionPutRequestSchema, { ...valid, city: "a".repeat(21) })
    ).toBe(false);
    expect(
      validate(suggestionPutRequestSchema, { ...valid, name: "a".repeat(101) })
    ).toBe(false);
  });

  it("rejects a stakeholderId below 1", () => {
    expect(
      validate(suggestionPutRequestSchema, { ...valid, stakeholderId: 0 })
    ).toBe(false);
  });
});

describe("tag schemas", () => {
  it("POST accepts a name and tenantId", () => {
    expect(validate(tagPostRequestSchema, { name: "Halal", tenantId: 1 })).toBe(
      true
    );
  });

  it("POST rejects an empty name, a missing tenantId, and extra fields", () => {
    expect(validate(tagPostRequestSchema, { name: "", tenantId: 1 })).toBe(
      false
    );
    expect(validate(tagPostRequestSchema, { name: "Halal" })).toBe(false);
    expect(validate(tagPostRequestSchema, { name: "Halal", tenantId: 0 })).toBe(
      false
    );
    expect(
      validate(tagPostRequestSchema, { name: "Halal", tenantId: 1, id: 5 })
    ).toBe(false);
  });

  it("PUT requires an id and a name", () => {
    expect(
      validate(tagPutRequestSchema, { id: 5, name: "Halal", tenantId: 1 })
    ).toBe(true);
    expect(validate(tagPutRequestSchema, { id: 5, name: "Halal" })).toBe(true);
    expect(validate(tagPutRequestSchema, { name: "Halal" })).toBe(false);
    expect(validate(tagPutRequestSchema, { id: 5, name: "" })).toBe(false);
  });
});

describe("parent organization schemas", () => {
  it("POST requires a non-empty name and code", () => {
    expect(
      validate(ParentOrganizationPostRequestSchema, {
        name: "LA Food Bank",
        code: "LAFB",
        tenantId: 1,
      })
    ).toBe(true);
    expect(
      validate(ParentOrganizationPostRequestSchema, { name: "LA Food Bank" })
    ).toBe(false);
    expect(
      validate(ParentOrganizationPostRequestSchema, { name: "", code: "LAFB" })
    ).toBe(false);
  });

  it("POST rejects unknown fields", () => {
    expect(
      validate(ParentOrganizationPostRequestSchema, {
        name: "LA Food Bank",
        code: "LAFB",
        website: "https://example.com",
      })
    ).toBe(false);
  });

  it("PUT additionally requires an id", () => {
    expect(
      validate(ParentOrganizationPutRequestSchema, {
        id: 3,
        name: "LA Food Bank",
        code: "LAFB",
        tenantId: 1,
      })
    ).toBe(true);
    expect(
      validate(ParentOrganizationPutRequestSchema, {
        name: "LA Food Bank",
        code: "LAFB",
      })
    ).toBe(false);
  });
});

describe("announcements POST schema", () => {
  const valid = {
    title: "Closure",
    description: "Closed for the holiday",
    is_enabled: true,
    severity: "warning",
  };

  it("accepts every supported severity", () => {
    for (const severity of ["info", "warning", "error", "success"]) {
      expect(
        validate(AnnouncementsPostRequestSchema, { ...valid, severity })
      ).toBe(true);
    }
  });

  it("rejects an unknown severity", () => {
    expect(
      validate(AnnouncementsPostRequestSchema, {
        ...valid,
        severity: "critical",
      })
    ).toBe(false);
  });

  it("requires is_enabled to be a boolean", () => {
    const { is_enabled: _isEnabled, ...body } = valid;
    expect(validate(AnnouncementsPostRequestSchema, body)).toBe(false);
    expect(
      validate(AnnouncementsPostRequestSchema, { ...valid, is_enabled: "true" })
    ).toBe(false);
  });
});

describe("feature POST schema", () => {
  it("requires a name and rejects unknown fields", () => {
    expect(validate(FeaturePostRequestSchema, { name: "reports" })).toBe(true);
    expect(
      validate(FeaturePostRequestSchema, { name: "reports", is_enabled: false })
    ).toBe(true);
    expect(validate(FeaturePostRequestSchema, { is_enabled: true })).toBe(
      false
    );
    expect(
      validate(FeaturePostRequestSchema, { name: "reports", owner: "x" })
    ).toBe(false);
  });
});

describe("tenant schema", () => {
  const valid = { id: 1, name: "Los Angeles", code: "LA" };

  it("accepts a valid tenant", () => {
    expect(validate(tenantRequestSchema, valid)).toBe(true);
  });

  it("requires id, name, and code", () => {
    expect(validate(tenantRequestSchema, { name: "LA", code: "LA" })).toBe(
      false
    );
    expect(validate(tenantRequestSchema, { id: 1, code: "LA" })).toBe(false);
    expect(validate(tenantRequestSchema, { id: 1, name: "LA" })).toBe(false);
  });

  it("enforces id range and code length", () => {
    expect(validate(tenantRequestSchema, { ...valid, id: 0 })).toBe(false);
    expect(validate(tenantRequestSchema, { ...valid, id: 10001 })).toBe(false);
    expect(
      validate(tenantRequestSchema, { ...valid, code: "a".repeat(11) })
    ).toBe(false);
    expect(validate(tenantRequestSchema, { ...valid, name: "" })).toBe(false);
  });
});

describe("feature-to-login POST schema", () => {
  it("requires feature_id and login_id", () => {
    expect(
      validate(FeatureToLoginPostRequestSchema, { feature_id: 1, login_id: 2 })
    ).toBe(true);
    expect(validate(FeatureToLoginPostRequestSchema, { feature_id: 1 })).toBe(
      false
    );
  });

  it("validates nested user entries", () => {
    const user = {
      login_id: 2,
      first_name: "Pat",
      last_name: "Lee",
      email: "pat@example.com",
    };
    expect(
      validate(FeatureToLoginPostRequestSchema, {
        feature_id: 1,
        login_id: 2,
        users: [user],
      })
    ).toBe(true);
    expect(
      validate(FeatureToLoginPostRequestSchema, {
        feature_id: 1,
        login_id: 2,
        users: [{ ...user, email: "bad" }],
      })
    ).toBe(false);
    expect(
      validate(FeatureToLoginPostRequestSchema, {
        feature_id: 1,
        login_id: 2,
        users: [{ ...user, role: "admin" }],
      })
    ).toBe(false);
  });
});
