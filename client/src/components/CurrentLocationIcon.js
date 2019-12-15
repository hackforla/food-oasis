import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationDisabledIcon from "@material-ui/icons/LocationDisabled";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
}));
export default function CurrentLocationIcon({ isTrackingEnabled }) {
  const classes = useStyles();

  if (!isTrackingEnabled) {
    return (
      <div className={classes.container}>
        <LocationDisabledIcon color="disabled" />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <LocationSearchingIcon color="primary" />
    </div>
  );
}
