/*
  Per Issue #1452, Design team wanted three different variants of Links:
  "inherit" (the default variant) is used in most places where a normal link would be.
  "secondary" is used when a link is embedded in text, as on the About Us page.
  "icon" is used when the link is just an icon or image, and the usual underline
  and other styling is not needed.
*/

export default function Link(theme) {
  return {
    MuiLink: {
      variants: [
        {
          props: { variant: "icon" },
          style: {
            textDecoration: "none",
          },
        },
        {
          props: { variant: "primary" },
          style: {
          textDecoration: "none",
          padding: "2px 1px 0",
          borderBottom: "1px solid",
          "&:link": {
            color: theme.palette.link.normal,
          },
          "&:a": {
            color: theme.palette.link.normal,
          },
          "&:visited": {
            color: theme.palette.link.visited,
          },
          "&:hover": {
            color: theme.palette.link.hovered,
          },
          "&:active": {
            color: theme.palette.primary.light,
          },
          },
        },
      ],
    },
  };
}
