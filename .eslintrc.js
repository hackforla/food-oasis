module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:react/recommended"],
  plugins: ["react", "prettier"],
  env: {
    mocha: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
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
