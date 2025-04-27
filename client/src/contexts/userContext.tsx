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

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  isLoggedIn: boolean;
  onLogin: (user: User) => Promise<void>;
  onLogout: (user: User) => Promise<void>;
  onUpdate: (user: User) => Promise<void>;
}

const initialState: UserContextProps = {
  user: null,
  isLoggedIn: false,
  onLogin: async () => {},
  onLogout: async () => {},
  onUpdate: async () => {},
};

export const UserContext = createContext<UserContextProps>(initialState);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { setToast } = useToasterContext();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedJson = sessionStorage.getItem("user");
    const userJson = JSON.stringify(user);
    if ((!userJson && !storedJson) || userJson === storedJson) {
      return;
    } else if (storedJson) {
      const user = JSON.parse(storedJson);
      if (user) {
        analytics.identify(user.id);
      }
      setUser(user);
      setIsLoggedIn(true);
    }
  }, [user]);

  const onLogin = useCallback(async (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  }, []);

  const onUpdate = useCallback(async (updateUser: User) => {
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
