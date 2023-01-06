import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useBreakpoints() {
  const theme = useTheme();
  return {
    isMobile: useMediaQuery(theme.breakpoints.only("xs"), { noSsr: true }),
    isTablet: useMediaQuery(theme.breakpoints.only("sm"), { noSsr: true }),
    isDesktop: useMediaQuery(theme.breakpoints.up("md"), { noSsr: true }),
  };
}
