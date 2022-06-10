import React from "react";
import { useHistory } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import { Button } from "../../components/UI";
import { RotateLoader } from "react-spinners";
// All the tenant logos happen to be the same for now
import logo from "images/foodoasis.svg";
import * as analytics from "services/analytics";
import { useSiteContext } from "../../contexts/siteContext";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";

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
  },
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
    width: "30%",
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
    "&:hover": {
      color: "#BCE76D",
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
                <AddressDropDown />
              </Box>
              <Box className={classes.inputContainer}>or</Box>
              <Box className={classes.inputContainer}>
                {isGettingLocation ? (
                  <RotateLoader sizeUnit="px" size={15} color="green" loading />
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
                          iconPosition="start"
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
