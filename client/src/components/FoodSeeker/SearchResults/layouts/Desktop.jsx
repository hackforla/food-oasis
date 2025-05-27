import { Stack, Box, styled, Tooltip, tooltipClasses } from "@mui/material";
import {
  useFilterPanel,
  useListPanel,
  useAppDispatch,
  useWidget,
} from "../../../../appReducer";
import DrawerLeftArrowButton from "../../../../icons/DrawerLeftArrowButton";
import DrawerRightArrowButton from "../../../../icons/DrawerRightArrowButton";
import useHeaderHeight from "hooks/useHeaderHeight";

const DesktopLayout = ({ filters, list, map }) => {
  const isFilterPanelOpen = useFilterPanel();
  const isListPanelOpen = useListPanel();
  const isWidget = useWidget();
  const dispatch = useAppDispatch();
  const { headerHeight, headerAndFooterHeight } = useHeaderHeight();
  
  function getLeftPosition(){
    const leftPosition = isFilterPanelOpen ? "340px" : 0;
    const listLeftPosition = isFilterPanelOpen ? "-186px" : "-524px";
    return isListPanelOpen ? leftPosition : listLeftPosition
  }
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
            left: getLeftPosition(),
            top: headerHeight,
            height: `calc(100% - ${headerAndFooterHeight}px)`,
            zIndex: 3,
            background: "white",
          }}
        >
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
                zIndex: -1,
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
