import { JSONSchemaType } from "ajv";
import { Announcement } from "../../types/announcements-types";

type AnnouncementPostRequest = Omit<Announcement, "id" | "created_at">;

export const AnnouncementsPostRequestSchema: JSONSchemaType<AnnouncementPostRequest> =
  {
    type: "object",
    required: ["title", "description", "is_enabled", "severity"],
    properties: {
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      is_enabled: {
        type: "boolean",
      },
      severity: {
        type: "string",
        enum: ["info", "warning", "error", "success"],
      },
    },
  };
