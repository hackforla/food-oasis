import { useState, useEffect } from "react";
import { Alert, Box, Typography, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useAnnouncements } from "../../hooks/useAnnouncements";

const AnnouncementSnackbar = () => {
  const [open, setOpen] = useState(() => {
    const hasBeenDismissed = sessionStorage.getItem(
      "announcementSnackbarDismissed"
    );
    return hasBeenDismissed !== "true";
  });

  const { data: announcementsData } = useAnnouncements();
  const [enabledAnnouncement, setEnabledAnnouncement] = useState(null);

  useEffect(() => {
    if (announcementsData) {
      // Find the first enabled announcement (or change logic as needed)
      const enabled = announcementsData.find((a) => a.is_enabled);
      setEnabledAnnouncement(enabled);
    }
  }, [announcementsData]);

  // If no enabled announcement, don't show the snackbar
  if (!enabledAnnouncement) return null;

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
          <Typography>{enabledAnnouncement.description}</Typography>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AnnouncementSnackbar;
