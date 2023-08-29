import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import { Button } from "@mui/material";
import * as analytics from "services/analytics";
import { useSiteContext } from "../../contexts/siteContext";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";
import CircularProgress from "@mui/material/CircularProgress";
import { LocationOn } from "@mui/icons-material";

const logoPaths = {
  1: require("images/foodoasis.svg").default,
  2: require("images/foodoasis.svg").default,
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none.png"),
  4: require("images/foodoasis.svg").default,
  5: require("images/foodoasis.svg").default,
  6: require("images/foodoasis.svg").default,
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
    padding: "3.5rem 0.5rem 3rem 0.5rem",
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
  subtitle: {
    marginTop: theme.spacing(1),
    fontWeight: "500",
    fontSize: "18.72px",
    marginBottom: "0.5em",
    textAlign: "center",
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
    fontSize: "16px",
  },
  endAdornment: {
    display: "none",
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
    [theme.breakpoints.up("sm")]: {
      fontSize: "19px",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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
          <img src={logoPaths[tenantId]} alt="logo" className={classes.logo} />
          <Box className={classes.formContainer}>
            <form
              className={classes.form}
              onSubmit={() => navigate("/organizations")}
            >
              <Typography variant="h2" className={classes.subtitle}>
                {taglineText}
              </Typography>
              <Box className={classes.inputContainer}>
                <AddressDropDown />
              </Box>
              <Box className={classes.inputContainer}>or</Box>
              <Box className={classes.inputContainer}>
                {isGettingLocation ? (
                  <Stack justifyContent="center" alignContent="center">
                    <CircularProgress />
                  </Stack>
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
                          variant="contained"
                          startIcon={<LocationOn />}
                          // className={classes.locationBtn}
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
