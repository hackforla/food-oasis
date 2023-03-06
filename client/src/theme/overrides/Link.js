export default function Link(theme) {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.link.main,
          "&:visited": {
            color: theme.palette.link.dark,
          },
          "&:hover": {
            color: theme.palette.link.light,
          },
        },
      },
    },
  };
}
