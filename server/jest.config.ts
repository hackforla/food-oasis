/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/__test__/setup-env.ts"],
  // Print snapshots without the "Object {" / "Array [" prefixes (the Jest 29
  // default) so the existing inline snapshots match on Jest 28.
  snapshotFormat: { printBasicPrototype: false },
  transform: {
    "^.+\\.(ts|tsx|js)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(camelcase-keys|camelcase|map-obj|quick-lru|uuid)/)",
  ],
};
