import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // purple
      main: "#772f7a",
      contrastText: "#ffffff",
    },
    secondary: {
      // orange
      main: "rgb(249, 192, 88)",
      contrastText: "#000000",
    },
    error: {
      main: "rgb(249, 64, 64)",
      contrastText: "#000000",
    },
    text: {
      primary: "#313233",
    },
  },
  typography: {
    fontFamily: '"Reem Kufi", "Helvetica Neue", Helvetica, sans-serif;',
  },
  overrides: {
    MuiButton: {
      outlined: {
        margin: "10px",
        border: "1px solid #772f7a",
        boxShadow: "0px 0px 10px 2px hsl(298, 44%, 87%)",
        "&:hover": {
          backgroundColor: "hsl(298, 44%, 96%)",
        },
      },
    },
    MuiLink: {
      root: {
        color: "#1976d2",
        "&:visited": {
          color: "#772f7a",
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
        backgroundColor: "rgb(241, 241, 241)",
      },
    },
  },
});

export default theme;
