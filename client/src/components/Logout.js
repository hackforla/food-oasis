import React from "react";
import { Button } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";

export const logout = (props, history) => {
  // This isn't a perfect logout solution, since it just destroys the
  // cookie with the JWT on this browser. However, if malicious code
  // has stolen the token, it is still valid until expiration.

  // "Delete" the cookie by replacing with  the same name that is
  // expired.
  const { setUser, setToast } = props;
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  setUser(null);
  setToast({
    message: "Logged out successfully.",
  });
  history.push("/");
};

const LogoutButton = (props) => {
  const history = useHistory();
  return <Button onClick={() => logout(props, history)}>Logout</Button>;
};

export default withRouter(LogoutButton);
