import { muiTheme } from "storybook-addon-material-ui";
import { theme as adminTheme } from "../../theme/adminTheme";
import clientTheme from "../../theme/clientTheme";

export const decorators = muiTheme([adminTheme, clientTheme]);
