import { JSONSchemaType } from "ajv";
import { ParentOrganization } from "../../types/parent-organization-types";

export const ParentOrganizationPostRequestSchema: JSONSchemaType<ParentOrganization> = {
  type: "object",
  required: ["name", "code"],
  properties: {
    code: {
      type: "string",
      minLength: 1, 
    },
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


export const ParentOrganizationPutRequestSchema: JSONSchemaType<ParentOrganization> = {
  type: "object",
  required: ["id", "name", "code"],
  properties: {
    id: { 
      type: "number" 
    },
    name: { 
      type: "string", 
      minLength: 1 
    },
    code: { 
      type: "string", 
      minLength: 1 
    },
    tenantId: { 
      type: "number" 
    },
  },
  additionalProperties: false,
};
