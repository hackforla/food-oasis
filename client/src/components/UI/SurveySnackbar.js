import * as React from "react";
import { useState } from "react";
import { IconButton, Collapse, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { margin } from "@mui/system";

const SurveySnackbar = () => {
  const [open, setOpen] = useState(() => {
    const isClosed = localStorage.getItem("surveySnackbarClosed");
    return isClosed !== "true";
  });
  const [expanded, setExpanded] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem("surveySnackbarClosed", "true");
  };

  const toggleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const openForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdAhi_nMKQfWVHjfpl1ZkmymBTt8BW7YNqVIOJ4JKYgSL4O3g/viewform",
      "_blank"
    );
  };

  const labelStyles = {
    marginBottom: "10px",
    display: "block",
  };

  const inputStyles = {
    marginRight: "5px",
  };

  const action = (
    <Box
      onClick={toggleExpansion}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "320px",
        cursor: "pointer",
      }}
    >
      <span> Participate in a quick survey</span>

      <IconButton
        variant="contained"
        aria-label={expanded ? "Collapse" : "Expand"}
        sx={{
          color: "white",
          backgroundColor: "#323232",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#323232",
          },
        }}
      >
        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
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
          <Collapse
            in={expanded}
            timeout="auto"
            style={{ margin: "0 0 10px 0" }}
            unmountOnExit
          >
            <Box sx={{ mt: 2 }}>
              <p style={{ margin: "0 0 20px 0", fontWeight: "800" }}>
                What brought you to Food Oasis today?
              </p>
              <div onClick={openForm} style={{ cursor: "pointer" }}>
                <label style={labelStyles}>
                  <input
                    style={inputStyles}
                    type="checkbox"
                    name="option"
                    value="myself"
                  />
                  Looking for myself
                </label>
                <label style={labelStyles}>
                  <input
                    style={inputStyles}
                    type="checkbox"
                    name="option"
                    value="friend-family"
                  />
                  Looking for a friend/family member
                </label>
                <label style={labelStyles}>
                  <input
                    style={inputStyles}
                    type="checkbox"
                    name="option"
                    value="social-worker"
                  />
                  I'm a social worker looking for a client
                </label>
                <label style={labelStyles}>
                  <input
                    style={inputStyles}
                    type="checkbox"
                    name="option"
                    value="volunteer"
                  />
                  Food Oasis volunteer
                </label>
                <label style={labelStyles}>
                  <input
                    style={inputStyles}
                    type="checkbox"
                    name="option"
                    value="other"
                  />
                  Other
                </label>
              </div>

              <div
                className="survey-buttons"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  margin: "30px 0 0 0",
                }}
              >
                <Button onClick={openForm}> Complete Survey </Button>
                <Button onClick={handleClose}> Close </Button>
              </div>
            </Box>
          </Collapse>
        </Box>
      </Snackbar>
    </Stack>
  );
};

export default SurveySnackbar;
