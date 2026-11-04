import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { breakpoints } from "./breakpoints";
import { componentsOverrides } from "./overrides";
import { palette } from "./palette";
import { typography } from "./typography";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette,
      typography,
      breakpoints,
    }),
    []
  );

  const theme = useMemo(() => {
    const nextTheme = createTheme(themeOptions);
    nextTheme.components = componentsOverrides(
      nextTheme
    ) as typeof nextTheme.components;
    return nextTheme;
  }, [themeOptions]);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
