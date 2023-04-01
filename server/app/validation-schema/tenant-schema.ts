import { JSONSchemaType } from "ajv";
import { Tenant } from '../../types/tenant-types';

export const tenantRequestSchema: JSONSchemaType<Tenant> = {
  type: "object",
  required: ["id", "name", "code"],
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
    code: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
  },
  additionalProperties: false,
};
