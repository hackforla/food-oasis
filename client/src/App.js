import { CircularProgress, CssBaseline, Grid, Stack } from "@mui/material";
import Home from "components/FoodSeeker/Home";
import Suggestion from "components/FoodSeeker/Suggestion";
import Header from "components/Layout/Header";
import HeaderHome from "components/Layout/HeaderHome";
import WidgetFooter from "components/Layout/WidgetFooter";
import Toast from "components/UI/Toast";
import { SiteProvider } from "contexts/siteContext";
import { ToasterProvider } from "contexts/toasterContext";
import { UserProvider } from "contexts/userContext";
import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "theme";
import * as analytics from "../src/services/analytics";
import { AppStateProvider } from "./appReducer";
import Profile from "./components/Account/Profile";
import Fallback from "./components/Fallback";
import PrivateRoute from "./components/PrivateRoute";
import SEO from "./components/SEO";

const VerificationAdmin = lazy(() =>
  import("components/Admin/VerificationAdmin")
);
const VerificationDashboard = lazy(() =>
  import("components/Admin/VerificationDashboard")
);
const SecurityAdminDashboard = lazy(() =>
  import("components/Account/SecurityAdminDashboard/SecurityAdminDashboard")
);
const OrganizationEdit = lazy(() =>
  import("components/Admin/OrganizationEdit")
);
const ParentOrganizations = lazy(() =>
  import("components/Admin/ParentOrganizations")
);
const TagAdmin = lazy(() => import("components/Admin/TagAdmin"));
const Register = lazy(() => import("components/Account/Register"));
const Login = lazy(() => import("components/Account/Login"));
const ForgotPassword = lazy(() => import("components/Account/ForgotPassword"));
const ResetPasswordEmailSent = lazy(() =>
  import("components/Account/ResetPasswordEmailSent")
);
const ResetPassword = lazy(() => import("components/Account/ResetPassword"));
const ConfirmEmail = lazy(() => import("components/Account/ConfirmEmail"));
const SearchResults = lazy(() =>
  import("components/FoodSeeker/SearchResults/SearchResults")
);
const ImportFile = lazy(() =>
  import("components/Admin/ImportOrganizations/ImportFile")
);
const Suggestions = lazy(() => import("components/Admin/Suggestions"));
const Logins = lazy(() => import("components/Admin/Logins"));
const Donate = lazy(() => import("./components/Donate"));
const About = lazy(() => import("./components/About"));
const Faq = lazy(() => import("./components/Faq"));
const Contact = lazy(() => import("./components/StaticPages/Contact"));
const MuiDemo = lazy(() => import("./components/MuiDemo/MuiDemo"));
const Features = lazy(() => import("./components/Admin/Features"));

function App() {
  useEffect(() => {
    analytics.postEvent("visitAppComponent");
  }, []);

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
                    sx={{
                      color: "black",
                      backgroundColor: "#fff",
                      margin: "0",
                      height: "100%",
                      overflowX: "hidden",
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
                    <Suspense
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
                      <Routes>
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
                            <div
                              style={{
                                flexBasis: "90%",
                                paddingTop: "1em",
                                paddingBottom: "1em",
                              }}
                            >
                              <OrganizationEdit />
                            </div>
                          }
                        />
                        <Route
                          path="muidemo"
                          element={
                            <div
                              style={{
                                flexBasis: "90%",
                                paddingTop: "1em",
                                paddingBottom: "1em",
                              }}
                            >
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
                              <div
                                style={{
                                  flexBasis: "100%",
                                  flexGrow: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <VerificationDashboard />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="verificationadmin"
                          element={
                            <PrivateRoute roles={["isAdmin", "isCoordinator"]}>
                              <div
                                style={{
                                  flexBasis: "100%",
                                  flexGrow: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <VerificationAdmin />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="parentorganizations"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div
                                style={{
                                  flexBasis: "90%",
                                  paddingTop: "1em",
                                  paddingBottom: "1em",
                                }}
                              >
                                <ParentOrganizations />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="tags"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div
                                style={{
                                  flexBasis: "90%",
                                  paddingTop: "1em",
                                  paddingBottom: "1em",
                                }}
                              >
                                <TagAdmin />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="suggestions"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div
                                style={{
                                  flexBasis: "90%",
                                  paddingTop: "1em",
                                  paddingBottom: "1em",
                                }}
                              >
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
                              <div
                                style={{
                                  flexBasis: "90%",
                                  paddingTop: "1em",
                                  paddingBottom: "1em",
                                }}
                              >
                                <Logins />
                              </div>
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="features"
                          element={
                            <PrivateRoute roles={["isAdmin"]}>
                              <div
                                style={{
                                  flexBasis: "90%",
                                  paddingTop: "1em",
                                  paddingBottom: "1em",
                                }}
                              >
                                <Features />
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
                              <div
                                style={{
                                  flexBasis: "100%",
                                  flexGrow: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
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
                    </Suspense>
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
