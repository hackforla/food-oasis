import { CssBaseline, Snackbar } from "@mui/material";
import SurveySnackbar from "./components/UI/SurveySnackbar";
import { SiteProvider } from "contexts/siteContext";
import { ToasterProvider } from "contexts/toasterContext";
import { UserProvider } from "contexts/userContext";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "theme";
import * as analytics from "../src/services/analytics";
import { AppStateProvider } from "./appReducer";
import SEO from "./components/SEO";
import AppRoutes from "./Routes";
import { MapProvider } from "react-map-gl";

function App() {
  useEffect(() => {
    analytics.postEvent("visitAppComponent");
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
                    <AppRoutes />
                    <SurveySnackbar
                      open={snackbarOpen}
                      autoHideDuration={6000}
                      onClose={handleCloseSnackbar}
                      message={snackbarMessage}
                    />
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
