import React from "react";
import { Snackbar, withStyles } from "@material-ui/core";
import { IconButton } from './index';

const styles = (theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
});

const Toast = (props) => {
  const { classes, toast, setToast } = props;

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
          icon='close'
          className={classes.close}
          onClick={handleSnackbarClose}
        />
      ]}
    />
  ) : null;
};

export default withStyles(styles)(Toast);
