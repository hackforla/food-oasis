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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          height: "44px",
        },
        input: {
          padding: "11px 16px",
          "&::placeholder": {
            fontStyle: "italic",
          },
        },
      },
    },
  };
}
