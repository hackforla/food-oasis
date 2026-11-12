export interface SurveyLink {
  display: "button" | "text";
  label: string;
  url?: string;
  action: "optOut" | "navigate";
}

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
  createdAt: string;
  updatedAt: string;
}
export interface SurveyPutRequest {
  tenantId: number;
  timeToPromptSeconds: number;
  whereToPrompt: SurveyLocation;
  title: string;
  prompt: string;
  links: SurveyLink[];
}
