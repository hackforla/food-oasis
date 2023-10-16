import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";

// Cancel button removes ProgressBackdrop, but doesn't cancel backend read stream, so commented out for now.

function ProgressBackdrop(props) {
  const {
    loading,
    messageOnLoad,
    // handleCancelUpload
  } = props;

  return (
    <Backdrop
      open={loading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ mt: 5 }} />
      {messageOnLoad && <Typography sx={{ mt: 1 }}>{messageOnLoad}</Typography>}

      {/* <Button
        sx={{ mt: 2 }}
        className={classes.buttonCancel}
        variant="contained"
      >
        Cancel
      </Button> */}
    </Backdrop>
  );
}

export default ProgressBackdrop;
