export default function Tab(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          color: "#C0C0C0",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
          "&.Mui-selected": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.dark,
          },
        },
      },
    },
  };
}
