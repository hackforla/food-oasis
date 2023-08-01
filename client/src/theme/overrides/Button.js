export default function Button(theme) {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      // I've commented out the style override for disabled buttons to address issue #1490, where the tooltips weren't working properly on disabled CTA buttons, also the same issue is on the main page. This change fixes the problem, but if any side effect occurs, we can always revert the change.

      // styleOverrides: {
      //   root: {
      //     "&:disabled": {
      //      cursor: "not-allowed",
      //       pointerEvents: "auto",
      //     },
      //   },
      // },
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
          fontSize: ".875rem",
          "@media (min-width:600px)": {
            fontSize: "1rem",
          },
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
            boxShadow: "inset 0px 8px 4px rgba(0,0,0,0.24)",
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
          padding: "6px 12px",
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: theme.palette.primary.light,
          fontSize: ".8125rem",
          "@media (min-width:600px)": {
            fontSize: "0.8125rem",
          },
          "&:hover": {
            backgroundColor: theme.palette.primary.extralight,
          },
          "&:active": {
            backgroundColor: theme.palette.primary.extralight,
            boxShadow: "inset 0px 8px 4px rgba(51, 102, 153, 0.24)",
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
            backgroundColor: theme.palette.primary.dark,
          },
          "&:focus": {
            borderWidth: "2px",
            borderColor: theme.palette.primary.dark,
            borderStyle: "solid",
            dropShadow: "10px 10px  12px",
          },
          "&:disabled": {
            backgroundColor: theme.palette.inactiveButtonMain,
            border: "2px solid transparent",
            color: theme.palette.common.white,
            opacity: 0.5,
          },
        },
      },
    },
  };
}
