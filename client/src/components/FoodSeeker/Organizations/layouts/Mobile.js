import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  map: {
    flex: 1,
  },
  preview: {
    margin: "0 1em",
    flex: 0,
  },
  details: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1em",
    position: "absolute",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    zIndex: 10000,
    overflow: "auto",
  },
}));

const MobileLayout = ({ filters, list, map, preview, details, isMapView }) => {
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!details) setShowDetails(false);
  }, [details])

  const show = useCallback(() => setShowDetails(true), [])

  return (
    <>
      { filters }
      <div className={classes.container}>
        {isMapView ? (
          <>
            <div className={classes.map}>{ map }</div>
            {preview && (
              <div className={classes.preview} onClick={show}>
                { preview }
              </div>
            )}
            {details && showDetails && (
              <div className={classes.details}>
                { details }
              </div>
            )}
          </>
        ) : list}
      </div>
    </>
  )
}

export default MobileLayout;
