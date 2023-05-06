import { JSONSchemaType } from "ajv";
import { Tenant } from '../types/tenant-types';
import { StakeholderTag } from '../types/tag-types';
import { Suggestion } from "../types/suggestion-types";

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

export const suggestionPutRequestSchema: JSONSchemaType<Suggestion> = {
  type: "object",
  required: ["id", "adminNotes", "suggestionStatusId"],
  properties: {
    id: {
      type: "integer",
      minimum: 1,
      maximum: 10000,
    },
    adminNotes: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
    suggestionStatusId: {
      type: "integer",
    },
    name: {
      type: "string",
    },
    address1: {
      type: "string",
    },
    address2: {
      type: "string",
    },
    city: {
      type: "string",
    },
    state: {
      type: "string",
    },
    zip: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    email: {
      type: "string",
    },
    notes: {
      type: "string",
    },
    tipsterName: {
      type: "string",
    },
    tipsterPhone: {
      type: "string",
    },
    tipsterEmail: {
      type: "string",
    },
    hours: {
      type: "string",
    },
    category: {
      type: "string",
    },
    stakeholderId: {
      type: "number",
    },
    tenantId: {
      type: "integer",
    }
  },
  additionalProperties: false
};

export const suggestionPostRequestSchema: JSONSchemaType<Omit<Suggestion, "id">> = {
  type: "object",
  required: [
    "stakeholderId", "adminNotes", "suggestionStatusId", "name", "address1", "address2", "city",
    "state", "zip", "phone", "email", "notes", "tipsterName", "tipsterPhone", "tipsterEmail",
    "hours", "category", "tenantId"
  ],
  properties: {
    stakeholderId: {
      type: "integer",
      minimum: 1,
      maximum: 10000,
    },
    adminNotes: {
      type: "string",
      maxLength: 256,
    },
    suggestionStatusId: {
      type: "integer",
      minimum: 1,
      maximum: 100,
    },
    name: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
    address1: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
    address2: {
      type: "string",
      maxLength: 256,
    },
    city: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
    state: {
      type: "string",
      minLength: 1,
      maxLength: 256,
    },
    zip: {
      type: "string",
      maxLength: 256,
    },
    phone: {
      type: "string",
      maxLength: 256,
    },
    email: {
      type: "string",
      maxLength: 256,
    },
    notes: {
      type: "string",
      maxLength: 1024,
    },
    tipsterName: {
      type: "string",
      maxLength: 256
    },
    tipsterPhone: {
      type: "string",
      maxLength: 256,
    },
    tipsterEmail: {
      type: "string",
      maxLength: 256,
    },
    hours: {
      type: "string",
      maxLength: 1024,
    },
    category: {
      type: "string",
      maxLength: 256,
    },
    tenantId: {
      type: "integer",
      minimum: 1,
      maximum: 10000,
    }
  },
  additionalProperties: false
};
