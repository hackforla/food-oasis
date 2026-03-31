/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx|js)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(camelcase-keys|camelcase|map-obj|quick-lru|uuid)/)",
  ],
};
