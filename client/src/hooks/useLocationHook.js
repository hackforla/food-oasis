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

  const match = AUTHROUTES.some((path) =>
    matchPath(
      {
        path,
      },
      location.pathname
    )
  );

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
    setIsAuthPage(match && match.isExact ? true : false);
  }, [location, match]);

  return { isHomePage, isAuthPage };
}
