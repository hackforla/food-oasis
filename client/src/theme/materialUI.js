import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // blue
      light: "#1976d2",
      main: "#336699",
      dark: "#0A3865",
      contrastText: "#ffffff",
    },
    secondary: {
      // orange
      main: "#f9c058",
      contrastText: "#000000",
    },
    error: {
      // red
      main: "#f94040",
      contrastText: "#000000",
    },
    text: {
      primary: "#313233",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
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
