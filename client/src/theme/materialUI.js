import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // purple
      main: "#772f7a",
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
    fontFamily: '"Open Sans", sans-serif'
  },
  overrides: {
    MuiButton: {
      outlined: {
        backgroundColor: "#FAEBD7",
        margin: "10px"
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
        backgroundColor: "blanchedalmond"
      }
    }
  }
});

export default theme;
