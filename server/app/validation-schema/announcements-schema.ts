import { JSONSchemaType } from "ajv";
import { Feature } from "../../types/feature-types";

export const AnnouncementsPostRequestSchema: JSONSchemaType<Announcements> = {
  type: "object",
  required: ["description"],
  properties: {
    id: {
      type: "number",
    },
    title: {
      type: "string",
    },
	description: {
      type: "string",
    },
    is_enabled: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};