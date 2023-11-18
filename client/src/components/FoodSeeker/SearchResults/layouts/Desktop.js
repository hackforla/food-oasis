import { Box, styled } from "@mui/material";
import { useFilterPanel } from "../../../../appReducer";

const DesktopLayout = ({ filters, list, map }) => {
  const isFilterPanelOpen = useFilterPanel();

  const FilterPanelPlaceholder = styled("div", {
    shouldForwardProp: (prop) => prop !== "isFilterPanelOpen",
  })(({ theme, isFilterPanelOpen }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(isFilterPanelOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: "340px",
    }),
  }));

  return (
    <>
      {filters}
      <Box
        sx={{
          flex: "auto",
          overflowY: "hidden",
          display: "flex",
        }}
      >
        <FilterPanelPlaceholder
          isFilterPanelOpen={isFilterPanelOpen}
        ></FilterPanelPlaceholder>
        <Box
          sx={{
            width: "35%",
            overflow: "auto",
          }}
        >
          {list}
        </Box>
        <Box
          sx={{
            height: "100%",
            flex: 1,
          }}
        >
          {map}
        </Box>
      </Box>
    </>
  );
};

export default DesktopLayout;
