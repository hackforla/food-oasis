import { useEffect, useState } from "react";

export default function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(126);
  console.log({ headerHeight });
  useEffect(() => {
    const updateHeight = () => {
      const header1 = document.getElementById("header1");
      const header2 = document.getElementById("header2");

      const totalHeight =
        (header1.offsetHeight || 0) + (header2.offsetHeight || 0);
      setHeaderHeight(totalHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return { headerHeight, setHeaderHeight };
}
