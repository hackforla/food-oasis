import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollEl = document.querySelector("div[data-scroll-container]");

    if (scrollEl) {
      scrollEl.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
