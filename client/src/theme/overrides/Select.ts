import type { Theme } from "@mui/material/styles";

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "8px",
          height: "44px",
        },
        input: {
          padding: "11px 16px",
        },
      },
    },
  };
}
