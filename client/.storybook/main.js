const path = require("path");

module.exports = {
  stories: ["../src/components/UI/**/*.stories.js"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-controls",
    "storybook-addon-material-ui",
  ],
};
