export default function Button(theme) {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&:disabled": {
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        border: "none",
      },
      styleOverrides: {
        root: {
          padding: "4px 8px",
          minWidth: "4rem",
          minHeight: "0",
          borderRadius: "4px",
          margin: "0rem",
          lineHeight: "1.1rem",
          boxSizing: "border-box",
        },
        contained: {
          padding: "8px 16px",
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },

          "&:active": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "inset 4px 8px 4px rgba(0,0,0,0.4)",
          },
          "&:focus": {
            backgroundColor: theme.palette.primary.main,
            filter: "drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.8))",
          },
          "&:disabled": {
            backgroundColor: theme.palette.common.inactiveButton,
            color: theme.palette.common.white,
            boxShadow: "none",
          },
        },
        outlined: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: theme.palette.primary.light,
          "&:hover": {
            backgroundColor: "#E5F1F7",
          },
          "&:active": {
            backgroundColor: "#CBE3F1",
            boxShadow: "inset 4px 8px 4px rgba(0,0,0,0.25)",
          },
          "&:focus": {
            filter: "drop-shadow(0px 0px  12px rgba(255, 255, 255, 0.8))",
          },
          "&:disabled": {
            borderColor: theme.palette.common.inactiveButton,
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.inactiveButton,
            boxShadow: "none",
          },
        },
      },
    },
  };
}
