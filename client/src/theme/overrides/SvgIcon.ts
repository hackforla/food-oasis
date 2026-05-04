import type { Theme } from "@mui/material/styles";

export default function SvgIcon(theme: Theme) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: "15px",
          marginRight: "5px",
        },
      },
    },
  };
}
