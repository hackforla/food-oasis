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
            backgroundColor: theme.palette.inactiveButton.main,
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
            borderColor: theme.palette.inactiveButton.main,
            backgroundColor: theme.palette.common.white,
            color: theme.palette.inactiveButton.main,
            boxShadow: "none",
          },
        },
        recenter: {
          color: theme.palette.common.white,
          border: "2px solid transparent",
          backgroundColor: theme.palette.primary.main,
          size: "small",
          minWidth: 0,
          maxWidth: "2rem",
          minHeight: 0,
          height: theme.spacing(5),
          padding: theme.spacing(1),
          boxSizing: "border-box",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            border: "2px solid transparent",
          },
          "&:active": {
            backgroundColor: "#264A79",
          },
          "&:focus": {
            border: "2px solid #264A79",
            dropShadow: "10px 10px  12px",
          },
          "&:disabled": {
            backgroundColor: "#949494",
            border: "2px solid transparent",
            color: theme.palette.common.white,
            opacity: 0.5,
          },
        },
      },
    },
  };
}
