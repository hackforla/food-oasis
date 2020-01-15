import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Search from 'components/Search';
import logo from 'images/fola.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    margin: '20px 0',
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    marginBottom: theme.spacing(3),
  },
  label: {
    textAlign: 'center',
    fontWeight: 600,
    marginTop: 10,
    padding: '0 100px',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#336699',
    padding: '10px 35px',
    color: '#fff',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  address: {
    marginTop: theme.spacing(1),
    paddingRight: 0,
  },
  inputRoot: {
    '&[class*="MuiOutlinedInput-root"]': {
      paddingRight: 0,
    },
  },
  endAdornment: {
    display: 'none',
  },
  submit: {
    height: '41px',
    minWidth: '25px',
    backgroundColor: '#BCE76D',
    borderRadius: '0 4px 4px 0',
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
  },
  logo: {
    width: 161,
    height: 'auto',
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Box className={classes.logoContainer}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Box>
        <Box className={classes.formContainer}>
          <form className={classes.form} noValidate>
            <Box className={classes.inputContainer}>
              <Search {...props} />
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
                startIcon={
                  <SearchIcon fontSize="large" className={classes.searchIcon} />
                }
                //href="/stakeholders"
              ></Button>
            </Box>
            <Typography className={classes.label}>
              Food Oasis has links to food pantries and meals in Los Angeles
            </Typography>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
