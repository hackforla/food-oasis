module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "react-app",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["prettier", "react"],
  env: {
    mocha: true,
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/prop-types": 0,
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      // Version checking of react. Default is "detect", which
      // fails at the root directory, since react is not installed
      // here. Providing a dummy number supresses the warning
      version: "16.0",
    },
  },
};
