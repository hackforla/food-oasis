import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Cancel button removes ProgressBackdrop, but doesn't cancel backend read stream, so commented out for now.

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  messageOnLoad: {
    position: "absolute",
    top: "55%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonCancel: {
    position: "absolute",
    top: "60%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function ProgressBackdrop(props) {
  const {
    loading,
    messageOnLoad,
    // handleCancelUpload
  } = props;
  const classes = useStyles();

  return (
    <Backdrop open={loading} className={classes.backdrop}>
      <CircularProgress className={classes.buttonProgress} />
      {messageOnLoad && (
        <Typography className={classes.messageOnLoad}>
          {messageOnLoad}
        </Typography>
      )}
      {/* <Button
        children="Cancel"
        onClick={handleCancelUpload}
        className={classes.buttonCancel}
        variant="contained"
      /> */}
    </Backdrop>
  );
}

export default ProgressBackdrop;
