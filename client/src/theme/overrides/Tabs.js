export default function Tabs(theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          color: "A0A0A0",

          "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.secondary.main,
          },
          "& .MuiTabs-indicatorSpan": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: theme.palette.secondary.main,
          },
        },
      },
    },
  };
}
