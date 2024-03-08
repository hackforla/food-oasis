import { JSONSchemaType } from "ajv";
import { FeatureToLogin } from "../../types/feature-to-login-types";

export const FeatureToLoginPostRequestSchema: JSONSchemaType<Omit<FeatureToLogin, "id">> =
  {
    type: "object",
    required: ["feature_id", "login_id"],
    properties: {
      id: {
        type: "number",
      },
      feature_id: {
        type: "number",
      },
      login_id: {
        type: "number",
      },
    },
    additionalProperties: false,
  };