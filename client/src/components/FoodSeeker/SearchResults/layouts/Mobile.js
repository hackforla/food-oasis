import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    position: "relative",
  },
  map: {
    flex: 1,
  },
  preview: {
    margin: "0 1em",
    flex: 0,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    zIndex: 1000,
  },
}));

const MobileLayout = ({ filters, map, list, preview, details }) => {
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!details) setShowDetails(false);
  }, [details]);

  const show = useCallback(() => setShowDetails(true), []);

  return (
    <>
      {filters}
      <div className={classes.container}>
        <div className={classes.map}>{map}</div>
        {list && <div className={classes.overlay}>{list}</div>}
        {preview && (
          <div className={classes.preview} onClick={show}>
            {preview}
          </div>
        )}
        {details && showDetails && (
          <div className={classes.overlay}>{details}</div>
        )}
      </div>
    </>
  );
};

export default MobileLayout;
