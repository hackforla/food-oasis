import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, CssBaseline } from "@mui/material";
import theme from "theme/clientTheme";
// Components
import { ToasterProvider } from "contexts/toasterContext";
import { UserProvider } from "contexts/userContext";
import Toast from "components/UI/Toast";
import Header from "components/Layout/Header";
import HeaderHome from "components/Layout/HeaderHome";
import WidgetFooter from "components/Layout/WidgetFooter";
import VerificationAdmin from "components/Admin/VerificationAdmin";
import VerificationDashboard from "components/Admin/VerificationDashboard";
import SecurityAdminDashboard from "components/Account/SecurityAdminDashboard/SecurityAdminDashboard";
import OrganizationEdit from "components/Admin/OrganizationEdit";
import ParentOrganizations from "components/Admin/ParentOrganizations";
import TagAdmin from "components/Admin/TagAdmin";
import Resources from "components/Layout/Resources";
import Register from "components/Account/Register";
import Login from "components/Account/Login";
import ForgotPassword from "components/Account/ForgotPassword";
import ResetPasswordEmailSent from "components/Account/ResetPasswordEmailSent";
import ResetPassword from "components/Account/ResetPassword";
import ConfirmEmail from "components/Account/ConfirmEmail";
import Home from "components/FoodSeeker/Home";
import SearchResults from "components/FoodSeeker/SearchResults/SearchResults";
import Suggestion from "components/FoodSeeker/Suggestion";
import ImportFile from "components/Admin/ImportOrganizations/ImportFile";
import adminTheme from "./theme/adminTheme";
import * as analytics from "../src/services/analytics";
import Suggestions from "components/Admin/Suggestions";
import Logins from "components/Admin/Logins";
import PrivateRoute from "./components/PrivateRoute";
import Fallback from "./components/Fallback";
import Donate from "./components/Donate";
import About from "./components/About";
import Faq from "./components/Faq";
import { AppStateProvider } from "./appReducer";
import { SiteProvider } from "contexts/siteContext";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";

const useStyles = makeStyles({
  app: () => ({
    color: "black",
    backgroundColor: "#fff",
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
  useEffect(() => {
    analytics.postEvent("visitAppComponent");
  }, []);

  const classes = useStyles();

  return (
<HelmetProvider>
    <AppStateProvider>
      <SiteProvider>
        <ToasterProvider>
          <UserProvider>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SEO
                  title={`Food Oasis`}
                  url={window.origin}
                  description="Food Oasis is an application that helps eliminate food waste by connecting donors and food outlets."
                />
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
                        <HeaderHome />
                      </Route>
                      <Route path="/widget"></Route>
                      <Route>
                        <Header />
                      </Route>
                    </Switch>
                    <Switch className={classes.mainContent}>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      {/*
                Following route provides backward-compatibilty for the
                http"//foodoasis.la/search Link that has been published at
                http://publichealth.lacounty.gov/eh/LACFRI/ShareAndDonate.htm
                */}
                      <Redirect from="/search" to="/widget" />
                      <Route path="/widget">
                        <>
                          <SearchResults />
                          <WidgetFooter />
                        </>
                      </Route>
                      <Route path="/organizations">
                        <SearchResults />
                      </Route>
                      <Route path="/suggestion">
                        <Suggestion />
                      </Route>
                      <Route path="/logins">
                        <Logins />
                      </Route>
                      <Route path="/organizationedit/:id?">
                        <StyledEngineProvider injectFirst>
                          <ThemeProvider theme={adminTheme}>
                            <div className={classes.organizationEditWrapper}>
                              <OrganizationEdit />
                            </div>
                          </ThemeProvider>
                        </StyledEngineProvider>
                      </Route>
                      <Route path="/verificationdashboard">
                        <div className={classes.verificationAdminWrapper}>
                          <VerificationDashboard />
                        </div>
                      </Route>
                      <PrivateRoute
                        path="/verificationadmin"
                        roles={["isAdmin", "isCoordinator"]}
                      >
                        <StyledEngineProvider injectFirst>
                          <ThemeProvider theme={adminTheme}>
                            <div className={classes.verificationAdminWrapper}>
                              <VerificationAdmin />
                            </div>
                          </ThemeProvider>
                        </StyledEngineProvider>
                      </PrivateRoute>
                      <PrivateRoute
                        path="/parentorganizations"
                        roles={["isAdmin"]}
                      >
                        <div className={classes.organizationEditWrapper}>
                          <ParentOrganizations />
                        </div>
                      </PrivateRoute>
                      <PrivateRoute path="/tags" roles={["isAdmin"]}>
                        <div className={classes.organizationEditWrapper}>
                          <TagAdmin />
                        </div>
                      </PrivateRoute>
                      <PrivateRoute path="/suggestions" roles={["isAdmin"]}>
                        <div className={classes.organizationEditWrapper}>
                          <Suggestions />
                        </div>
                      </PrivateRoute>
                      <PrivateRoute
                        path="/logins"
                        roles={["isAdmin", "isCoordinator"]}
                      >
                        {" "}
                        <div className={classes.organizationEditWrapper}>
                          <Logins />
                        </div>
                      </PrivateRoute>
                      <PrivateRoute
                        path="/securityadmindashboard"
                        roles={["isGlobalAdmin", "isSecurityAdmin"]}
                      >
                        <div className={classes.verificationAdminWrapper}>
                          <SecurityAdminDashboard />
                        </div>
                      </PrivateRoute>
                      <PrivateRoute
                        path="/organizationimport"
                        roles={["isAdmin"]}
                      >
                        <ImportFile />
                      </PrivateRoute>
                      <Route path="/resources">
                        <Resources />
                      </Route>
                      <Route path="/register">
                        <Register />
                      </Route>
                      <Route path="/confirm/:token">
                        <ConfirmEmail />
                      </Route>
                      <Route path="/login/:email?">
                        <Login />
                      </Route>
                      <Route path="/forgotpassword/:email?">
                        <ForgotPassword />
                      </Route>
                      <Route path="/resetpasswordemailsent/:email?">
                        <ResetPasswordEmailSent />
                      </Route>
                      <Route path="/resetPassword/:token">
                        <ResetPassword />
                      </Route>
                      <Route path="/donate">
                        <Donate />
                      </Route>
                      <Route path="/about">
                        <About />
                      </Route>
                      <Route exact path="/faqs">
                        <Faq />
                      </Route>
                      <Route exact path="/fallback">
                        <Fallback />
                      </Route>
                    </Switch>
                    <Toast />
                  </Grid>
                </Router>
              </ThemeProvider>
            </StyledEngineProvider>
          </UserProvider>
        </ToasterProvider>
      </SiteProvider>
    </AppStateProvider>
    </HelmetProvider>
  );
}

export default App;
