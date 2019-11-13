import React from "react";
import { Snackbar, IconButton, withStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
});

const Toast = props => {
  const { classes, toast, setToast } = props;

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={!!toast}
      autoHideDuration={toast.duration || 4000}
      onClose={handleSnackbarClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{toast.message}</span>}
      action={[
        // <Button
        //   key="undo"
        //   color="secondary"
        //   size="small"
        //   onClick={handleSnackbarClose}
        // >
        //   UNDO
        // </Button>,
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleSnackbarClose}
        >
          <Close />
        </IconButton>
      ]}
    />
  );
};

export default withStyles(styles)(Toast);
