import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "theme";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, CssBaseline, Stack } from "@mui/material";
import { ToasterProvider } from "contexts/toasterContext";
import { UserProvider } from "contexts/userContext";
import Toast from "components/UI/Toast";
import Header from "components/Layout/Header";
import HeaderHome from "components/Layout/HeaderHome";
import WidgetFooter from "components/Layout/WidgetFooter";
import Home from "components/FoodSeeker/Home";
import Profile from "./components/Account/Profile";
import * as analytics from "../src/services/analytics";
import PrivateRoute from "./components/PrivateRoute";
import Fallback from "./components/Fallback";
import { AppStateProvider } from "./appReducer";
import { SiteProvider } from "contexts/siteContext";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";
import CircularProgress from "@mui/material/CircularProgress";
import Suggestion from "components/FoodSeeker/Suggestion";

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
const ImportFile = React.lazy(() =>
  import("components/Admin/ImportOrganizations/ImportFile")
);
const Suggestions = React.lazy(() => import("components/Admin/Suggestions"));
const Logins = React.lazy(() => import("components/Admin/Logins"));
const Donate = React.lazy(() => import("./components/Donate"));
const About = React.lazy(() => import("./components/About"));
const Faq = React.lazy(() => import("./components/Faq"));
const Contact = React.lazy(() => import("./components/StaticPages/Contact"));
const MuiDemo = React.lazy(() => import("./components/MuiDemo/MuiDemo"));
const useStyles = makeStyles({
  app: () => ({
    color: "black",
    backgroundColor: "#fff",
    margin: "0",
    height: "100%",
    overflowX: 'hidden',
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
              <ThemeProvider>
                <SEO
                  title={`Food Oasis`}
                  url={window.origin}
                  description="Food Oasis is a non-profit, volunteer-run directory of free food resources in the Los Angeles area."
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
                    <Routes>
                      <Route path="/" element={<HeaderHome />} />
                      {/*
                        When app is embedded as a widget on another site, don't
                        show any header
                      */}
                      {/* <Route exact path="/widget" /> */}
                      <Route path="/*" element={<Header />} />
                    </Routes>
                    <React.Suspense
                      fallback={
                        <Stack
                          justifyContent="center"
                          alignContent="center"
                          flexWrap="wrap"
                        >
                          <CircularProgress />
                        </Stack>
                      }
                    >
                      <Routes className={classes.mainContent}>
                        <Route exact path="/" element={<Home />} />
                        {/*
                Following route provides backward-compatibilty for the
                http"//foodoasis.la/search Link that has been published at
                http://publichealth.lacounty.gov/eh/LACFRI/donate-surplus-food.htm
                */}
                        <Route
                          path="search"
                          element={<Navigate to="/widget" />}
                        />
                        <Route
                          path="widget"
                          element={
                            <>
                              <SearchResults />
                              <WidgetFooter />
                            </>
                          }
                        />
                        <Route
                          path="organizations"
                          element={<SearchResults />}
                        />
                        <Route path="suggestion" element={<Suggestion />} />
                        <Route path="logins" element={<Logins />} />
                        <Route path="profile/:id" element={<Profile />} />
                        <Route
                          path="organizationedit/:id?"
                          element={
                            <div className={classes.organizationEditWrapper}>
                              <OrganizationEdit />
                            </div>
                          }
                        />
                        <Route
                          path="muidemo"
                          element={
                            <div className={classes.organizationEditWrapper}>
                              <MuiDemo />
                            </div>
                          }
                        />

                        <Route
                          path="verificationdashboard"
                          element={
                            <PrivateRoute
                              roles={[
                                "isAdmin",
                                "isDataEntry",
                                "isCoordinator",
                              ]}
                            >
                              <div className={classes.verificationAdminWrapper}>
                                <VerificationDashboard />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="verificationadmin"
                          element={
                            <PrivateRoute roles={["isAdmin", "isCoordinator"]}>
                              <div className={classes.verificationAdminWrapper}>
                                <VerificationAdmin />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="parentorganizations"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div className={classes.organizationEditWrapper}>
                                <ParentOrganizations />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="tags"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div className={classes.organizationEditWrapper}>
                                <TagAdmin />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="suggestions"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div className={classes.organizationEditWrapper}>
                                <Suggestions />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="logins"
                          roles={["isAdmin", "isCoordinator"]}
                          element={
                            <PrivateRoute roles={["isAdmin", "isCoordinator"]}>
                              <div className={classes.organizationEditWrapper}>
                                <Logins />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="securityadmindashboard"
                          element={
                            <PrivateRoute
                              roles={["isGlobalAdmin", "isSecurityAdmin"]}
                            >
                              <div className={classes.verificationAdminWrapper}>
                                <SecurityAdminDashboard />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="organizationimport"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <ImportFile />
                            </PrivateRoute>
                          }
                        />
                        <Route path="register" element={<Register />} />
                        <Route
                          path="confirm/:token"
                          element={<ConfirmEmail />}
                        />
                        <Route path="login/:email?" element={<Login />} />
                        <Route
                          path="forgotpassword/:email?"
                          element={<ForgotPassword />}
                        />
                        <Route
                          path="resetpasswordemailsent/:email?"
                          element={<ResetPasswordEmailSent />}
                        />
                        <Route
                          path="resetPassword/:token"
                          element={<ResetPassword />}
                        />
                        <Route path="donate" element={<Donate />} />
                        <Route path="about" element={<About />} />
                        <Route exact path="faqs" element={<Faq />} />
                        <Route exact path="contact" element={<Contact />} />
                        <Route exact path="fallback" element={<Fallback />} />
                      </Routes>
                    </React.Suspense>
                    <Toast />
                  </Grid>
                </Router>
              </ThemeProvider>
            </UserProvider>
          </ToasterProvider>
        </SiteProvider>
      </AppStateProvider>
    </HelmetProvider>
  );
}

export default App;
