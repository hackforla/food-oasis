import { useState, useEffect } from "react";
import { Alert, Box, Typography, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useAnnouncements } from "../../hooks/useAnnouncements";

const AnnouncementSnackbar = () => {
  const [openIndexes, setOpenIndexes] = useState({});
  const { data: announcementsData } = useAnnouncements();

  const enabledAnnouncements = (announcementsData || []).filter((a) => a.is_enabled);

  useEffect(() => {
    if (enabledAnnouncements.length > 0) {
      const initialOpen = {};
      enabledAnnouncements.forEach((_, idx) => {
        initialOpen[idx] = sessionStorage.getItem(`announcementSnackbarDismissed_${idx}`) !== "true";
      });
      setOpenIndexes(initialOpen);
    }
  }, [announcementsData]);

  if (!enabledAnnouncements.length) return null;

  return (
    <Box sx={{ width: "100%" }}>
      {enabledAnnouncements.map((announcement, idx) => (
        <Collapse in={openIndexes[idx]} key={announcement.id}>
          <Alert
            icon={false}
            severity="warning"
            sx={{ mb: 0, p: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenIndexes((prev) => ({ ...prev, [idx]: false }));
                  sessionStorage.setItem(`announcementSnackbarDismissed_${idx}`, "true");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Typography>{announcement.description}</Typography>
          </Alert>
        </Collapse>
      ))}
    </Box>
  );
};

export default AnnouncementSnackbar;
