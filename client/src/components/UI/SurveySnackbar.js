import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

const SurveySnackbar = () => {
  const [open, setOpen] = useState(() => {
    const isClosed = localStorage.getItem("surveySnackbarClosed");
    return isClosed !== "true";
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem("surveySnackbarClosed", "true");
  };

  const openForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdAhi_nMKQfWVHjfpl1ZkmymBTt8BW7YNqVIOJ4JKYgSL4O3g/viewform",
      "_blank"
    );
  };

  const action = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "520px",
        cursor: "pointer",
      }}
    >
      <span> Participate in a quick survey</span>
      <Button onClick={openForm}> Complete Survey </Button>
      <Button onClick={handleClose}> OPT OUT </Button>
    </Box>
  );

  return (
    <Stack spacing={2} sx={{ maxWidth: 700 }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiSnackbar-root": {
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#323232",
            color: "white",
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Box>{action}</Box>
        </Box>
      </Snackbar>
    </Stack>
  );
};

export default SurveySnackbar;
