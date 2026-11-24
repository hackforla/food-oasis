export interface SurveyLink {
  display: "button" | "text";
  label: string;
  url?: string;
  action: "optOut" | "navigate";
}
// This has to be kept in sync with CONSTRAINT chk_survey_where_to_prompt in
// the 1794268419231_add-survey-table.js migration file, as well as with the
// options in client/src/types/Survey.ts
export const SURVEY_LOCATIONS = [
  "all",
  "/",
  "/organizations",
  "/suggestion",
  "/donate",
  "/about",
  "/faqs",
  "/contact",
] as const;
export type SurveyLocation = (typeof SURVEY_LOCATIONS)[number];

export interface Survey {
  id: number;
  tenantId: number;
  timeToPromptSeconds: number;
  whereToPrompt: SurveyLocation;
  title: string;
  prompt: string;
  links: SurveyLink[];
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminSurvey extends Survey {
  updatedByName: string | null;
}

export interface SurveyRequest {
  tenantId: number;
  timeToPromptSeconds: number;
  whereToPrompt: SurveyLocation;
  title: string;
  prompt: string;
  links: SurveyLink[];
  isEnabled: boolean;
}
