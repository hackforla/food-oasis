import {
  Stack,
  Box,
  Grid,
  styled,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import {
  useFilterPanel,
  useListPanel,
  useAppDispatch,
} from "../../../../appReducer";
import * as React from "react";
import DrawerLeftArrowButton from "../../../../icons/DrawerLeftArrowButton";
import DrawerRightArrowButton from "../../../../icons/DrawerRightArrowButton";
import useCategoryIds from "hooks/useCategoryIds";
import AdvancedFilters from "../AdvancedFilters/AdvancedFilters";
import useBreakpoints from "hooks/useBreakpoints";
import useFeatureFlag from "hooks/useFeatureFlag";

const DesktopLayout = ({ filters, list, map }) => {
  const isFilterPanelOpen = useFilterPanel();
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const { isMobile } = useBreakpoints();
  const hasAdvancedFilterFeatureFlag = useFeatureFlag("advancedFilter");
  const isListPanelOpen = useListPanel();
  const dispatch = useAppDispatch();

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
    }),
  }));

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch({ type: "TOGGLE_LIST_PANEL", listPanel: !isListPanelOpen });
  };
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 11,
      padding: "10px",
    },
  }));

  let leftPostion = isFilterPanelOpen ? "340px" : 0;
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
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            width: "524px",
            transition: "left .5s ease-in-out",
            left: isListPanelOpen ? leftPostion : "-524px",
            top: "120px",
            height: "100%",
            zIndex: "1",
            background: "white",
          }}
        >
          <FilterPanelPlaceholder
            isFilterPanelOpen={isFilterPanelOpen}
          ></FilterPanelPlaceholder>
          <Box
            sx={{
              width: "100%",
            }}
          >
            {list}
          </Box>
          <LightTooltip
            title={
              isListPanelOpen ? "Collapse side panel" : "Expand side panel"
            }
            placement="right"
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                position: "absolute",
                right: "-33px",
                top: "50%",
                zIndex: 9990,
                transform: "translateY(-50%)",
              }}
              onClick={toggleDrawer}
            >
              {isListPanelOpen ? (
                <DrawerLeftArrowButton />
              ) : (
                <DrawerRightArrowButton />
              )}
            </button>
          </LightTooltip>
          {hasAdvancedFilterFeatureFlag && !isMobile && (
            <Grid
              className="advanced-filters-class"
              display="inline-flex"
              alignItems="flex-start"
              sx={{
                overflow: "auto",
                gap: "0.5rem",
                padding: "0 0 0.3rem 2.25rem",
                scrollbarWidth: "none",
                position: "absolute",
                top: 0,
                right: "-480px",
              }}
            >
              <AdvancedFilters
                categoryIds={categoryIds}
                toggleCategory={toggleCategory}
              />
            </Grid>
          )}
        </Stack>
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
