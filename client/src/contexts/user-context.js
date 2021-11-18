import React, { useState, useEffect } from "react";
import * as analytics from "../services/analytics";
import { logout } from "../services/account-service";
import PropTypes from "prop-types";
import { useToasterContext } from "../contexts/toaster-context";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const { setToast } = useToasterContext();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  useEffect(() => {
    const storedJson = sessionStorage.getItem("user");
    const userJson = JSON.stringify(user);
    if (!userJson && !storedJson) {
      return;
    } else if (userJson === storedJson) {
      return;
    } else {
      const user = JSON.parse(storedJson);
      if (user) {
        analytics.identify(user.id);
      }
      setUser(user);
      setIsLoggedIn(true);
    }
  }, [user]);

  const onLogin = React.useCallback(async (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  }, []);

  const onLogout = React.useCallback(async () => {
    sessionStorage.removeItem("user");
    await logout();
    setIsLoggedIn(false);
    setUser(null);

    // This isn't a perfect logout solution, since it just destroys the
    // cookie with the JWT on this browser. However, if malicious code
    // has stolen the token, it is still valid until expiration.

    // "Delete" the cookie by replacing with  the same name that is
    // expired.
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setToast({
      message: "Logged out successfully.",
    });
  }, [setToast]);

  const value = React.useMemo(() => {
    return {
      user,
      isLoggedIn,
      onLogin,
      onLogout,
    };
  }, [user, onLogin, isLoggedIn, onLogout]);

  if (isLoggedIn === null) {
    return null;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => React.useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.any,
};
