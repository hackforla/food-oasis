import { createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      // blue
      light: "#1976d2",
      main: "#336699",
      dark: "#0A3865",
      translucent: "#33669980",
      contrastText: "#ffffff",
    },
    secondary: {
      // orange
      main: "#f9c058",
      translucent: "#f9c05880",
      contrastText: "#000000",
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
    background: {
      main: "white",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
    h1: {
      fontWeight: 500,
      fontSize: 28,
      "@media (min-width:600px)": {
        fontSize: 36,
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: 24,
      "@media (min-width:600px)": {
        fontSize: 32,
      },
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      "@media (min-width:600px)": {
        fontSize: 18,
      },
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

const { primary } = theme.palette;

theme.overrides = {
  MuiButton: {
    outlined: {
      border: `2px solid ${primary.main}`,
      color: primary.main,
      "&:hover": {
        color: primary.contrastText,
        backgroundColor: primary.main,
      },
    },
  },
  MuiLink: {
    root: {
      color: primary.light,
      "&:visited": {
        color: primary.main,
      },
    },
    underlineHover: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  MuiAppBar: {
    root: {
      backgroundColor: "#f1f1f1",
    },
  },
};

export default theme;
