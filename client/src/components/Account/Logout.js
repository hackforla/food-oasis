import React from "react";
import PropTypes from "prop-types";
import { useHistory, withRouter } from "react-router-dom";
import { Button } from "../UI";

LogoutButton.propTypes = {
  setUser: PropTypes.func,
  setToast: PropTypes.func,
};

export const logout = (setUser, setToast, history) => {
  // This isn't a perfect logout solution, since it just destroys the
  // cookie with the JWT on this browser. However, if malicious code
  // has stolen the token, it is still valid until expiration.

  // "Delete" the cookie by replacing with  the same name that is
  // expired.
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  setUser(null);
  setToast({
    message: "Logged out successfully.",
  });
  history.push("/");
};

function LogoutButton({ setUser, setToast }) {
  const history = useHistory();
  return (
    <Button onClick={() => logout(setUser, setToast, history)}>Logout</Button>
  );
}

export default withRouter(LogoutButton);
