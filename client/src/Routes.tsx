import { CircularProgress, Grid, Stack } from "@mui/material";
import Home from "components/FoodSeeker/Home";
import Header from "components/Layout/Header";
import WidgetFooter from "components/Layout/WidgetFooter";
import { Suspense, lazy, type ReactNode } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Fallback from "./components/Fallback";
import PrivateRoute from "./components/PrivateRoute";
import Toast from "components/UI/Toast";
import { useWidget } from "./appReducer";
import useFeatureFlag from "./hooks/useFeatureFlag";
import SurveySnackbar from "./components/UI/SurveySnackbar";
import AnnouncementSnackbar from "components/UI/AnnouncementSnackbar";
import ScrollToTop from "./components/ScrollToTop";
import type { UserRoleKey } from "./types/userRoles";

const VerificationAdmin = lazy(
  () => import("components/Admin/VerificationAdmin")
);
const VerificationDashboard = lazy(
  () => import("components/Admin/VerificationDashboard")
);
const SecurityAdminDashboard = lazy(
  () =>
    import(
      "components/Account/SecurityAdminDashboard/SecurityAdminDashboard"
    )
);
const OrganizationEdit = lazy(
  () => import("components/Admin/OrganizationEdit")
);
const ParentOrganizations = lazy(
  () => import("components/Admin/ParentOrganizations")
);
const TagAdmin = lazy(() => import("components/Admin/TagAdmin"));
const Register = lazy(() => import("components/Account/Register"));
const Login = lazy(() => import("components/Account/Login"));
const ForgotPassword = lazy(() => import("components/Account/ForgotPassword"));
const ResetPasswordEmailSent = lazy(
  () => import("components/Account/ResetPasswordEmailSent")
);
const ResetPassword = lazy(() => import("components/Account/ResetPassword"));
const ConfirmEmail = lazy(() => import("components/Account/ConfirmEmail"));
const SearchResults = lazy(
  () => import("components/FoodSeeker/SearchResults/SearchResults")
);
const ImportFile = lazy(
  () => import("components/Admin/ImportOrganizations/ImportFile")
);
const Suggestions = lazy(() => import("components/Admin/Suggestions"));
const Logins = lazy(() => import("components/Admin/Logins"));
const Donate = lazy(() => import("./components/Donate"));
const About = lazy(() => import("./components/About"));
const Faq = lazy(() => import("./components/Faq"));
const Contact = lazy(() => import("./components/StaticPages/Contact"));
const MuiDemo = lazy(() => import("./components/MuiDemo/MuiDemo"));
const Features = lazy(() => import("components/Admin/Features"));
const Profile = lazy(() => import("components/Account/Profile"));
const Suggestion = lazy(() => import("components/FoodSeeker/Suggestion"));
const Announcements = lazy(() => import("./components/Admin/Announcements"));

interface PrivateRouteElementProps {
  roles: UserRoleKey[];
  children: ReactNode;
}

function PrivateRouteElement({ roles, children }: PrivateRouteElementProps) {
  return <PrivateRoute roles={roles}>{children}</PrivateRoute>;
}

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
          {/* React Router v6+ matches paths exactly by default (legacy `exact` prop removed) */}
          <Route path="faqs" element={<Faq />} />
          <Route path="contact" element={<Contact />} />

          {/* Admin routes */}
          <Route path="admin" element={<AdminWrapper />}>
            <Route path="profile/:id" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm/:token" element={<ConfirmEmail />} />
            <Route path="login/:email?" element={<Login />} />
            <Route path="forgotpassword/:email?" element={<ForgotPassword />} />
            <Route
              path="resetpasswordemailsent/:email?"
              element={<ResetPasswordEmailSent />}
            />
            <Route path="resetPassword/:token" element={<ResetPassword />} />

            <Route
              path="organizationedit"
              element={
                <PrivateRouteElement
                  roles={["isAdmin", "isDataEntry", "isCoordinator"]}
                >
                  <OrganizationEdit />
                </PrivateRouteElement>
              }
            />
            <Route
              path="organizationedit/:id"
              element={
                <PrivateRouteElement
                  roles={["isAdmin", "isDataEntry", "isCoordinator"]}
                >
                  <OrganizationEdit />
                </PrivateRouteElement>
              }
            />
            <Route path="muidemo" element={<MuiDemo />} />
            <Route
              path="verificationdashboard"
              element={
                <PrivateRouteElement
                  roles={["isAdmin", "isDataEntry", "isCoordinator"]}
                >
                  <VerificationDashboard />
                </PrivateRouteElement>
              }
            />
            <Route
              path="verificationadmin"
              element={
                <PrivateRouteElement roles={["isAdmin", "isCoordinator"]}>
                  <VerificationAdmin />
                </PrivateRouteElement>
              }
            />
            <Route
              path="parentorganizations"
              element={
                <PrivateRouteElement roles={["isAdmin"]}>
                  <ParentOrganizations />
                </PrivateRouteElement>
              }
            />
            <Route
              path="tags"
              element={
                <PrivateRouteElement roles={["isAdmin"]}>
                  <TagAdmin />
                </PrivateRouteElement>
              }
            />
            <Route
              path="suggestions"
              element={
                <PrivateRouteElement roles={["isAdmin"]}>
                  <Suggestions />
                </PrivateRouteElement>
              }
            />
            <Route
              path="logins"
              element={
                <PrivateRouteElement roles={["isAdmin", "isCoordinator"]}>
                  <Logins />
                </PrivateRouteElement>
              }
            />
            <Route
              path="features"
              element={
                <PrivateRouteElement roles={["isAdmin"]}>
                  <Features />
                </PrivateRouteElement>
              }
            />
            <Route
              path="announcements"
              element={
                <PrivateRouteElement roles={["isAdmin"]}>
                  <Announcements />
                </PrivateRouteElement>
              }
            />
            <Route
              path="securityadmindashboard"
              element={
                <PrivateRouteElement
                  roles={["isGlobalAdmin", "isSecurityAdmin"]}
                >
                  <SecurityAdminDashboard />
                </PrivateRouteElement>
              }
            />
            <Route
              path="organizationimport"
              element={
                <PrivateRouteElement roles={["isAdmin"]}>
                  <ImportFile />
                </PrivateRouteElement>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/fallback" replace />} />
        </Route>
        <Route path="fallback" element={<Fallback />} />
      </Routes>
    </Suspense>
  );
}

const ALERT_LOCATIONS = ["/widget", "/", "/organizations"];

function AppWrapper() {
  const isWidget = useWidget();
  const { pathname } = useLocation();
  const isAlertLocation = ALERT_LOCATIONS.includes(pathname);

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignContent="stretch"
      spacing={0}
      id="app-container"
      sx={{
        color: "black",
        backgroundColor: "#fff",
        margin: "0",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <ScrollToTop />
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
