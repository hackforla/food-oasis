import React from "react";
import { Box } from "@material-ui/core";
import Copyright from "./Copyright";
import { ThemeProvider } from "@material-ui/styles";

const Footer = props => {
  return (
    <React.Fragment>
      <hr />
      <Box style={{ padding: "0.75em" }}>
        <Copyright />
      </Box>
    </React.Fragment>
  );
};

export default Footer;
