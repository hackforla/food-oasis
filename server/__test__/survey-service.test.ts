import db from "../app/services/db";
import surveyService from "../app/services/survey-service";

jest.mock("../app/services/db", () => ({
  __esModule: true,
  default: { oneOrNone: jest.fn() },
}));

const oneOrNoneMock = db.oneOrNone as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
});

const surveyRow = {
  id: 1,
  tenant_id: 3,
  time_to_prompt_seconds: 30,
  where_to_prompt: "all",
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
  is_enabled: true,
  created_at: new Date("2026-01-01"),
  updated_at: new Date("2026-01-01"),
};

const expectedSurvey = {
  id: 1,
  tenantId: 3,
  timeToPromptSeconds: 30,
  whereToPrompt: "all",
  title: "Help us improve",
  prompt: "Take a short survey?",
  links: surveyRow.links,
  isEnabled: true,
  createdAt: surveyRow.created_at,
  updatedAt: surveyRow.updated_at,
};

describe("isEnabled property on public get", () => {
  it("returns a survey if isEnabled is true", async () => {
    oneOrNoneMock.mockResolvedValueOnce(surveyRow);
    const result = await surveyService.getPublicByTenantId(3);
    expect(result).toEqual(expectedSurvey);
    expect(oneOrNoneMock).toHaveBeenCalledWith(expect.any(String), {
      tenantId: 3,
    });
  });
  it("returns null if isEnabled is false", async () => {
    oneOrNoneMock.mockResolvedValueOnce({ ...surveyRow, is_enabled: false });
    const result = await surveyService.getPublicByTenantId(3);
    expect(result).toBeNull();
  });
});
