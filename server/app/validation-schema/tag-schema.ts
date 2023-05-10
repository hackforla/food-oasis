import { JSONSchemaType } from "ajv";
import { StakeholderTag } from '../../types/tag-types';

export const tagPutRequestSchema: JSONSchemaType<StakeholderTag> = {
  type: "object",
  required: ["id", "name", "tenantId"],
  properties: {
    id: {
      type: "integer",
      minimum: 1,
      maximum: 10000,
    },
    name: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
    tenantId: {
      type: "integer",
      minimum: 1,
      maximum: 10000
    },
  },
  additionalProperties: false,
};

export const tagPostRequestSchema: JSONSchemaType<Omit<StakeholderTag, "id">> = {
  type: "object",
  required: ["name", "tenantId"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 256
    },
    tenantId: {
      type: "integer",
      minimum: 1,
      maximum: 10000,
    },
  },
  additionalProperties: false
}
