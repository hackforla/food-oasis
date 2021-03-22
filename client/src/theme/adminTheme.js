import { createMuiTheme } from "@material-ui/core/styles";
import { white, primary, secondary, success, error, bodyText } from "./colors";

export const theme = {
  palette: {
    common: {
      black: bodyText,
      white: white,
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    success: {
      main: success,
    },
    error: {
      main: error,
    },
  },
  typography: {
    fontFamily: ["Helvetica Neue", "Arial", "sans-serif"].join(","),
    // Heading 1
    h1: {
      fontSize: 40,
      fontWeight: "500",
      lineHeight: "49px",
      color: "red",
    },
    // Heading 2
    h2: {
      fontSize: 32,
      fontWeight: "500",
      lineHeight: "39px",
    },
    // Heading 3
    h3: {
      fontSize: 20,
      fontWeight: "500",
      lineHeight: "24px",
    },
    // Body Big 1
    h4: {
      fontSize: 18,
      fontWeight: "500",
      lineHeight: "27px",
    },
    // Body Big 2
    h5: {
      fontSize: 18,
      lineHeight: "27px",
    },
    // Body Small 1
    h6: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: "24px",
    },
    // Body Small 2
    body1: {
      fontSize: 16,
      lineHeight: "24px",
    },
    // Body Small Italic
    body2: {
      fontSize: 16,
      fontStyle: "italic",
      lineHeight: "24px",
    },
    // Button Small
    button: {
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      lineHeight: "18px",
    },
    // Button Big
    overline: {
      fontSize: 18,
      fontWeight: "500",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      lineHeight: "18px",
    },
    // Small Text
    caption: {
      fontSize: 12,
      lineHeight: "18px",
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
    MuiTypography: {
      root: {
        color: bodyText,
      },
    },
    MuiSvgIcon: {
      fontSizeSmall: {
        fontSize: "15px",
        marginRight: "5px",
      },
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
    },
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
};

const adminTheme = createMuiTheme(theme);

export default adminTheme;
