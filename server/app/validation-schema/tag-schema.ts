import { JSONSchemaType } from "ajv";
import { Tag, StakeholderTag } from '../../types/tag-types';

export const tagPutRequestSchema: JSONSchemaType<Omit<Tag, "id">> = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    }
  },
  additionalProperties: false,
};

export const tagPostRequestSchema: JSONSchemaType<Omit<StakeholderTag, "id">> = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 256
    },
    tenantId: {
      type: "integer",
      minimum: 1,
    },
  },
  additionalProperties: false
}
