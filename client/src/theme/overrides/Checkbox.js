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
            backgroundColor: "rgba(51, 102, 153, 0.2)",
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
