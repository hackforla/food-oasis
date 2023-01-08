import React from "react";
import { useHistory } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import { Button } from "../../components/UI";
// All the tenant logos happen to be the same for now
import logo from "images/foodoasis.svg";
import * as analytics from "services/analytics";
import { useSiteContext } from "../../contexts/siteContext";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";
import CircularProgress from "@mui/material/CircularProgress";

const logoPaths = {
  1: require("images/foodoasis.svg"),
  2: require("images/foodoasis.svg"),
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none.png"),
};

const useStyles = makeStyles((theme) => ({
  homeWrapper: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: 'url("/landing-page/map.png")', // replaced the background image style inside useStyles instead of inline styling
    minHeight: "max(100.7vh,20em)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  container: {
    maxWidth: "650px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      height: "100%",
    },
  },
  paper: {
    margin: "0 auto",
    padding: "1.5rem 0.5rem 3rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "24px",
    boxShadow: "0px 5px 8px 0px rgb(0, 0, 0, 40%)",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      borderRadius: "0",
      paddingTop: "10rem",
      justifyContent: "start",
      boxShadow: "none",
    },
  },
  logoContainer: {
    margin: "30px 0 0px 0",
    textAlign: "center",
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    marginTop: theme.spacing(1),
    fontWeight: "500",
    fontSize: "18.72px",
    marginBottom: "0.5em",
    color: "#000000",
    textAlign: "center",
  },
  label: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: "0.5em",
    padding: "0 5vw",

    [theme.breakpoints.down("md")]: {
      padding: "0 5vw",
    },
    [theme.breakpoints.down("lg")]: {
      padding: "0 8.5vw",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formContainer: {
    width: "100%",
    padding: "5px 15px 15px 15px",
    color: "#000000",
    [theme.breakpoints.up("sm")]: {
      paddingInline: "90px",
    },
  },
  inputContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "1em",
    color: "#4D4D4D",
    fontSize: "16px",
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
    width: "60%",
    height: "auto",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  learnMore: {
    fontSize: "16px",
    color: "#4D4D4D",
    textDecoration: "underline",
    textUnderlineOffset: "8px",
    "&:visited": {
      color: "#4D4D4D",
    },
    "&:hover": {
      color: "#31C658",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "19px",
    },
  },
  locationBtn: {
    backgroundColor: "#336699",
    color: "white",
    letterSpacing: "1px",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#0A3865",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const { tenantId, tenantDetails } = useSiteContext();
  const { taglineText } = tenantDetails;
  const [bgImg, setBgImg] = React.useState(`url("/landing-page/bg-LA.jpeg")`);
  const { getUserLocation, isLoading: isGettingLocation } = useGeolocation();
  const [error, setError] = React.useState("");
  const locationPermission = useLocationPermission();

  React.useEffect(() => {
    if (error && locationPermission === "granted") {
      setError("");
    }
  }, [error, locationPermission]);

  React.useEffect(() => {
    switch (tenantId) {
      case 2:
        setBgImg(`url("/landing-page/bg-LA.jpeg")`);
        break;
      case 3:
        setBgImg(`url("/landing-page/bg-HI.jpeg")`);
        break;
      case 5:
        setBgImg(`url("/landing-page/bg-TX.jpeg")`);
        break;
      case 6:
        setBgImg(`url("/landing-page/bg-LA.jpeg")`);
        break;
      default:
        setBgImg(`url("/landing-page/bg-LA.jpeg")`);
        return;
    }
  }, [tenantId]);

  React.useEffect(() => {
    analytics.postEvent("visitLandingPage");
  }, []);

  const useMyLocationTrigger = async () => {
    try {
      await getUserLocation();
    } catch (e) {
      console.log({ e });
      setError(e);
    }
  };

  return (
    <div className={classes.homeWrapper} style={{ backgroundImage: bgImg }}>
      <Container component="main" className={classes.container}>
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
              <Typography className={classes.subtitle}>
                {taglineText}
              </Typography>
              <Box className={classes.inputContainer}>
                <AddressDropDown />
              </Box>
              <Box className={classes.inputContainer}>or</Box>
              <Box className={classes.inputContainer}>
                {isGettingLocation ? (
                  <CircularProgress />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Tooltip
                      title={
                        locationPermission === "denied" || !!error
                          ? "Please allow location access"
                          : "Use my current location"
                      }
                    >
                      <div>
                        <Button
                          icon="locationOn"
                          className={classes.locationBtn}
                          onClick={useMyLocationTrigger}
                          disabled={locationPermission === "denied" || !!error}
                        >
                          Use my current location
                        </Button>
                      </div>
                    </Tooltip>
                  </div>
                )}
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
    </div>
  );
};

export default Home;
