import type { Theme } from "@mui/material/styles";

export default function Radio(theme: Theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(51, 102, 153, 0.2)",
          },
        },
      },
    },
  };
}
