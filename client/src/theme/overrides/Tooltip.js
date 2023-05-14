export default function Tooltip(theme) {
  return {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          fontSize: "16px",
          backgroundColor: "#D9D9D9",
          color: "black",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "592px",
        },
        arrow: {
          color: "#D9D9D9",
        },
        tooltipPlacementTop: {
          "&.MuiTooltip-tooltipArrow": {
            marginBottom: "5px !important",
          },
          marginBottom: "4px !important",
        },
        tooltipPlacementRight: {
          "&.MuiTooltip-tooltipArrow": {
            marginLeft: "5px !important",
          },
          marginLeft: "4px !important",
        },
        tooltipPlacementBottom: {
          "&.MuiTooltip-tooltipArrow": {
            marginTop: "5px !important",
          },
          marginTop: "4px !important",
        },
        tooltipPlacementLeft: {
          "&.MuiTooltip-tooltipArrow": {
            marginRight: "5px !important",
          },
          marginRight: "4px !important",
        },
      },
    },
  };
}
