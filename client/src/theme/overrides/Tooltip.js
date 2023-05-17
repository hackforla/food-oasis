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
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        arrow: {
          color: "#D9D9D9",
          "&:before": {
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
          },
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
