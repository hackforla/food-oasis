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
  user: User | null | undefined;
  isLoggedIn: boolean;
  onLogin: (user: User, token?: string) => Promise<User>;
  onLogout: (user: User) => Promise<void>;
  onUpdate: (user: User) => Promise<void>;
}

const initialState: UserContextProps = {
  user: undefined,
  isLoggedIn: false,
  onLogin: async (user) => user,
  onLogout: async () => {},
  onUpdate: async () => {},
};

export const UserContext = createContext<UserContextProps>(initialState);

export interface JWTPayload {
  email: string;
  id: number;
  sub: string;
  exp?: number; // seconds since epoch
}

const SESSION_MS = 24 * 60 * 60 * 1000; // keep in sync with the cookie lifetime on the server

const decodeJWTPayload = (jwt: string): JWTPayload => {
  // JWT payloads are base64url, atob expects standard base64
  const base64 = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};

const updateUserFromJWT = (user: User, jwt: string | undefined): User => {
  if (!jwt) return user;

  const payload = decodeJWTPayload(jwt);
  const roles = new Set((payload.sub || "").split(","));
  return {
    ...user,
    email: payload.email,
    id: payload.id,
    isAdmin: roles.has("admin"),
    isSecurityAdmin: roles.has("security_admin"),
    isCoordinator: roles.has("coordinator"),
    isDataEntry: roles.has("data_entry"),
    isGlobalAdmin: roles.has("global_admin"),
    isGlobalReporting: roles.has("global_reporting"),
  };
};

const clearStoredUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userExpiresAt");
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { setToast } = useToasterContext();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedJson = localStorage.getItem("user");
    const expiresAt = Number(localStorage.getItem("userExpiresAt"));

    if (!storedJson || !expiresAt || Date.now() >= expiresAt) {
      clearStoredUser();
      setIsLoggedIn(false);
      setUser(null);
      return;
    }
    try {
      const storedUser: User = JSON.parse(storedJson);
      analytics.identify(storedUser.id);
      setUser(storedUser);
      setIsLoggedIn(true);
    } catch {
      clearStoredUser();
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const onLogin = useCallback(async (user: User, token?: string): Promise<User> => {
    const enriched = updateUserFromJWT(user, token);
    const exp = token ? decodeJWTPayload(token).exp : undefined;
    const expiresAt = exp ? exp * 1000 : Date.now() + SESSION_MS;

    // store enriched claims + expiry only, never the raw token
    localStorage.setItem("user", JSON.stringify(enriched));
    localStorage.setItem("userExpiresAt", String(expiresAt));
    analytics.identify(enriched.id);
    setUser(enriched);
    setIsLoggedIn(true);
    return enriched;
  }, []);

  const onUpdate = useCallback(
    async (updateUser: User) => {
      // role/identity fields come from the logged-in session, the rest from the update
      if (!user) {
        console.error("No user.");
        return;
      }

      const merged: User = {
        ...updateUser,
        id: user?.id ?? updateUser.id,
        isAdmin: user?.isAdmin,
        isSecurityAdmin: user?.isSecurityAdmin,
        isCoordinator: user?.isCoordinator,
        isDataEntry: user?.isDataEntry,
        isGlobalAdmin: user?.isGlobalAdmin,
        isGlobalReporting: user?.isGlobalReporting,
      };
      localStorage.setItem("user", JSON.stringify(merged));
      setUser(merged);
    },
    [user]
  );

  const onLogout = useCallback(async () => {
    clearStoredUser();
    await logout(); // server expires the httpOnly cookie
    setIsLoggedIn(false);
    setUser(null);
    setToast({ message: "Logged out successfully." });
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
