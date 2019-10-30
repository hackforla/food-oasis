import React from "react";
import Logout from "../components/Logout";
import { Box } from "@material-ui/core";

const Footer = props => {
  return (
    <React.Fragment>
      {props.user && props.user.id ? (
        <Box>
          <div>{props.user.firstName + " " + props.user.lastName}</div>
          <Logout user={props.user} setUser={props.setUser} />
        </Box>
      ) : (
        <div>Please log in</div>
      )}
    </React.Fragment>
  );
};

export default Footer;
