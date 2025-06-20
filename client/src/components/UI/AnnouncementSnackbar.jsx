import { useState } from "react";
import { Alert, Box, Typography, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";

import CloseIcon from "@mui/icons-material/Close";

const AnnouncementSnackbar = () => {
  const [open, setOpen] = useState(() => {
    const hasBeenDismissed = sessionStorage.getItem(
      "announcementSnackbarDismissed"
    );
    return hasBeenDismissed !== "true";
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                sessionStorage.setItem("announcementSnackbarDismissed", "true");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography>
            Due to the LA Fires, some information may be out-of-date.{" "}
          </Typography>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AnnouncementSnackbar;
