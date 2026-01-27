import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";
import { ProcessedAnnouncement, useAnnouncements } from "../../hooks/useAnnouncements";

type OpenIndexes = Record<number, boolean>;

const AnnouncementSnackbar = () => {
  const [openIndexes, setOpenIndexes] = useState<OpenIndexes>({});
  const { data: announcementsData } = useAnnouncements();

  const announcements: ProcessedAnnouncement[] = announcementsData || [];
  const enabledAnnouncements: ProcessedAnnouncement[] = announcements.filter(
    (announcement) => announcement.is_enabled
  );

  useEffect(() => {
    if (enabledAnnouncements.length > 0) {
      const initialOpen: OpenIndexes = {};
      enabledAnnouncements.forEach((_, idx) => {
        initialOpen[idx] =
          sessionStorage.getItem(`announcementSnackbarDismissed_${idx}`) !==
          "true";
      });
      setOpenIndexes(initialOpen);
    }
  }, [announcementsData]);

  if (!enabledAnnouncements.length) return null;

  return (
    <Box sx={{ width: "100%" }}>
      {enabledAnnouncements.map((announcement, idx) => (
        <Collapse in={openIndexes[idx]} key={announcement.announcementId}>
          <Alert
            severity={announcement.severity || "info"}
            sx={{ mb: 0, p: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenIndexes((prev) => ({ ...prev, [idx]: false }));
                  sessionStorage.setItem(
                    `announcementSnackbarDismissed_${idx}`,
                    "true"
                  );
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Typography variant="body1">{announcement.description}</Typography>
          </Alert>
        </Collapse>
      ))}
    </Box>
  );
};

export default AnnouncementSnackbar;
