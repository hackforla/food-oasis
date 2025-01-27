import { useState, useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

export default function useLocationHook() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [isMapPage, setIsMapPage] = useState(false);
  const location = useLocation();
  const AUTHROUTES = [
    "/admin/login",
    "/admin/login/:email",
    "/admin/register",
    "/admin/forgotpassword",
    "/admin/forgotpassword/:email",
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
    setIsMapPage(location.pathname.toLowerCase().includes("organizations"));
  }, [location, match]);

  return { isHomePage, isAuthPage, isMapPage };
}
