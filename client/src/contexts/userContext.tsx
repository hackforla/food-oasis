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
import { User } from "../types/User";
import { getCookie } from "helpers";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null | undefined;
  isLoggedIn: boolean;
  onLogin: (user: User) => Promise<void>;
  onLogout: (user: User) => Promise<void>;
  onUpdate: (user: User) => Promise<void>;
}

const initialState: UserContextProps = {
  user: undefined,
  isLoggedIn: false,
  onLogin: async () => {},
  onLogout: async () => {},
  onUpdate: async () => {},
};

export const UserContext = createContext<UserContextProps>(initialState);
export interface JWTPayload {
  email: string;
  id: number;
  sub: string;
}

const updateUserFromJWT = (user: User, jwt: string | undefined): User => {
  if (!jwt) return user;

  const payload: JWTPayload = JSON.parse(atob(jwt.split(".")[1]));
  user.email = payload.email;
  user.id = payload.id;
  const roles = new Set(payload.sub.split(","));
  user.isAdmin = roles.has("admin");
  user.isSecurityAdmin = roles.has("security_admin");
  user.isCoordinator = roles.has("coordinator");
  user.isDataEntry = roles.has("data_entry");
  user.isGlobalAdmin = roles.has("global_admin");
  user.isGlobalReporting = roles.has("global_reporting");
  return user;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { setToast } = useToasterContext();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = getCookie("jwt");

    const storedJson = localStorage.getItem("user");
    if (!jwt || !storedJson) {
      setIsLoggedIn(false);
      setUser(null);
      return;
    }
    if (storedJson && jwt) {
      let updatedUser = JSON.parse(storedJson);
      updatedUser = updateUserFromJWT(updatedUser, jwt);
      if (updatedUser) {
        analytics.identify(updatedUser.id);
      }
      setUser(updatedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const onLogin = useCallback(async (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    const jwt = getCookie("jwt");
    if (jwt) {
      user = updateUserFromJWT(user, jwt);
      if (user) {
        analytics.identify(user.id);
      }
    }

    setUser(user);
    setIsLoggedIn(true);
  }, []);

  const onUpdate = useCallback(async (updateUser: User) => {
    localStorage.setItem("user", JSON.stringify(updateUser));
    const jwt = getCookie("jwt");
    if (jwt) {
      updateUser = updateUserFromJWT(updateUser, jwt);
    }
    setUser(updateUser);
  }, []);

  const onLogout = useCallback(async () => {
    localStorage.removeItem("user");
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
