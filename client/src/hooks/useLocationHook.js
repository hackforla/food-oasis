import { useState, useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

export default function useLocationHook() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const location = useLocation();
  const AUTHROUTES = [
    "/login",
    "/login/:email",
    "/register",
    "/forgotpassword",
    "/forgotpassword/:email",
  ];

  const match = matchPath(location.pathname, {
    path: AUTHROUTES,
    exact: true,
    strict: false,
  });

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
    setIsAuthPage(match && match.isExact ? true : false);
  }, [location]);

  return { isHomePage, isAuthPage };
}
