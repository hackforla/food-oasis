import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(144, 194, 70)', // green
    },
    secondary: {
      main: 'rgb(249, 192, 88)', // orange
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#313233'
    }
  },
  typography: {
    fontFamily: '"Reem Kufi", sans-serif'
  },
  overrides: {
    MuiTypography: {
      "h1, h2, h3, h5": {
        fontFamily: '"Reem Kufi", sans-serif'
      }
    }
  }
});

// Typography components

export default theme;