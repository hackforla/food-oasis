export default function TextField(theme) {
  return {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  };
}
