import { createTheme } from "@mui/material/styles";
import { headingText, bodyText } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#336699",
      translucent: "#33669980",
    },
    secondary: {
      main: "#f9c058",
      translucent: "#f9c05880",
    },
    error: {
      // red
      main: "#CC3333",
      contrastText: "#000000",
    },
    mealProgram: {
      main: "#E57109",
      translucent: "#E5710980",
    },
    foodPantry: {
      main: "#336699",
      translucent: "#33669980",
    },
    headingText: {
      main: headingText,
    },
    bodyText: {
      main: bodyText,
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
});

theme.typography = {
  fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
  h1: {
    fontWeight: 500,
    fontSize: "1.5rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "2.5rem",
    },
  },
  h2: {
    fontWeight: 500,
    fontSize: "1.375rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
  },
  h3: {
    fontWeight: 500,
    fontSize: "1.25rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.375rem",
    },
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.125rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.25rem",
    },
  },
  h5: {
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1.125rem",
    },
  },
  h6: {
    fontWeight: 500,
    fontSize: "0.875rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: "0.875rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: "0.75rem",
    color: theme.palette.headingText.main,
    "@media (min-width:600px)": {
      fontSize: "1=0.875rem",
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "0.875rem",
    color: theme.palette.bodyText.main,
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.75rem",
    color: theme.palette.bodyText.main,
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
};

theme.components = {
  // Name of the component
  MuiButton: {
    defaultProps: {
      // The props to change the default for.
      variant: "outlined",
      size: "small",
    },
    styleOverrides: {
      outlined: {
        borderColor: theme.palette.primary.translucent,
        "&:hover": {
          color: "white",
          backgroundColor: theme.palette.primary.main,
          opacity: "1",
        },
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "3px",
        margin: "0.5rem 0.5rem 0.5rem 0",
        fontStyle: "italic",
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: "#1976D2",
        "&:visited": {
          color: "#551A8B",
        },
        "&:hover": {
          opacity: 0.8,
        },
      },
    },
  },
};

// const theme = createTheme(
//   adaptV4Theme({
//     palette: {
//       primary: {
//         // blue
//         light: "#1976d2",
//         main: "#336699",
//
//         translucent: "#33669980",
//         contrastText: "#ffffff",
//       },
//       secondary: {
//         // orange
//         main: "#f9c058",
//         translucent: "#f9c05880",
//         contrastText: "#000000",
//       },
//       error: {
//         // red
//         main: "#CC3333",
//         contrastText: "#000000",
//       },
//       mealProgram: {
//         main: "#E57109",
//         translucent: "#E5710980",
//       },
//       foodPantry: {
//         main: "#336699",
//         translucent: "#33669980",
//       },
//       background: {
//         main: "white",
//       },
//     },
//     typography: {
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
//       h1: {
//         fontWeight: 500,
//         fontSize: 28,
//         "@media (min-width:600px)": {
//           fontSize: 36,
//         },
//       },
//       h2: {
//         fontWeight: 500,
//         fontSize: 24,
//         "@media (min-width:600px)": {
//           fontSize: 32,
//         },
//       },
//       body1: {
//         fontWeight: 400,
//         fontSize: 16,
//         "@media (min-width:600px)": {
//           fontSize: 18,
//         },
//       },
//     },
//     breakpoints: {
//       values: {
//         xs: 0,
//         sm: 600,
//         md: 960,
//         lg: 1280,
//         xl: 1920,
//       },
//     },
//   })
// );

// const { primary } = theme.palette;

// theme.overrides = {
//   MuiButton: {
//     outlined: {
//       border: `2px solid ${primary.main}`,
//       color: primary.main,
//       "&:hover": {
//         color: primary.contrastText,
//         backgroundColor: primary.main,
//       },
//     },
//   },
//   MuiLink: {
//     root: {
//       color: primary.light,
//       "&:visited": {
//         color: primary.main,
//       },
//     },
//     underlineHover: {
//       textDecoration: "none",
//       "&:hover": {
//         textDecoration: "underline",
//       },
//     },
//   },
//   MuiAppBar: {
//     root: {
//       backgroundColor: "#f1f1f1",
//     },
//   },
// };

export default theme;
