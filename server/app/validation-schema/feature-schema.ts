import { JSONSchemaType } from "ajv";
import { Feature } from "../../types/feature-types";

export const FeaturePostRequestSchema: JSONSchemaType<Feature> = {
  type: "object",
  required: ["name"],
  properties: {
    id: {
      type: "number",
    },
    name: {
      type: "string",
    },
    is_enabled: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};
