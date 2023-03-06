export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      defaultProps: {
        size: "large",
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          "&.Mui-focusVisible .MuiSvgIcon-root": {
            borderStyle: "solid",
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
            borderRadius: "4px",
          },
        },
      },
    },
  };
}
