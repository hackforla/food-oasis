import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // green
      //main: "rgba(144, 194, 70)",
      main: "#FAEBD7",
      contrastText: "#000000"
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
