import React, { useEffect, useCallback } from "react";
import { withRouter } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import SearchBar from "components/FoodSeeker/SearchBar";
import { Button } from "../../components/UI";

// All the tenant logos happen to be the same for now
import logo from "images/foodoasis.svg";
import { defaultViewport } from "helpers/Configuration";
import * as analytics from "services/analytics";

const logoPaths = {
  1: require("images/foodoasis.svg"),
  2: require("images/foodoasis.svg"),
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none.png"),
};

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
    color: "#4D4D4D",
    textAlign: "center",
  },
  label: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: "0.5em",
    padding: "0 5vw",

    [theme.breakpoints.down("sm")]: {
      padding: "0 5vw",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0 8.5vw",
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
    // marginLeft: ".5em",
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
    width: "55%",
    height: "auto",
    textAlign: "center",
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  learnMore: {
    fontSize: "19px",
    color: "white",
    textDecoration: "underline",
    "&:visited": {
      color: "white",
    },
  },
  locationBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": {
      backgroundColor: "#439846",
    },
  },
}));

const Home = ({
  origin,
  setOrigin,
  userCoordinates,
  setUserCoordinates,
  match,
  history,
  tenantId,
  taglineText,
}) => {
  const classes = useStyles();

  useEffect(() => {
    analytics.postEvent("visitLandingPage");
  }, []);

  const useMyLocationTrigger = () => {
    let originCoordinates = { latitude: null, longitude: null };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            originCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setUserCoordinates(originCoordinates);
            // setBrowserLocation(true);
            // setOrigin(userCoordinates);
            selectLocation(originCoordinates);
          }
        },
        (error) => {
          // Ususally because user has blocked location
          console.error(`Getting browser location failed: ${error.message}`);
          originCoordinates = {
            latitude: defaultViewport.center.latitude,
            longitude: defaultViewport.center.longitude,
          };
          setUserCoordinates(null);
          // setBrowserLocation(false);
          selectLocation(originCoordinates);
        }
      );
    } else {
      console.error(
        "Browser does not support getting users location - using default location for area"
      );
      originCoordinates = {
        latitude: defaultViewport.center.latitude,
        longitude: defaultViewport.center.longitude,
      };
      setUserCoordinates(null);
      // setBrowserLocation(false);
      selectLocation(originCoordinates);
    }
    return originCoordinates;
  };

  useEffect(() => {
    if (match.path === "/") {
      sessionStorage.clear();
    }
  }, [match.path]);

  const selectLocation = useCallback(
    (origin) => {
      setOrigin(origin);
      history.push("/organizations");
    },
    [setOrigin, history]
  );

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Box className={classes.logoContainer}>
          <img
            src={logoPaths[tenantId] ? logoPaths[tenantId].default : logo}
            alt="logo"
            className={classes.logo}
          />
        </Box>
        <Box className={classes.formContainer}>
          <form
            className={classes.form}
            onSubmit={() => history.push("/organizations")}
          >
            <Typography>{taglineText}</Typography>
            <Box className={classes.inputContainer}>
              <SearchBar
                userCoordinates={userCoordinates}
                setOrigin={selectLocation}
                origin={origin}
                browserLocation={userCoordinates}
                showSearchIcon
              />
            </Box>
            <Box className={classes.inputContainer}>
              <>or</>
            </Box>
            <Box className={classes.inputContainer}>
              {/* <Search
                userCoordinates={userCoordinates}
                setOrigin={selectLocation}
                origin={origin}
                browserLocation={browserLocation}
              /> */}
              <Button
                icon="locationOn"
                iconPosition="start"
                className={classes.locationBtn}
                onClick={useMyLocationTrigger}
              >
                Use my current location
              </Button>
            </Box>
            <Box className={classes.inputContainer}>
              <Link
                component={RouterLink}
                to="/about"
                className={classes.learnMore}
              >
                Learn about this site
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default withRouter(Home);
