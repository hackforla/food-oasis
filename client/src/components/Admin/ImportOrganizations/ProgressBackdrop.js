import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';

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
        onClick={handleCancelUpload}
        className={classes.buttonCancel}
        variant="contained"
      >
        Cancel
      </Button> */}
    </Backdrop>
  );
}

export default ProgressBackdrop;
