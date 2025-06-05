import { JSONSchemaType } from "ajv";
import { Announcement } from "../../types/announcements-types";

export const AnnouncementsPostRequestSchema: JSONSchemaType<Announcement> = {
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