import { useMediaQuery, useTheme } from "@mui/material";

export default function useBreakpoints() {
  const theme = useTheme();
  return {
    isMobile: useMediaQuery(theme.breakpoints.down("md"), { noSsr: true }),
    isDesktop: useMediaQuery(theme.breakpoints.up("md"), { noSsr: true }),
  };
}
