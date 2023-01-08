import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, CssBaseline } from "@mui/material";
import theme from "theme/clientTheme";
// import adminTheme from "./theme/adminTheme";
// Components
import { ToasterProvider } from "contexts/toasterContext";
import { UserProvider } from "contexts/userContext";
import Toast from "components/UI/Toast";
import Header from "components/Layout/Header";
import HeaderHome from "components/Layout/HeaderHome";
import WidgetFooter from "components/Layout/WidgetFooter";
import Home from "components/FoodSeeker/Home";

import * as analytics from "../src/services/analytics";
import PrivateRoute from "./components/PrivateRoute";
import Fallback from "./components/Fallback";
import { AppStateProvider } from "./appReducer";
import { SiteProvider } from "contexts/siteContext";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";
import { CircularProgress } from "@material-ui/core";

const VerificationAdmin = React.lazy(() =>
  import("components/Admin/VerificationAdmin")
);
const VerificationDashboard = React.lazy(() =>
  import("components/Admin/VerificationDashboard")
);
const SecurityAdminDashboard = React.lazy(() =>
  import("components/Account/SecurityAdminDashboard/SecurityAdminDashboard")
);
const OrganizationEdit = React.lazy(() =>
  import("components/Admin/OrganizationEdit")
);
const ParentOrganizations = React.lazy(() =>
  import("components/Admin/ParentOrganizations")
);
const TagAdmin = React.lazy(() => import("components/Admin/TagAdmin"));
const Resources = React.lazy(() => import("components/Layout/Resources"));
const Register = React.lazy(() => import("components/Account/Register"));
const Login = React.lazy(() => import("components/Account/Login"));
const ForgotPassword = React.lazy(() =>
  import("components/Account/ForgotPassword")
);
const ResetPasswordEmailSent = React.lazy(() =>
  import("components/Account/ResetPasswordEmailSent")
);
const ResetPassword = React.lazy(() =>
  import("components/Account/ResetPassword")
);
const ConfirmEmail = React.lazy(() =>
  import("components/Account/ConfirmEmail")
);
const SearchResults = React.lazy(() =>
  import("components/FoodSeeker/SearchResults/SearchResults")
);
const Suggestion = React.lazy(() => import("components/FoodSeeker/Suggestion"));
const ImportFile = React.lazy(() =>
  import("components/Admin/ImportOrganizations/ImportFile")
);
const Suggestions = React.lazy(() => import("components/Admin/Suggestions"));
const Logins = React.lazy(() => import("components/Admin/Logins"));
const Donate = React.lazy(() => import("./components/Donate"));
const About = React.lazy(() => import("./components/About"));
const Faq = React.lazy(() => import("./components/Faq"));

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
      <CssBaseline />
      <AppStateProvider>
        <SiteProvider>
          <ToasterProvider>
            <UserProvider>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
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
                        <Route>
                          <Header />
                        </Route>
                      </Switch>
                      <React.Suspense fallback={<CircularProgress />}>
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
                              <div className={classes.organizationEditWrapper}>
                                <OrganizationEdit />
                              </div>
                            </StyledEngineProvider>
                          </Route>
                          <Route path="/verificationdashboard">
                            <StyledEngineProvider injectFirst>
                              {/* <ThemeProvider theme={adminTheme}> */}
                              <div className={classes.verificationAdminWrapper}>
                                <VerificationDashboard />
                              </div>
                              {/* </ThemeProvider> */}
                            </StyledEngineProvider>
                          </Route>
                          <PrivateRoute
                            path="/verificationadmin"
                            roles={["isAdmin", "isCoordinator"]}
                          >
                            <StyledEngineProvider injectFirst>
                              {/* <ThemeProvider theme={adminTheme}> */}
                              <div className={classes.verificationAdminWrapper}>
                                <VerificationAdmin />
                              </div>
                              {/* </ThemeProvider> */}
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
                      </React.Suspense>
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
