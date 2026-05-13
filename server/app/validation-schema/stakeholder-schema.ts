import { JSONSchemaType } from "ajv";

type StakeholderHour = {
  close: string;
  dayOfWeek: string;
  open: string;
  weekOfMonth: number;
};

type StakeholderPostRequest = {
  address1: string;
  address2: string;
  adminContactEmail: string;
  adminContactName: string;
  adminContactPhone: string;
  adminNotes: string;
  allowWalkins: boolean;
  categoryNotes: string;
  city: string;
  confirmedAddress: boolean;
  confirmedCategories: boolean;
  confirmedEmail: boolean;
  confirmedFoodTypes: boolean;
  confirmedHours: boolean;
  confirmedName: boolean;
  confirmedPhone: boolean;
  covidNotes: string;
  description: string;
  donationAcceptFrozen: boolean;
  donationAcceptPerishable: boolean;
  donationAcceptRefrigerated: boolean;
  donationContactEmail: string;
  donationContactName: string;
  donationContactPhone: string;
  donationDeliveryInstructions: string;
  donationNotes: string;
  donationPickup: boolean;
  donationSchedule: string;
  eligibilityNotes: string;
  email: string;
  facebook: string;
  foodBakery: boolean;
  foodDairy: boolean;
  foodDryGoods: boolean;
  foodMeat: boolean;
  foodPrepared: boolean;
  foodProduce: boolean;
  foodTypes: string;
  hours: StakeholderHour[];
  hoursNotes: string;
  inactive: boolean;
  inactiveTemporary: boolean;
  instagram: string;
  items: string;
  languages: string;
  latitude: number;
  linkedin: string;
  loginId: number;
  longitude: number;
  name: string;
  notes: string;
  parentOrganization: string;
  phone: string;
  phoneExt: string;
  physicalAccess: string;
  pinterest: string;
  requirements: string;
  reviewNotes: string;
  selectedCategoryIds: number[];
  services: string;
  state: string;
  tags: string[];
  tenantId: number;
  twitter: string;
  verificationStatusId: number;
  website: string;
  zip: string;
};

type StakeholderPutRequest = StakeholderPostRequest & {
  id: number;
};

const hoursSchema: JSONSchemaType<StakeholderHour[]> = {
  type: "array",
  items: {
    type: "object",
    required: ["weekOfMonth", "dayOfWeek", "open", "close"],
    properties: {
      weekOfMonth: {
        type: "integer",
      },
      dayOfWeek: {
        type: "string",
        minLength: 1,
      },
      open: {
        type: "string",
        minLength: 1,
      },
      close: {
        type: "string",
        minLength: 1,
      },
    },
    additionalProperties: true,
  },
};

const stakeholderProperties = {
  name: {
    type: "string",
    minLength: 1,
  },
  phone: {
    type: "string",
    minLength: 1,
  },
  address1: {
    type: "string",
    minLength: 1,
  },
  city: {
    type: "string",
    minLength: 1,
  },
  state: {
    type: "string",
    minLength: 1,
  },
  zip: {
    type: "string",
    minLength: 1,
  },
  latitude: {
    type: "number",
  },
  longitude: {
    type: "number",
  },
  selectedCategoryIds: {
    type: "array",
    minItems: 1,
    items: {
      type: "integer",
      minimum: 1,
    },
  },
  loginId: {
    type: "integer",
    minimum: 1,
  },
  tenantId: {
    type: "integer",
    minimum: 1,
  },
  address2: {
    type: "string",
  },
  adminContactEmail: {
    type: "string",
    anyOf: [{ format: "email" }, { maxLength: 0 }],
  },
  adminContactName: {
    type: "string",
  },
  adminContactPhone: {
    type: "string",
  },
  adminNotes: {
    type: "string",
  },
  allowWalkins: {
    type: "boolean",
  },
  categoryNotes: {
    type: "string",
  },
  confirmedAddress: {
    type: "boolean",
  },
  confirmedCategories: {
    type: "boolean",
  },
  confirmedEmail: {
    type: "boolean",
  },
  confirmedFoodTypes: {
    type: "boolean",
  },
  confirmedHours: {
    type: "boolean",
  },
  confirmedName: {
    type: "boolean",
  },
  confirmedPhone: {
    type: "boolean",
  },
  covidNotes: {
    type: "string",
  },
  description: {
    type: "string",
  },
  donationAcceptFrozen: {
    type: "boolean",
  },
  donationAcceptPerishable: {
    type: "boolean",
  },
  donationAcceptRefrigerated: {
    type: "boolean",
  },
  donationContactEmail: {
    type: "string",
    anyOf: [{ format: "email" }, { maxLength: 0 }],
  },
  donationContactName: {
    type: "string",
  },
  donationContactPhone: {
    type: "string",
  },
  donationDeliveryInstructions: {
    type: "string",
  },
  donationNotes: {
    type: "string",
  },
  donationPickup: {
    type: "boolean",
  },
  donationSchedule: {
    type: "string",
  },
  eligibilityNotes: {
    type: "string",
  },
  email: {
    type: "string",
    anyOf: [{ format: "email" }, { maxLength: 0 }],
  },
  facebook: {
    type: "string",
  },
  foodBakery: {
    type: "boolean",
  },
  foodDairy: {
    type: "boolean",
  },
  foodDryGoods: {
    type: "boolean",
  },
  foodMeat: {
    type: "boolean",
  },
  foodPrepared: {
    type: "boolean",
  },
  foodProduce: {
    type: "boolean",
  },
  foodTypes: {
    type: "string",
  },
  hours: hoursSchema,
  hoursNotes: {
    type: "string",
  },
  inactive: {
    type: "boolean",
  },
  inactiveTemporary: {
    type: "boolean",
  },
  instagram: {
    type: "string",
  },
  items: {
    type: "string",
  },
  languages: {
    type: "string",
  },
  linkedin: {
    type: "string",
  },
  notes: {
    type: "string",
  },
  parentOrganization: {
    type: "string",
  },
  phoneExt: {
    type: "string",
  },
  physicalAccess: {
    type: "string",
  },
  pinterest: {
    type: "string",
  },
  requirements: {
    type: "string",
  },
  reviewNotes: {
    type: "string",
  },
  services: {
    type: "string",
  },
  tags: {
    type: "array",
    items: {
      type: "string",
    },
  },
  twitter: {
    type: "string",
  },
  verificationStatusId: {
    type: "integer",
  },
  website: {
    type: "string",
  },
} as const;

export const stakeholderPostRequestSchema: JSONSchemaType<StakeholderPostRequest> =
  {
    type: "object",
    required: [
      "name",
      "phone",
      "address1",
      "city",
      "state",
      "zip",
      "latitude",
      "longitude",
      "selectedCategoryIds",
      "loginId",
      "tenantId",
    ],
    properties: stakeholderProperties,
    additionalProperties: true,
  };

export const stakeholderPutRequestSchema: JSONSchemaType<StakeholderPutRequest> =
  {
    type: "object",
    required: [
      "id",
      "name",
      "phone",
      "address1",
      "city",
      "state",
      "zip",
      "latitude",
      "longitude",
      "selectedCategoryIds",
      "loginId",
    ],
    properties: {
      id: {
        type: "integer",
        minimum: 1,
      },
      ...stakeholderProperties,
    },
    additionalProperties: true,
  };
