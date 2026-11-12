import { JSONSchemaType } from "ajv";
import {
  SURVEY_LOCATIONS,
  SurveyLink,
  SurveyPutRequest,
} from "../../types/survey-types";

export const SURVEY_LINK_LABEL_MAX = 30;
export const SURVEY_TIME_TO_PROMPT_MAX = 3600; // NOTE: assumes that a delay over an hour is a typo
export const SURVEY_TITLE_MAX = 60;
export const SURVEY_PROMPT_MAX = 200;
export const SURVEY_LINKS_ITEMS_MAX = 4;

const SurveyLinkSchema: JSONSchemaType<SurveyLink> = {
  type: "object",
  required: ["display", "label", "action"],
  additionalProperties: false,
  properties: {
    display: {
      type: "string",
      enum: ["button", "text"],
    },
    label: {
      type: "string",
      minLength: 1,
      maxLength: SURVEY_LINK_LABEL_MAX,
      pattern: "\\S",
    },
    url: {
      type: "string",
      pattern: "^https?://",
      nullable: true,
    },
    action: {
      type: "string",
      enum: ["optOut", "navigate"],
    },
  },
  if: { properties: { action: { const: "navigate" } } },
  then: {
    required: ["url"],
    properties: {
      url: {
        type: "string",
      },
    },
  },
};

export const SurveyPutRequestSchema: JSONSchemaType<SurveyPutRequest> = {
  type: "object",
  required: [
    "tenantId",
    "timeToPromptSeconds",
    "whereToPrompt",
    "title",
    "prompt",
    "links",
  ],
  additionalProperties: false,
  properties: {
    tenantId: { type: "integer", minimum: 1 },
    timeToPromptSeconds: {
      type: "integer",
      minimum: 0,
      maximum: SURVEY_TIME_TO_PROMPT_MAX,
    },
    whereToPrompt: {
      type: "string",
      enum: SURVEY_LOCATIONS,
    },
    title: {
      type: "string",
      minLength: 1,
      maxLength: SURVEY_TITLE_MAX,
      pattern: "\\S",
    },
    prompt: {
      type: "string",
      minLength: 1,
      maxLength: SURVEY_PROMPT_MAX,
      pattern: "\\S",
    },
    links: {
      type: "array",
      items: SurveyLinkSchema,
      minItems: 1,
      maxItems: SURVEY_LINKS_ITEMS_MAX,
    },
  },
};
