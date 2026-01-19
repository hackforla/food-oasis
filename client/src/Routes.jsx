import { CircularProgress, Grid, Stack } from "@mui/material";
import Home from "components/FoodSeeker/Home";
import Header from "components/Layout/Header";
import WidgetFooter from "components/Layout/WidgetFooter";
import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Fallback from "./components/Fallback";
import PrivateRoute from "./components/PrivateRoute";
import Toast from "components/UI/Toast";
import { useWidget } from "./appReducer";
import useFeatureFlag from "./hooks/useFeatureFlag";
import SurveySnackbar from "./components/UI/SurveySnackbar";
import AnnouncementSnackbar from "components/UI/AnnouncementSnackbar";

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
const Profile = lazy(() => import("./components/Account/Profile"));
const Suggestion = lazy(() => import("components/FoodSeeker/Suggestion"));
const Announcements = lazy(() => import("./components/Admin/Announcements"));

export default function AppRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  const hasUserFeedbackSuveyFeatureFlag = useFeatureFlag("userFeedbackSurvey");
  const isAdminRoute = pathname.startsWith("/admin");
  const isWidgetRoute = pathname.startsWith("/widget");
  const isUserFacingRoute = !isAdminRoute && !isWidgetRoute;

  const showSurveySnackbar =
    hasUserFeedbackSuveyFeatureFlag && isUserFacingRoute;

  return (
    <Suspense
      fallback={
        <Stack justifyContent="center" alignContent="center" flexWrap="wrap">
          <CircularProgress />
        </Stack>
      }
    >
      {showSurveySnackbar && <SurveySnackbar />}

      <Routes>
        <Route path="/" element={<AppWrapper />}>
          {/* Food seeker routes */}
          <Route index element={<Home />} />

          {/*
          Following route provides backward-compatibilty for the
          http"//foodoasis.la/search Link that has been published at
          http://publichealth.lacounty.gov/eh/LACFRI/donate-surplus-food.htm
          */}
          <Route path="search" element={<Navigate to="/widget" />} />
          <Route
            path="widget"
            element={
              <>
                <SearchResults />
                <WidgetFooter />
              </>
            }
          />

          <Route path="organizations" element={<SearchResults />} />
          <Route path="suggestion" element={<Suggestion />} />
          <Route path="donate" element={<Donate />} />
          <Route path="about" element={<About />} />
          <Route exact path="faqs" element={<Faq />} />
          <Route exact path="contact" element={<Contact />} />

          {/* Admin routes */}
          <Route path="admin" element={<AdminWrapper />}>
            <Route path="profile/:id" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm/:token" element={<ConfirmEmail />} />
            <Route path="login/:email?" element={<Login />} />
            <Route path="forgotpassword/:email?" element={<ForgotPassword />} />
            <Route
              path="resetpasswordemailsent"
              element={<ResetPasswordEmailSent />}
            />
            <Route
              path="resetpasswordemailsent/:email?"
              element={<ResetPasswordEmailSent />}
            />
            <Route path="resetPassword/:token" element={<ResetPassword />} />

            <Route
              path="organizationedit/:id"
              element={
                <PrivateRoute
                  roles={["isAdmin", "isDataEntry", "isCoordinator"]}
                >
                  <OrganizationEdit />
                </PrivateRoute>
              }
            />
            <Route path="muidemo" element={<MuiDemo />} />
            <Route
              path="verificationdashboard"
              element={
                <PrivateRoute
                  roles={["isAdmin", "isDataEntry", "isCoordinator"]}
                >
                  <VerificationDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="verificationadmin"
              element={
                <PrivateRoute roles={["isAdmin", "isCoordinator"]}>
                  <VerificationAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="parentorganizations"
              element={
                <PrivateRoute roles={["isAdmin"]}>
                  <ParentOrganizations />
                </PrivateRoute>
              }
            />
            <Route
              path="tags"
              element={
                <PrivateRoute roles={["isAdmin"]}>
                  <TagAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="suggestions"
              element={
                <PrivateRoute roles={["isAdmin"]}>
                  <Suggestions />
                </PrivateRoute>
              }
            />
            <Route
              path="logins"
              roles={["isAdmin", "isCoordinator"]}
              element={
                <PrivateRoute roles={["isAdmin", "isCoordinator"]}>
                  <Logins />
                </PrivateRoute>
              }
            />
            <Route
              path="features"
              element={
                <PrivateRoute roles={["isAdmin"]}>
                  <Features />
                </PrivateRoute>
              }
            />
            <Route
              path="announcements"
              element={
                <PrivateRoute roles={["isAdmin"]}>
                  <Announcements />
                </PrivateRoute>
              }
            />
            <Route
              path="securityadmindashboard"
              element={
                <PrivateRoute roles={["isGlobalAdmin", "isSecurityAdmin"]}>
                  <SecurityAdminDashboard />
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
          </Route>
          <Route path="*" element={<Navigate to="/fallback" replace />} />
        </Route>
        <Route exact path="fallback" element={<Fallback />} />
      </Routes>
    </Suspense>
  );
}

function AppWrapper() {
  const isWidget = useWidget();
  const alertLocations = ["/widget", "/", "/organizations"];
  const isAlertLocation = alertLocations.includes(useLocation().pathname);

  return (
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
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      {isAlertLocation && <AnnouncementSnackbar />}

      {isWidget ? null : <Header />}
      <Outlet />
      <Toast />
    </Grid>
  );
}

function AdminWrapper() {
  return (
    <>
      <Outlet />
    </>
  );
}
