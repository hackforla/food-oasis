import { JSONSchemaType } from "ajv";
import { FeatureToLogin } from "../../types/feature-to-login-types";

export const FeatureToLoginPostRequestSchema: JSONSchemaType<FeatureToLogin> = {
  type: "object",
  required: ["feature_id", "login_id"],
  properties: {
    ftl_id: {
      type: "number",
    },
    feature_id: {
      type: "number",
    },
    login_id: {
      type: "number",
    },
    users: {
      type: "array",
      items: {
        type: "object",
        required: ["login_id", "first_name", "last_name", "email"],
        properties: {
          login_id: {
            type: "number",
          },
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};
