export default function Link(theme) {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          padding: "2px 1px 0",
          outline: "none",
          borderBottom: "1px solid",
          "&:link": {
            color: theme.palette.link.normal,
          },
          "&:visited": {
            color: theme.palette.link.visited,
          },
          "&:focus": {
            fontWeight: 550,
          },
          "&:hover": {
            color: theme.palette.link.hovered,
          },
          "&:active": {
            color: theme.palette.primary.light,
          },
        },
      },
    },
  };
}
