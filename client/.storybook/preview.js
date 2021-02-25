import { muiTheme } from "storybook-addon-material-ui";
import { theme as adminTheme } from "../src/theme/adminTheme.js";
import clientTheme from "../src/theme/clientTheme.js";

export const decorators = [muiTheme([adminTheme, clientTheme])];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
