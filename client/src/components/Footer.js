import React from "react";
import { Box } from "@material-ui/core";
import Copyright from "./Copyright";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    height: "50px",
    backgroundColor: "#FAEBD7",
    flexGrow: 0,
    padding: "0.75em"
  }
}));

const Footer = props => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Copyright />
    </Box>
  );
};

export default Footer;
