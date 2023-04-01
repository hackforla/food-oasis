import { JSONSchemaType } from "ajv";
import { Tenant } from '../types/tenant-types';
import { StakeholderTag } from '../types/tag-types';


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
      maxLength: 50,
    },
    code: {
      type: "string",
      minLength: 1,
    },
  },
  additionalProperties: false,
};

// This schema is based on put request for tag
export const tagRequestSchema: JSONSchemaType<StakeholderTag> = {
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
      maxLength: 50,
    },
    tenantId: {
      type: "integer",
      minimum: 1,
      maximum: 10000
    },
  },
  additionalProperties: false,
};
