import type { Theme } from "@mui/material/styles";

type TypographyOwnerState = {
  variant?: string;
};

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: ({
          ownerState,
          theme,
        }: {
          ownerState: TypographyOwnerState;
          theme: Theme;
        }) => ({
          ...(ownerState.variant === "body1" || ownerState.variant === "body2"
            ? { color: theme.palette.bodyText.main }
            : { color: theme.palette.headingText.main }),
        }),
      },
    },
  };
}
