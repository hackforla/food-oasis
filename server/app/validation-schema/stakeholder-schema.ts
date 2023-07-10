import { JSONSchemaType } from "ajv";
import { InsertStakeholderParams } from '../../types/stakeholder-types';

export const stakeholderRequestSchema: JSONSchemaType<InsertStakeholderParams> = {
  type: "object",
  required: [],
  // oneOf: [],
  properties: {
    loginId: { type: "integer" },
    tenantId: { type: "integer" },
    selectedCategoryIds: { type: "array", items: { type: "integer" } },
    address1: { type: "string", maxLength: 256 },
    address2: { type: "string", maxLength: 256 },
    // emails can contain 50 characters but the average email address is about 25
    adminContactEmail: {
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
    adminContactName: { type: "string", maxLength: 100 },
    adminContactPhone: { type: "string", maxLength: 20 },
    adminNotes: { type: "string" },
    allowWalkins: { type: "boolean" },
    approvedDate: {
      anyOf: [
        {
          type: "string",
          format: "date-time",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    assignedDate: {
      anyOf: [
        {
          type: "string",
          format: "date-time",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    assignedLoginId: { type: "integer" },
    assignedUser: { type: "string" },
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          display_order: { type: "integer" },
          stakeholder_id: { type: "integer" }
        }
      }
    },
    categoryNotes: { type: "string" },
    city: { type: "string", maxLength: 20 }, // longest city name in USA is 17 letters "Mooselookmeguntic"
    claimedDate: {
      anyOf: [
        {
          type: "string",
          format: "date-time",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    claimedLoginId: { type: "integer" },
    claimedUser: { type: "string" }, //! Column not found in DB
    completeCriticalPercent: { type: "integer" },
    confirmedAddress: { type: "boolean" },
    confirmedCategories: { type: "boolean" },
    confirmedEmail: { type: "boolean" },
    confirmedFoodTypes: { type: "boolean" },
    confirmedHours: { type: "boolean" },
    confirmedName: { type: "boolean" },
    confirmedPhone: { type: "boolean" },
    covidNotes: { type: "string" },
    createdDate: {
      anyOf: [
        {
          type: "string",
          format: "date-time",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    createdLoginId: { type: "integer" },
    createdUser: { type: "string" }, //! Column not found in DB
    description: { type: "string" },
    donationAcceptFrozen: { type: "boolean" },
    donationAcceptPerishable: { type: "boolean" },
    donationAcceptRefrigerated: { type: "boolean" },
    donationContactEmail: {
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
    donationContactName: { type: "string", maxLength: 60 },
    donationContactPhone: { type: "string", maxLength: 20 },
    donationDeliveryInstructions: { type: "string" },
    donationNotes: { type: "string" },
    donationPickup: { type: "boolean" },
    donationSchedule: { type: "string" },
    eligibilityNotes: { type: "string" },
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
    facebook: { type: "string" },
    foodBakery: { type: "boolean" },
    foodDairy: { type: "boolean" },
    foodDryGoods: { type: "boolean" },
    foodMeat: { type: "boolean" },
    foodPrepared: { type: "boolean" },
    foodProduce: { type: "boolean" },
    foodTypes: { type: "string" },
    // hours:
    // | string
    // | { weekOfMonth: number; open: Date; close: Date; dayOfWeek: number }[];
    hours: {
      anyOf: [{ type: "string" }, {
        type: "array",
        items: {
          type: "object",
          properties: {
            weekOfMonth: { type: "integer" },
            dayOfWeek: { type: "string" },
            open: { type: "string" },
            close: { type: "string" }
          }
        }
      }
      ],
    },
    hoursNotes: { type: "string" },
    id: { type: "integer" },
    inactive: { type: "boolean" },
    inactiveTemporary: { type: "boolean" },
    instagram: { type: "string" },
    items: { type: "string" },
    languages: { type: "string" },
    latitude: { type: "number" },
    linkedin: { type: "string" },
    longitude: { type: "number" },
    modifiedDate: {
      anyOf: [
        {
          type: "string",
          format: "date-time",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    modifiedLoginId: { type: "integer" },
    modifiedUser: { type: "string" }, //! Not found in DB
    name: { type: "string" },
    neighborhoodId: { type: "integer" },
    neighborhoodName: { type: "string" },
    notes: { type: "string" },
    parentOrganization: { type: "string" },
    parentOrganizationId: { type: "integer" },
    phone: { type: "string", maxLength: 20 },
    physicalAccess: { type: "string" },
    pinterest: { type: "string" },
    requirements: { type: "string" },
    reviewedUser: { type: "string" }, //! Not found in DB
    reviewedLoginId: { type: "integer" },
    reviewNotes: { type: "string" },
    services: { type: "string" },
    state: { type: "string" },
    submittedDate: {
      anyOf: [
        {
          type: "string",
          format: "date-time",
          maxLength: 50,
        },
        {
          type: "string",
          maxLength: 0
        }
      ]
    },
    submittedLoginId: { type: "integer" },
    submittedUser: { type: "string" }, //! Not found in DB
    tags: { type: "array", items: { type: "string" } },
    twitter: { type: "string" },
    verificationStatusId: { type: "integer" },
    website: { type: "string" },
    zip: { type: "string" },
  },
  additionalProperties: false,
}


