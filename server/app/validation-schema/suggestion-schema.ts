import { JSONSchemaType } from "ajv";
import { Suggestion } from "../../types/suggestion-types";

export const suggestionPostRequestSchema: JSONSchemaType<Omit<Suggestion, "id">> = {
  type: "object",
  required: ["name"],
  properties: {
    stakeholderId: {
      type: "integer",
      minimum: 1,
    },
    adminNotes: {
      type: "string",
    },
    suggestionStatusId: { type: "integer" },
    name: {
      type: "string",
      maxLength: 100,
      pattern: "^[^\s].+[^\s]$"
    },
    address1: {
      type: "string",
      maxLength: 256,
    },
    address2: {
      type: "string",
      maxLength: 256,
    },
    city: {
      type: "string",
      maxLength: 20,
    },
    state: {
      type: "string",
      maxLength: 20,
    },
    zip: {
      type: "string",
      maxLength: 256,
    },
    phone: {
      type: "string",
      maxLength: 20,
    },
    email: {
      // once we have set a value to format/pattern property, that property becomes required
      // since email is opetional, we can make UnionType to accept empty strings
      // setting minLength to 0 or setting nullable: true won't help to leave email empty
      anyOf: [
        {
          type: "string",
          "format": "email",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    notes: { type: "string" }, // also called "other information"
    tipsterName: {
      type: "string",
      maxLength: 100
    },
    tipsterPhone: {
      type: "string",
      maxLength: 20,
    },
    tipsterEmail: {
      anyOf: [
        {
          type: "string",
          "format": "email",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    hours: { type: "string" },
    category: { type: "string" },
    tenantId: {
      type: "integer",
      minimum: 1
    }
  },
  additionalProperties: false
};

export const suggestionPutRequestSchema: JSONSchemaType<Omit<Suggestion, "id">> = {
  type: "object",
  required: [],
  properties: {
    stakeholderId: {
      type: "integer",
      minimum: 1,
    },
    adminNotes: {
      type: "string",
    },
    suggestionStatusId: { type: "integer" },
    name: {
      type: "string",
      maxLength: 100,
    },
    address1: {
      type: "string",
      maxLength: 256,
    },
    address2: {
      type: "string",
      maxLength: 256,
    },
    city: {
      type: "string",
      maxLength: 20,
    },
    state: {
      type: "string",
      maxLength: 20,
    },
    zip: {
      type: "string",
      maxLength: 256,
    },
    phone: {
      type: "string",
      maxLength: 20,
    },
    email: {
      anyOf: [
        {
          type: "string",
          "format": "email",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    notes: { type: "string" },
    tipsterName: {
      type: "string",
      maxLength: 100
    },
    tipsterPhone: {
      type: "string",
      maxLength: 20,
    },
    tipsterEmail: {
      anyOf: [
        {
          type: "string",
          "format": "email",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    hours: { type: "string" },
    category: { type: "string" },
    tenantId: {
      type: "integer",
      minimum: 1
    }
  },
  additionalProperties: false
};
