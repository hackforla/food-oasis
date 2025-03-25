import { useState } from "react";
import { Alert } from "@mui/material";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "./StandardButton";
import { alertCloseIcon } from "theme/palette";

const AlertSurveySnackbar = () => {
  const [open, setOpen] = useState(() => {
    const isClosed = sessionStorage.getItem("alertSnackbarClosed");
    return isClosed !== "true";
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    sessionStorage.setItem("alertSnackbarClosed", "true");
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 700 }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiSnackbar-root": {
            width: "100%",
          },
        }}
      >
        <Alert
          severity="warning"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center", transform: "translateY(1px)" }}
          >
            Due to the LA Fires, some information may be out-of-date.{" "}
            <IconButton
              icon="close"
              sx={{
                color: alertCloseIcon,
              }}
              onClick={handleClose}
            />
          </Stack>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AlertSurveySnackbar;
