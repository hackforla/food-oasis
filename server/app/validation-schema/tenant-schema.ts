import { JSONSchemaType } from "ajv";
import { Tenant } from '../../types/tenant-types';

export const tenantRequestSchema: JSONSchemaType<Tenant> = {
  type: "object",
  required: ["id", "name", "code"], 
  // id, name and code made required based on the queries (insert and update) in tenant-service module
  properties: {
    id: {
      type: "integer",
      minimum: 1,
      maximum: 10000,
    },
    name: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    code: {
      type: "string",
      minLength: 1,
      maxLength: 10,
    },
  },
  additionalProperties: false,
};
