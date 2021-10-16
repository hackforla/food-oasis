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
import {
  tenantId,
  tenantName,
  defaultViewport,
  tenantDetails,
} from "helpers/Configuration";
// import useGeolocation from "hooks/useGeolocation";
// Components
import { UserContext } from "contexts/user-context";
import { OriginCoordinatesContext } from "contexts/origin-coordinates-context";
import Toast from "components/UI/Toast";
import Header from "components/Layout/Header";
import HeaderHome from "components/Layout/HeaderHome";
import WidgetFooter from "components/Layout/WidgetFooter";
import VerificationAdmin from "components/Admin/VerificationAdmin";
import VerificationDashboard from "components/Admin/VerificationDashboard";
import SecurityAdminDashboard from "components/Account/SecurityAdminDashboard/SecurityAdminDashboard";
import OrganizationEdit from "components/Admin/OrganizationEdit";
import ParentOrganizations from "components/Admin/ParentOrganizations";
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
import DonateSB from "components/StaticPagesSB/Donate";
import AboutSB from "components/StaticPagesSB/About";
import FaqSB from "components/StaticPagesSB/Faq";

import Resources from "components/Layout/Resources";
import Register from "components/Account/Register";
import Login from "components/Account/Login";
import ForgotPassword from "components/Account/ForgotPassword";
import ResetPassword from "components/Account/ResetPassword";
import ConfirmEmail from "components/Account/ConfirmEmail";
import FaqEdit from "components/Faq/FaqEdit";
import FaqAdd from "components/Faq/FaqAdd";
import Home from "components/FoodSeeker/Home";
import SearchResults from "components/FoodSeeker/SearchResults";
import Suggestion from "components/FoodSeeker/Suggestion";
import ImportFile from "components/Admin/ImportOrganizations/ImportFile";
import adminTheme from "./theme/adminTheme";
import * as analytics from "../src/services/analytics";
import Suggestions from "components/Admin/Suggestions";

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
  organizationEditWrapper: {
    flexBasis: "90%",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
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
  verificationAdminWrapper: {
    flexBasis: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
});

function App() {
  const [user, setUser] = useState(null);

  // origin is where the map should be centered. It is at the App level
  // so it can be passed from landing pages to the SearchResults.
  const [origin, setOrigin] = useState(defaultViewport.center);

  // userCoordinates is the user's location if geolocation is enabled,
  // otherwise null.
  //const userCoordinates = useGeolocation();
  const [userCoordinates, setUserCoordinates] = useState(null);

  const [toast, setToast] = useState({ message: "" });
  const [bgImg, setBgImg] = useState(`url("/landing-page/bg-LA.jpeg")`);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    analytics.postEvent("visitAppComponent");
  }, []);

  useEffect(() => {
    const storedJson = sessionStorage.getItem("user");
    const userJson = JSON.stringify(user);
    if (!userJson && !storedJson) {
      return;
    } else if (userJson === storedJson) {
      return;
    } else {
      const user = JSON.parse(storedJson);
      if (user) {
        analytics.identify(user.id);
      }
      setUser(user);
    }
  }, [user]);

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
      <OriginCoordinatesContext.Provider value={origin}>
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
                  <HeaderHome
                    user={user}
                    setUser={onLogin}
                    setToast={setToast}
                  />
                </Route>
                <Route path="/widget"></Route>
                <Route>
                  <Header
                    tenantId={tenantId}
                    taglineText={tenantDetails.taglineText}
                    user={user}
                    setUser={onLogin}
                    setToast={setToast}
                  />
                </Route>
              </Switch>
              <Switch className={classes.mainContent}>
                <Route exact path="/">
                  <div
                    className={classes.homeWrapper}
                    style={{ backgroundImage: bgImg }}
                  >
                    <Home
                      userCoordinates={userCoordinates}
                      setUserCoordinates={setUserCoordinates}
                      origin={origin}
                      setOrigin={setOrigin}
                      tenantId={tenantId}
                      taglineText={tenantDetails.taglineText}
                    />
                  </div>
                </Route>
                {/*
              Following route provides backward-compatibilty for the
              http"//foodoasis.la/search Link that has been published at
              http://publichealth.lacounty.gov/eh/LACFRI/ShareAndDonate.htm
              */}
                <Redirect from="/search" to="/widget" />
                <Route path="/widget">
                  <>
                    <SearchResults
                      origin={origin}
                      setOrigin={setOrigin}
                      userCoordinates={userCoordinates}
                      setToast={setToast}
                      taglineText={tenantDetails.taglineText}
                    />
                    <WidgetFooter tenantId={tenantId} />
                  </>
                </Route>
                <Route path="/organizations">
                  <SearchResults
                    origin={origin}
                    setOrigin={setOrigin}
                    userCoordinates={userCoordinates}
                    setToast={setToast}
                    taglineText={tenantDetails.taglineText}
                  />
                </Route>
                <Route path="/suggestion">
                  <Suggestion setToast={setToast} />
                </Route>
                <Route path="/organizationedit/:id?">
                  <ThemeProvider theme={adminTheme}>
                    <div className={classes.organizationEditWrapper}>
                      <OrganizationEdit setToast={setToast} user={user} />
                    </div>
                  </ThemeProvider>
                </Route>
                <Route path="/verificationdashboard">
                  <div className={classes.verificationAdminWrapper}>
                    <VerificationDashboard
                      user={user}
                      userCoordinates={userCoordinates}
                      origin={origin}
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
                <Route path="/parentorganizations">
                  <div className={classes.organizationEditWrapper}>
                    <ParentOrganizations setToast={setToast} user={user} />
                  </div>
                </Route>
                <Route path="/suggestions">
                  <div className={classes.organizationEditWrapper}>
                    <Suggestions setToast={setToast} user={user} />
                  </div>
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
                  <ImportFile
                    user={user}
                    setToast={setToast}
                    tenantId={tenantId}
                    tenantName={tenantName}
                  />
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
                  {tenantId === 6 ? (
                    <DonateSB />
                  ) : tenantId === 5 ? (
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
                  {tenantId === 6 ? (
                    <AboutSB />
                  ) : tenantId === 5 ? (
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
                  {tenantId === 6 ? (
                    <FaqSB />
                  ) : tenantId === 5 ? (
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
      </OriginCoordinatesContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
