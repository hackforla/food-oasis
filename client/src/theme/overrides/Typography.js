export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "body1" || ownerState.variant === "body2"
            ? { color: theme.palette.bodyText.main }
            : { color: theme.palette.headingText.main }),
        }),
      },
    },
  };
}
