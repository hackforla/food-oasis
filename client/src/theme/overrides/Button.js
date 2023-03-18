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
          color: theme.palette.common.white,
          border: "2px solid transparent",
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "#2D5B88",
            border: "2px solid transparent",
          },

          "&:active": {
            backgroundColor: "#264A79",
          },
          "&:focus": {
            backgroundColor: theme.palette.primary.main,
            border: "2px solid #264A79",
            dropShadow: "10px 10px  12px",
          },
          "&:disabled": {
            backgroundColor: "#949494",
            border: "2px solid transparent",
            color: theme.palette.common.white,
          },
        },
        outlined: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
          border: "1px solid #336699",
          "&:hover": {
            backgroundColor: "#E5F1F7",
            border: "1px solid #336699",
          },
          "&:active": {
            backgroundColor: "#CBE3F1",
          },
          "&:focus": {
            border: "2px solid #264A79",
            dropShadow: "0 0  12px #FFFFFF80",
          },
          "&:disabled": {
            border: "1px solid #949494",
            color: "#949494",
          },
        },
      },
    },
  };
}
