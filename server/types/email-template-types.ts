export const EMAIL_TEMPLATE_KEYS = ["verification"] as const;

export type EmailTemplateKey = (typeof EMAIL_TEMPLATE_KEYS)[number];

export interface EmailTemplate {
  subject: string;
  intro: string;
}

export interface EmailTemplatePostRequest {
  tenantId: number;
  subject?: string;
  intro?: string;
}
