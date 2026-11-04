import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window
    window.scrollTo(0, 0);

    // Scroll the app container (Grid with fixed height)
    const appContainer = document.getElementById("app-container");
    if (appContainer) {
      appContainer.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
