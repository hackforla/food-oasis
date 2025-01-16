import { useEffect, useState } from "react";
import { CssBaseline, Alert, Snackbar, Stack } from "@mui/material";
import SurveySnackbar from "./components/UI/SurveySnackbar";
import { SiteProvider } from "./contexts/siteContext";
import { ToasterProvider } from "contexts/toasterContext";
import { UserProvider } from "contexts/userContext";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "theme";
import * as analytics from "./services/analytics";
import { AppStateProvider } from "./appReducer";
import SEO from "./components/SEO";
import AppRoutes from "./Routes";
import { MapProvider } from "react-map-gl";
import useFeatureFlag from "./hooks/useFeatureFlag";

function App() {
  const hasUserFeedbackSuveyFeatureFlag = useFeatureFlag("userFeedbackSurvey");

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
                <MapProvider>
                  <Router>
                    <LAFireWarning />

                    <AppRoutes />
                    {hasUserFeedbackSuveyFeatureFlag && <SurveySnackbar />}
                  </Router>
                </MapProvider>
              </ThemeProvider>
            </UserProvider>
          </ToasterProvider>
        </SiteProvider>
      </AppStateProvider>
    </HelmetProvider>
  );
}

export default App;

function LAFireWarning() {
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  return (
    <Stack spacing={2} sx={{ maxWidth: 700 }}>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Due to the LA Fires (Jan 2025), some information may be out-of-date.
        </Alert>
      </Snackbar>
    </Stack>
  );
}
