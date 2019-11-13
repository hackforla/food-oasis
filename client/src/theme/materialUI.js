import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // green
      main:'rgba(144, 194, 70)',
      contrastText: '#ffffff'
    },
    secondary: {
      // orange
      main: 'rgb(249, 192, 88)',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#313233'
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
        '&:hover': {
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