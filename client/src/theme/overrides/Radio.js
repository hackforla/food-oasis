export default function Radio(theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(51, 102, 153, 0.2)",
          },
        },
      },
    },
  };
}
