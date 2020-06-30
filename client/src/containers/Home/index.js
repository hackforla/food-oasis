import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Search from "components/Search";
import logo from "images/fola.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  paper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "24px",
  },
  logoContainer: {
    margin: "20px 0 10px 0",
    textAlign: "center",
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    marginTop: theme.spacing(1),
    fontWeight: "500",
    fontSize: "20px",
    marginBottom: ".25em",
    color: "darygray",
  },
  label: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: "0.5em",
    padding: "0 5vw",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#336699",
    padding: "10px 35px",
    borderRadius: "24px",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      padding: "15px",
    },
  },
  inputContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "1em",
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
    display: "none",
  },
  submit: {
    height: "40px",
    minWidth: "25px",
    backgroundColor: "#BCE76D",
    borderRadius: "0 6px 6px 0",
    marginLeft: ".5em",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
    "&.Mui-disabled": {
      backgroundColor: "#BCE76D",
      opacity: 0.8,
    },
    "&:hover": {
      backgroundColor: "#C7F573",
      boxShadow: "none",
    },
  },
  logo: {
    width: 161,
    height: "auto",
    textAlign: "center",
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { origin, setOrigin, userCoordinates } = props;

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Box className={classes.logoContainer}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Typography className={classes.subtitle}>
            Your free food directory in Los Angeles
          </Typography>
        </Box>
        <Box className={classes.formContainer}>
          <form
            className={classes.form}
            onSubmit={() => props.history.push("/organizations")}
          >
            <Typography variant={"h5"} className={classes.label}>
              Locate free food resources in Los Angeles
            </Typography>
            <Box className={classes.inputContainer}>
              <Search
                userCoordinates={userCoordinates}
                setOrigin={setOrigin}
                origin={origin}
              />
              <Button
                type="submit"
                disabled={!origin}
                variant="contained"
                className={classes.submit}
                startIcon={
                  <SearchIcon fontSize="large" className={classes.searchIcon} />
                }
              >
                {""}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default withRouter(Home);
