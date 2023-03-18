export default function Chip(theme) {
  return {
    MuiChip: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          // color: themeSpec.palette.common.white,
          // backgroundColor: themeSpec.palette.primary.main,
          borderRadius: "3px",
          margin: "0.5rem 0.5rem 0.5rem 0",
          fontStyle: "italic",
        },
      },
    },
  };
}
