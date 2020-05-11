import React from "react";
import { Box, Typography } from "@material-ui/core";
import Copyright from "./Copyright";
import { makeStyles } from "@material-ui/core/styles";
import useLocationHook from "hooks/useLocationHook";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: "50px",
    backgroundColor: "#FAEBD7",
    flexGrow: 0,
    padding: "0.75em",
  },
}));

const Footer = (props) => {
  const { userCoordinates } = props;
  const isHomePage = useLocationHook();
  const classes = useStyles();

  if (isHomePage) return null;

  return (
    <Box className={classes.footer}>
      <Copyright />
      <Typography variant="body2" color="textSecondary" align="center">
        {userCoordinates && userCoordinates.latitude
          ? `My location - Lat: ${userCoordinates.latitude.toFixed(
              6
            )} Lon: ${userCoordinates.longitude.toFixed(6)}`
          : "Enable location in your browser to use location-dependent features"}
      </Typography>
    </Box>
  );
};

export default Footer;
