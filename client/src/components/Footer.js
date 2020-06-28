import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Copyright from "./Copyright";
import { makeStyles } from "@material-ui/core/styles";
import useLocationHook from "hooks/useLocationHook";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#FAEBD7",
    padding: "0.75em",
  },
}));

const Footer = (props) => {
  const { userCoordinates } = props;
  const isHomePage = useLocationHook();
  const classes = useStyles();

  if (isHomePage) return null;

  return (
    <Grid item className={classes.footer}>
      <Copyright />
      <Typography variant="body2" color="textSecondary" align="center">
        {userCoordinates && userCoordinates.latitude
          ? `My location - Lat: ${userCoordinates.latitude.toFixed(
              6
            )} Lon: ${userCoordinates.longitude.toFixed(6)}`
          : "Enable location in your browser to use location-dependent features"}
      </Typography>
    </Grid>
  );
};

export default Footer;
