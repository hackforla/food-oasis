module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["react", "prettier", "eslint-plugin-react"],
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
    "prettier/prettier": "error",
  },
};
