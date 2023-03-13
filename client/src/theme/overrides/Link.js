export default function Link(theme) {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.link.normal,
          "&:visited": {
            color: theme.palette.link.visited,
          },
          "&:hover": {
            color: theme.palette.link.hovered,
          },
        },
      },
    },
  };
}
