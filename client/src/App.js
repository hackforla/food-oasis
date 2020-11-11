import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import theme from "theme/materialUI";
import { logout } from "services/account-service";
import { tenantId, defaultCoordinates } from "helpers/Configuration";

// Components
import { UserContext } from "components/user-context";
import Toast from "components/Toast";
import Header from "components/Header";
import VerificationAdmin from "components/Verification/VerificationAdmin";
import VerificationDashboard from "components/Verification/VerificationDashboard";
import SecurityAdminDashboard from "components/SecurityAdminDashboard/SecurityAdminDashboard";
import OrganizationEdit from "components/Verification/OrganizationEdit";
import Donate from "components/StaticPages/Donate";
import About from "components/StaticPages/About";
import Faq from "components/StaticPages/Faq";
import DonateCA from "components/StaticPagesCA/Donate";
import AboutCA from "components/StaticPagesCA/About";
import FaqCA from "components/StaticPagesCA/Faq";
import DonateHI from "components/StaticPagesHI/Donate";
import AboutHI from "components/StaticPagesHI/About";
import FaqHI from "components/StaticPagesHI/Faq";
import Resources from "components/Resources";
import Register from "components/Register";
import Login from "components/Login";
import ForgotPassword from "components/ForgotPassword";
import ResetPassword from "components/ResetPassword";
import ConfirmEmail from "components/ConfirmEmail";
import FaqEdit from "components/FaqEdit";
import FaqAdd from "components/FaqAdd";
import Home from "containers/Home";
import Results from "components/Results/ResultsContainer";
import Suggestion from "components/Suggestion";
import newTheme from "./theme/newTheme";

const useStyles = makeStyles({
  app: (props) => ({
    color: "black",
    margin: "0",
    height: "100%",
    //overflowY: "scroll",
  }),
  mainContent: {
    margin: "0",
    paddingBottom: "50px",
    overflowY: "scroll",
    flexGrow: 1,
  },
  OrganizationEditWrapper: {
    flexBasis: "90%",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  homeWrapper: {
    backgroundSize: "cover",
    minHeight: "max(100.7vh,20em)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  verificationAdminWrapper: {
    flexBasis: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState({});
  const [toast, setToast] = useState({ message: "" });
  const [bgImg, setBgImg] = useState("");
  const [origin, setOrigin] = useState({
    latitude: defaultCoordinates.lat,
    longitude: defaultCoordinates.lon,
  });

  useEffect(() => {
    const imgNum = Math.floor(Math.random() * (21 - 1)) + 1;
    const backgroundImage = `url("/landing-page/${imgNum}.jpg")`;
    setBgImg(backgroundImage);
  }, []);

  useEffect(() => {
    const storedJson = sessionStorage.getItem("user");
    const userJson = JSON.stringify(user);
    if (!userJson && !storedJson) {
      return;
    } else if (userJson === storedJson) {
      return;
    } else {
      setUser(JSON.parse(storedJson));
    }
  }, [user, userCoordinates]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const onLogin = (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
      logout();
    }
    setUser(user);
  };

  const fetchLocation = () => {
    let userCoordinates = { latitude: null, longitude: null };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            const userCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setUserCoordinates(userCoordinates);
          }
        },
        (error) => {
          console.log(`Getting browser location failed: ${error.message}`);
          const userCoordinates = {
            latitude: defaultCoordinates.lat,
            longitude: defaultCoordinates.lon,
          };
          setUserCoordinates(userCoordinates);
        }
      );
    } else {
      // If browser location permission is denied, the request is
      // "successful", but the result is null coordinates.
      console.log("Enable location permission to use location-based features.");
    }

    return userCoordinates;
  };

  const classes = useStyles();

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <Router>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            alignContent="stretch"
            //justify="stretch"
            spacing={0}
            classes={{
              container: classes.app,
            }}
          >
            <Header user={user} setUser={onLogin} setToast={setToast} />
            <Switch className={classes.mainContent}>
              <Route exact path="/">
                <div
                  className={classes.homeWrapper}
                  style={{ backgroundImage: bgImg }}
                >
                  <Home
                    userCoordinates={userCoordinates}
                    origin={origin}
                    setOrigin={setOrigin}
                  />
                </div>
              </Route>
              <Route path="/organizations">
                <Results
                  userCoordinates={userCoordinates}
                  origin={origin}
                  setOrigin={setOrigin}
                  setToast={setToast}
                />
              </Route>
              <Route path="/suggestion">
                <Suggestion setToast={setToast} />
              </Route>
              <Route path="/organizationedit/:id?">
                <ThemeProvider theme={newTheme}>
                  <div className={classes.OrganizationEditWrapper}>
                    <OrganizationEdit setToast={setToast} user={user} />
                  </div>
                </ThemeProvider>
              </Route>
              <Route path="/verificationdashboard">
                <div className={classes.verificationAdminWrapper}>
                  <VerificationDashboard
                    user={user}
                    userCoordinates={userCoordinates}
                  />
                </div>
              </Route>
              <Route path="/verificationadmin">
                <ThemeProvider theme={newTheme}>
                  <div className={classes.verificationAdminWrapper}>
                    <VerificationAdmin
                      user={user}
                      userCoordinates={userCoordinates}
                    />
                  </div>
                </ThemeProvider>
              </Route>
              <Route path="/securityadmindashboard">
                <div className={classes.verificationAdminWrapper}>
                  <SecurityAdminDashboard
                    user={user}
                    userCoordinates={userCoordinates}
                  />
                </div>
              </Route>
              <Route path="/faqs/add">
                <FaqAdd />
              </Route>
              <Route path="/faqs/:identifier">
                <FaqEdit setToast={setToast} />
              </Route>
              <Route path="/resources">
                <Resources />
              </Route>
              <Route path="/register">
                <Register setToast={setToast} />
              </Route>
              <Route path="/confirm/:token">
                <ConfirmEmail setToast={setToast} />
              </Route>
              <Route path="/login/:email?">
                <Login user={user} setUser={onLogin} setToast={setToast} />
              </Route>
              <Route path="/forgotpassword/:email?">
                <ForgotPassword setToast={setToast} />
              </Route>
              <Route path="/resetPassword/:token">
                <ResetPassword setToast={setToast} />
              </Route>
              <Route path="/donate">
                {tenantId === 3 ? (
                  <DonateHI />
                ) : tenantId === 2 ? (
                  <DonateCA />
                ) : (
                  <Donate />
                )}
              </Route>
              <Route path="/about">
                {tenantId === 3 ? (
                  <AboutHI />
                ) : tenantId === 2 ? (
                  <AboutCA />
                ) : (
                  <About />
                )}
              </Route>
              <Route exact path="/faqs">
                {tenantId === 3 ? (
                  <FaqHI />
                ) : tenantId === 2 ? (
                  <FaqCA />
                ) : (
                  <Faq />
                )}
              </Route>
            </Switch>
            <Toast toast={toast} setToast={setToast} />
          </Grid>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
