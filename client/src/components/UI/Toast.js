import React from "react";
import { Snackbar } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { IconButton } from "./index";
import { useToasterContext } from "../../contexts/toasterContext";

const styles = (theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
});

const Toast = () => {
  const { toast, setToast } = useToasterContext();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
  };

  return toast.message ? (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={!!toast}
      autoHideDuration={toast.duration || 4000}
      onClose={handleSnackbarClose}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{toast.message}</span>}
      action={[
        <IconButton
          key={toast.message}
          icon="close"
          onClick={handleSnackbarClose}
          size="large"
        />,
      ]}
    />
  ) : null;
};

export default withStyles(styles)(Toast);
