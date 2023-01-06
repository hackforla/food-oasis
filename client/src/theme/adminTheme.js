import { createTheme } from "@mui/material/styles";
import {
  white,
  gray,
  primary,
  secondary,
  success,
  error,
  confirmed,
  headingText,
  bodyText,
  mealProgram,
  foodPantry,
  link,
  linkVisited,
  linkHover,
} from "./colors";

/*
  This theme is not currently used, as it was proving too cumbersome to maintain
  two separate themes, when there is not really a present need for two.
*/

const themeSpec = {
  palette: {
    common: {
      black: bodyText,
      gray: gray,
      white: white,
    },
    primary: {
      light: "#6693CA",
      main: primary,
      dark: "#003C6B",
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
    mealProgram: {
      main: mealProgram,
    },
    foodPantry: {
      main: foodPantry,
    },
    headingText: {
      main: headingText,
    },
    bodyText: {
      main: bodyText,
    },
    confirmed: {
      main: confirmed,
    },
    link: {
      light: linkHover,
      main: link,
      dark: linkVisited,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

themeSpec.typography = {
  fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
  h1: {
    fontWeight: 500,
    fontSize: "1.5rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "2.5rem",
    },
  },
  h2: {
    fontWeight: 500,
    fontSize: "1.375rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
  },
  h3: {
    fontWeight: 500,
    fontSize: "1.25rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.375rem",
    },
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.125rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.25rem",
    },
  },
  h5: {
    fontWeight: 500,
    fontSize: "1rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.125rem",
    },
  },
  h6: {
    fontWeight: 500,
    fontSize: "0.875rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: "0.875rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: "0.75rem",
    color: themeSpec.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1=0.875rem",
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "0.875rem",
    color: themeSpec.palette.bodyText.main,
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.75rem",
    color: themeSpec.palette.bodyText.main,
    "@media (min-width:600px)": {
      fontSize: ".875rem",
    },
  },
  button: {
    fontSize: "0.75rem",
    fontWeight: 500,
    "@media (min-width:600px)": {
      fontSize: ".875rem",
    },
  },
  overline: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    lineHeight: "18px",
  },
  caption: {
    fontSize: 12,
    lineHeight: "18px",
  },
};

themeSpec.components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        // This was necessary to overcome a glitch in the MuiTabs where
        // selecting the second tab removed horizontal padding.
        "&.MuiButtonBase-root": {
          padding: "0 0.5rem",
        },

        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: "outlined",
      size: "small",
      disableRipple: false,
      disableTouchRipple: false,
    },
    styleOverrides: {
      outlined: {
        borderColor: themeSpec.palette.primary.translucent,
        "&.Mui-focusVisible .MuiButton-outlined": {
          borderStyle: "solid",
          borderColor: themeSpec.palette.primary.main,
          borderWidth: "2px",
          borderRadius: "4px",
        },
        "&:hover": {
          color: "white",
          backgroundColor: themeSpec.palette.primary.main,
          opacity: "1",
          "&.MuiButton-outlined .Mui-disabled": {
            backgroundColor: "white",
            color: "#A0A0A0",
          },
        },
      },
    },
  },
  MuiCheckbox: {
    defaultProps: {
      size: "large",
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        color: themeSpec.palette.primary.main,
        "&.Mui-focusVisible .MuiSvgIcon-root": {
          borderStyle: "solid",
          borderColor: themeSpec.palette.primary.main,
          borderWidth: "2px",
          borderRadius: "4px",
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: link,
        "&:visited": {
          color: linkVisited,
        },
        "&:hover": {
          color: linkHover,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: bodyText,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeSmall: {
        fontSize: "15px",
        marginRight: "5px",
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        backgroundColor: themeSpec.palette.primary.main,
        color: "A0A0A0",

        "& .MuiTabs-indicator": {
          display: "flex",
          justifyContent: "center",
          backgroundColor: themeSpec.palette.secondary.main,
        },
        "& .MuiTabs-indicatorSpan": {
          maxWidth: 40,
          width: "100%",
          backgroundColor: themeSpec.palette.secondary.main,
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        backgroundColor: themeSpec.palette.primary.main,
        color: "#C0C0C0",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        "&:hover": {
          backgroundColor: themeSpec.palette.primary.light,
        },
        "&.Mui-selected": {
          color: themeSpec.palette.common.white,
          backgroundColor: themeSpec.palette.primary.dark,
        },
      },
    },
  },
};

const theme = createTheme(themeSpec);

export default theme;
