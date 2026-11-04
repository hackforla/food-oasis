import { JSONSchemaType } from "ajv";
import { EmailTemplatePostRequest } from "../../types/email-template-types";

export const EMAIL_TEMPLATE_SUBJECT_MAX = 200;
export const EMAIL_TEMPLATE_INTRO_MAX = 5000;

export const EmailTemplatePostRequestSchema: JSONSchemaType<EmailTemplatePostRequest> =
  {
    type: "object",
    required: ["tenantId"],
    additionalProperties: false,
    properties: {
      tenantId: { type: "integer", minimum: 1 },
      subject: {
        type: "string",
        minLength: 1,
        maxLength: EMAIL_TEMPLATE_SUBJECT_MAX,
        // at least one non-whitespace character
        pattern: "\\S",
        nullable: true,
      },
      intro: {
        type: "string",
        minLength: 1,
        maxLength: EMAIL_TEMPLATE_INTRO_MAX,
        pattern: "\\S",
        nullable: true,
      },
    },
    anyOf: [{ required: ["subject"] }, { required: ["intro"] }],
  };
