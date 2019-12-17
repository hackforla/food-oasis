import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: ".5rem",
  },
}));

export default function CurrentLocationIcon({ isTrackingEnabled, onClick }) {
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      className={classes.button}
      aria-label={`Turn ${isTrackingEnabled ? "OFF" : "ON"} User Location`}
    >
      <LocationSearchingIcon
        color={isTrackingEnabled ? "secondary" : "disabled"}
      />
    </IconButton>
  );
}
