import * as React from "react";
import { useState } from "react";
import { Button, Link, Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { IconButton } from "./StandardButton";
import useBreakpoints from "hooks/useBreakpoints";

const SurveySnackbar = () => {
  const [open, setOpen] = useState(() => {
    const isClosed = localStorage.getItem("surveySnackbarClosed");
    if (isClosed === "true") {
      return false;
    }

    // show snackbar after a day if closed with X button
    const lastClosed = Number(
      localStorage.getItem("surveySnackbarClosedTimeStamp")
    );
    const hoursSinceClosed = (Date.now() - lastClosed) / (1000 * 60 * 60);

    if (isNaN(lastClosed) || hoursSinceClosed >= 24) {
      return true;
    }
    return false;
  });
  const { isMobile } = useBreakpoints();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem("surveySnackbarClosed", "true");
  };

  const handleCloseButton = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem(
      "surveySnackbarClosedTimeStamp",
      new Date().getTime().toString()
    );
  };

  const openForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdAhi_nMKQfWVHjfpl1ZkmymBTt8BW7YNqVIOJ4JKYgSL4O3g/viewform",
      "_blank"
    );
    handleClose();
  };

  const action = (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        alignItems: { xs: "end", md: "center" },
        justifyContent: "end",
        width: { xs: "100%" },
        gap: { xs: 3, md: 8 },
      }}
    >
      <Stack direction="row" gap="10px">
        <Box>
          <Typography
            variant="body1"
            component={"p"}
            sx={{ fontWeight: "700" }}
          >
            Help us improve!{" "}
          </Typography>
          <Typography variant="body1">
            Have a minute to take a quick survey?
          </Typography>
        </Box>
        <Box>
          <IconButton
            icon="close"
            sx={(theme) => ({
              color: theme.palette.bodyText.main,
              display: { xs: "flex", md: "none" },
              transform: "translate(10px, -10px)",
            })}
            onClick={handleCloseButton}
          />
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}
      >
        <Link
          component="a"
          variant=""
          sx={{
            marginRight: 2,
            fontWeight: "500",
            textDecoration: "none",
            cursor: "pointer",
            textWrap: "nowrap",
          }}
          onClick={handleClose}
        >
          No thanks
        </Link>

        <Button onClick={openForm}> Yes </Button>
        <IconButton
          icon="close"
          sx={(theme) => ({
            color: theme.palette.bodyText.main,
            display: { xs: "none", md: "flex" },
            transform: "translateX(10px)",
          })}
          onClick={handleCloseButton}
        />
      </Stack>
    </Stack>
  );

  return (
    <Stack spacing={2} sx={{ maxWidth: 700 }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        action={action}
        anchorOrigin={
          isMobile
            ? { vertical: "bottom", horizontal: "center" }
            : { vertical: "bottom", horizontal: "right" }
        }
        style={{ margin: isMobile ? "24px 16px" : "8px 0px" }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.extralight,
            padding: 3,
            borderRadius: 2.5,
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))",
          })}
        >
          <Box>{action}</Box>
        </Box>
      </Snackbar>
    </Stack>
  );
};

export default SurveySnackbar;
