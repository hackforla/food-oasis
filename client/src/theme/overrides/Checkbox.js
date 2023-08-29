export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        color: "primary",
      },
      styleOverrides: {
        root: {
          "&.Mui-focusVisible .MuiSvgIcon-root": {
            borderStyle: "solid",
            borderColor: theme.palette.common.darkGray,
            borderWidth: "2px",
            borderRadius: "4px",
          },
          "&:hover": {
            backgroundColor: theme.palette.tooltip.hover,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontStyle: "italic",
        },
      },
    },
  };
}
