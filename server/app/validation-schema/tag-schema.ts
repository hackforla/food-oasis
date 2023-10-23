import { JSONSchemaType } from "ajv";
import { StakeholderTag } from "../../types/tag-types";

export const tagPutRequestSchema: JSONSchemaType<StakeholderTag> = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "number",
    },
    name: {
      type: "string",
      minLength: 1,
    },
    tenantId: {
      type: "number",
    },
  },

  additionalProperties: false,
};

export const tagPostRequestSchema: JSONSchemaType<Omit<StakeholderTag, "id">> =
  {
    type: "object",
    required: ["name", "tenantId"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
      },
      tenantId: {
        type: "integer",
        minimum: 1,
      },
    },
    additionalProperties: false,
  };
