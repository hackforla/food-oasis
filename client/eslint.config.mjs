import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import prettier from "eslint-config-prettier";
import globals from "globals";

// Flat ESLint config for the Vite + React + TypeScript client. Mirrors the
// server's eslint.config.mjs in spirit: recommended rule sets, Prettier owns
// formatting (so its conflicting style rules are switched off last).
export default defineConfig([
  globalIgnores([
    "node_modules/",
    "dist/",
    "build/",
    "public/",
    ".cache/",
    "playwright-report/",
    "test-results/",
    "coverage/",
  ]),

  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  {
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: "detect" } },
    rules: {
      // Only the two classic hooks rules; the newer React Compiler rules in
      // eslint-plugin-react-hooks are not adopted here.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // TypeScript covers prop shapes; PropTypes are not used in this codebase.
      "react/prop-types": "off",
      // Prose copy in JSX uses plain quotes and apostrophes; escaping them as
      // HTML entities hurts readability and is not enforced on the server side.
      "react/no-unescaped-entities": "off",
      // Same stance as server/eslint.config.mjs: strict mode already applies,
      // and existing code leans on `any` in places. Don't add new ones.
      "@typescript-eslint/no-explicit-any": "off",
      // Callback parameters are dictated by the caller's signature (theme
      // overrides, event handlers, array callbacks), so unused args are not
      // a signal. Unused variables and imports still are.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "none",
          caughtErrors: "none",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // `cond && doThing()` and ternaries used as statements are idiomatic here.
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },

  // Playwright specs. `test.extend` fixtures take a `use` callback that the
  // hooks rule mistakes for React's `use`.
  {
    files: ["tests/**"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },

  // CommonJS config files (Jest config and environment).
  {
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },

  // Jest unit tests and setup.
  {
    files: ["src/__test__/**", "setupTests.ts"],
    languageOptions: { globals: jest.environments.globals.globals },
  },

  prettier,
]);
