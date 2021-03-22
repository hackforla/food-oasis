import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Grid, CssBaseline } from "@material-ui/core";
import theme from "theme/clientTheme";
import { logout } from "services/account-service";
import { tenantId, defaultCoordinates } from "helpers/Configuration";

// Components
import { UserContext } from "contexts/user-context";
import Toast from "components/UI/Toast";
import Header from "components/Layout/Header";
import HeaderHome from "components/Layout/HeaderHome";
import VerificationAdmin from "components/Admin/VerificationAdmin";
import VerificationDashboard from "components/Admin/VerificationDashboard";
import SecurityAdminDashboard from "components/Account/SecurityAdminDashboard/SecurityAdminDashboard";
import OrganizationEdit from "components/Admin/OrganizationEdit";
import Donate from "components/StaticPages/Donate";
import About from "components/StaticPages/About";
import Faq from "components/StaticPages/Faq";
import DonateCA from "components/StaticPagesCA/Donate";
import AboutCA from "components/StaticPagesCA/About";
import FaqCA from "components/StaticPagesCA/Faq";
import DonateHI from "components/StaticPagesHI/Donate";
import AboutHI from "components/StaticPagesHI/About";
import FaqHI from "components/StaticPagesHI/Faq";
import DonatePDX from "components/StaticPagesPDX/Donate";
import AboutPDX from "components/StaticPagesPDX/About";
import FaqPDX from "components/StaticPagesPDX/Faq";
import DonateMCK from "components/StaticPagesMCK/Donate";
import AboutMCK from "components/StaticPagesMCK/About";
import FaqMCK from "components/StaticPagesMCK/Faq";
import Resources from "components/Layout/Resources";
import Register from "components/Account/Register";
import Login from "components/Account/Login";
import ForgotPassword from "components/Account/ForgotPassword";
import ResetPassword from "components/Account/ResetPassword";
import ConfirmEmail from "components/Account/ConfirmEmail";
import FaqEdit from "components/Faq/FaqEdit";
import FaqAdd from "components/Faq/FaqAdd";
import Home from "components/FoodSeeker/Home";
import Results from "components/FoodSeeker/ResultsContainer";
import Suggestion from "components/FoodSeeker/Suggestion";
import ImportFile from "components/Admin/ImportOrganizations/ImportFile";
import adminTheme from "./theme/adminTheme";

const useStyles = makeStyles({
  app: () => ({
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

  const [browserLocation, setBrowserLocation] = useState(false);

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
  }, [user]);

  useEffect(() => {
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
              setBrowserLocation(true);
            }
          },
          (error) => {
            // Ususally because user has blocked location
            console.log(`Getting browser location failed: ${error.message}`);
            const userCoordinates = {
              latitude: defaultCoordinates.lat,
              longitude: defaultCoordinates.lon,
            };
            setUserCoordinates(userCoordinates);
            setBrowserLocation(false);
          }
        );
      } else {
        console.log(
          "Browser does not support getting users location - using default location for area"
        );
        const userCoordinates = {
          latitude: defaultCoordinates.lat,
          longitude: defaultCoordinates.lon,
        };
        setUserCoordinates(userCoordinates);
        setBrowserLocation(false);
      }

      return userCoordinates;
    };
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

  const classes = useStyles();

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            alignContent="stretch"
            spacing={0}
            classes={{
              container: classes.app,
            }}
          >
            <Switch>
              <Route exact path="/">
                <HeaderHome user={user} setUser={onLogin} setToast={setToast} />
              </Route>
              <Route>
                <Header user={user} setUser={onLogin} setToast={setToast} />
              </Route>
            </Switch>
            <Switch className={classes.mainContent}>
              <Route exact path="/">
                <div
                  className={classes.homeWrapper}
                  style={{ backgroundImage: bgImg }}
                >
                  <div
                    className={classes.homeWrapper}
                    style={{ backgroundImage: bgImg }}
                  >
                    <Home
                      userCoordinates={userCoordinates}
                      origin={origin}
                      setOrigin={setOrigin}
                      browserLocation={browserLocation}
                    />
                  </div>
                </div>
              </Route>
              {/*
              Following route provides backward-compatibilty for the
              http"//foodoasis.la/search Link that has been published at
              http://publichealth.lacounty.gov/eh/LACFRI/ShareAndDonate.htm
              */}
              <Redirect from="/search" to="/organizations" />
              <Route path="/organizations">
                <Results
                  userCoordinates={userCoordinates}
                  origin={origin}
                  setOrigin={setOrigin}
                  setToast={setToast}
                  browserLocation={browserLocation}
                />
              </Route>
              <Route path="/suggestion">
                <Suggestion setToast={setToast} />
              </Route>
              <Route path="/organizationedit/:id?">
                <ThemeProvider theme={adminTheme}>
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
                <ThemeProvider theme={adminTheme}>
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
              <Route path="/organizationimport">
                <ImportFile user={user} setToast={setToast} />
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
                {tenantId === 5 ? (
                  <DonateMCK />
                ) : tenantId === 4 ? (
                  <DonatePDX />
                ) : tenantId === 3 ? (
                  <DonateHI />
                ) : tenantId === 2 ? (
                  <DonateCA />
                ) : (
                  <Donate />
                )}
              </Route>
              <Route path="/about">
                {tenantId === 5 ? (
                  <AboutMCK />
                ) : tenantId === 4 ? (
                  <AboutPDX />
                ) : tenantId === 3 ? (
                  <AboutHI />
                ) : tenantId === 2 ? (
                  <AboutCA />
                ) : (
                  <About />
                )}
              </Route>
              <Route exact path="/faqs">
                {tenantId === 5 ? (
                  <FaqMCK />
                ) : tenantId === 4 ? (
                  <FaqPDX />
                ) : tenantId === 3 ? (
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
