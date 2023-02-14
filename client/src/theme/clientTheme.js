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
  inactiveButton,
  link,
  linkVisited,
  linkHover,
} from "./colors";

const themeSpec = {
  palette: {
    contrastThreshold: 4.5,
    common: {
      black: bodyText,
      gray: gray,
      white: white,
      disabled: "#A0A0A0",
<<<<<<< HEAD
      inactiveButton,
=======
>>>>>>> origin/develop
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
      // contrastText: "#000000",
    },
    link: {
      light: linkHover,
      main: link,
      dark: linkVisited,
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
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
    h1: {
      fontWeight: 500,
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: "1.375rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.375rem",
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.125rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      "@media (min-width:600px)": {
        fontSize: "1.125rem",
      },
    },
    h6: {
      fontWeight: 500,
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "0.75rem",
      "@media (min-width:600px)": {
        fontSize: "1=0.875rem",
      },
    },
    body1: {
      fontWeight: 400,
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.75rem",
      "@media (min-width:600px)": {
        fontSize: ".875rem",
      },
    },

    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
  },
};

themeSpec.components = {
  MuiTypography: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.variant === "body1" || ownerState.variant === "body2"
          ? { color: theme.palette.bodyText.main }
          : { color: theme.palette.headingText.main }),
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
  },
  MuiListItemButton: {
    defaultProps: {
      backgroundColor: "#FFA000",
      color: "blue",
    },
  },
  MuiButton: {
    defaultProps: {
      variant: "outlined",
<<<<<<< HEAD
    },
=======
      size: "small",
      disableRipple: false,
      disableTouchRipple: false,
    },
    // styleOverrides: {
    //   outlined: {
    //     borderColor: themeSpec.palette.primary.translucent,
    //     "&.Mui-focusVisible .MuiButton-outlined": {
    //       borderStyle: "solid",
    //       borderColor: themeSpec.palette.primary.main,
    //       borderWidth: "2px",
    //       borderRadius: "4px",
    //     },
    //     "&:hover": {
    //       color: themeSpec.palette.common.white,
    //       backgroundColor: themeSpec.palette.primary.main,
    //       opacity: "1",
    //       "&.MuiButton-outlined .Mui-disabled": {
    //         // backgroundColor: "white",
    //         color: "#A0A0A0",
    //       },
    //     },
    //   },
    // },
>>>>>>> origin/develop
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
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeSmall: {
        fontSize: "15px",
        marginRight: "5px",
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        color: themeSpec.palette.common.white,
        backgroundColor: themeSpec.palette.primary.main,
        borderRadius: "3px",
        margin: "0.5rem 0.5rem 0.5rem 0",
        fontStyle: "italic",
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
