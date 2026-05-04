import type { Theme } from "@mui/material/styles";

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: "3px",
          margin: "0.5rem 0.5rem 0.5rem 0",
          fontStyle: "italic",
        },
      },
    },
  };
}
