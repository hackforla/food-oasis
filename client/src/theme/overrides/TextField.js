export default function TextField(theme) {
  return {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  };
}
