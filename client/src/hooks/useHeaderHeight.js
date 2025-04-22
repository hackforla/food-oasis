import { useEffect, useState } from "react";

export default function useHeaderHeight() {
  const [headerAndFooterHeight, setHeaderAndFooterHeight] = useState(126);
  const [headerHeight, setHeaderHeight] = useState(126);
  useEffect(() => {
    const updateHeight = () => {
      const header1 = document.getElementById("header1");
      const header2 = document.getElementById("header2");
      const widgetFooter = document.getElementById("widgetFooter");

      const totalHeaderHeight =
        (header1?.offsetHeight || 0) + (header2?.offsetHeight || 0);

      setHeaderHeight(totalHeaderHeight);

      const totalHeaderAndFooterHeight =
        totalHeaderHeight + (widgetFooter?.offsetHeight || 0);

      setHeaderAndFooterHeight(totalHeaderAndFooterHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const observer = new ResizeObserver(updateHeight);
    const elements = [
      document.getElementById("header1"),
      document.getElementById("header2"),
      document.getElementById("widgetFooter"),
    ];
    elements.forEach(
      (el) => el && observer.observe(el, { childList: true, subtree: true })
    );

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  return {
    headerHeight,
    headerAndFooterHeight,
  };
}
