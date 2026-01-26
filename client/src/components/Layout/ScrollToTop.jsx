import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component
 *
 * This component automatically scrolls the window to the top whenever
 * the route pathname changes. This ensures users see content from the
 * beginning when navigating between pages.
 *
 * Usage: Place this component inside a Router but before the Routes component.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
