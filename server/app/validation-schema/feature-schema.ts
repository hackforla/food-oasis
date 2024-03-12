import { JSONSchemaType } from "ajv";
import { Feature } from "../../types/feature-types";

export const FeaturePostRequestSchema: JSONSchemaType<Omit<Feature, "id">> = {
  type: "object",
  required: ["name"],
  properties: {
    id: {
      type: "number",
    },
    name: {
      type: "string",
    },
  },
  additionalProperties: false,
};
