import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // purple
      // main: "#772f7a",
      main: "#336699",
      contrastText: "#ffffff"
    },
    secondary: {
      // orange
      main: "rgb(249, 192, 88)",
      contrastText: "#000000"
    },
    error: {
      main: "rgb(249, 64, 64)",
      contrastText: "#000000"
    },
    text: {
      primary: "#313233"
    }
  },
  typography: {
    fontFamily: '"Verdana", "Helvetica Neue", Helvetica, sans-serif;'
  },
  overrides: {
    MuiButton: {
      outlined: {
        margin: "10px",
        border: "2px solid #772f7a",
        color: "#772f7a",
        "&:hover": {
          color: "hsl(298, 44%, 96%)",
          backgroundColor: "#772f7a"
        }
      }
    },
    MuiLink: {
      root: {
        color: "#1976d2",
        "&:visited": {
          color: "#772f7a"
        }
      },
      underlineHover: {
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline"
        }
      }
    },
    MuiAppBar: {
      root: {
        backgroundColor: "rgb(241, 241, 241)"
      }
    }
  }
});

export default theme;
