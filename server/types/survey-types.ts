export interface SurveyLink {
  display: "button" | "text";
  label: string;
  url?: string;
  action: "optOut" | "navigate";
}

export interface Survey {
  id: number;
  tenantId: number;
  timeToPromptSeconds: number;
  whereToPrompt: string;
  title: string;
  prompt: string;
  links: SurveyLink[];
  createdDate: string;
  updatedDate: string;
}
