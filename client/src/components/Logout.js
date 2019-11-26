import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Logout = props => {
  const logout = () => {
    // This isn't a perfect logout solution, since it just destroys the
    // cookie with the JWT on this browser. However, if malicious code
    // has stolen the token, it is still valid until expiration.

    // "Delete" the cookie by replacing with  the same name that is
    // expired.
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    props.setUser(null);
    props.history.push("/stakeholders");
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default withRouter(Logout);
