import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { logout } from "../services/account-service";
import * as analytics from "../services/analytics";
import { useToasterContext } from "./toasterContext";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { setToast } = useToasterContext();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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

  const onLogin = useCallback(async (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  }, []);

  const onUpdate = useCallback(async (updateUser) => {
    sessionStorage.setItem("user", JSON.stringify(updateUser));
    setUser(updateUser);
  }, []);

  const onLogout = useCallback(async () => {
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

  const value = useMemo(() => {
    return {
      user,
      isLoggedIn,
      onLogin,
      onLogout,
      onUpdate,
    };
  }, [user, onLogin, isLoggedIn, onLogout, onUpdate]);

  if (isLoggedIn === null) {
    return null;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.any,
};
