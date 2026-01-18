import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: [
      "**/node_modules/",
      "**/public/",
      "**/.cache/",
      "**/build/",
      "**/migrations/",
    ],
  },
  {
    extends: compat.extends(
      "eslint:recommended",
      "prettier",
      "plugin:prettier/recommended"
    ),

    plugins: {
      prettier,
      jest,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...jest.environments.globals.globals,
        ...globals.commonjs,
        ...globals.amd,
      },

      ecmaVersion: 2020,
      sourceType: "module",
    },

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": ["off"],
    },
  },
]);
