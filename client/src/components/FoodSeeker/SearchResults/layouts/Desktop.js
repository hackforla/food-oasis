import { Stack, Box, styled, Tooltip, tooltipClasses } from "@mui/material";
import {
  useFilterPanel,
  useListPanel,
  useAppDispatch,
} from "../../../../appReducer";
import DrawerLeftArrowButton from "../../../../icons/DrawerLeftArrowButton";
import DrawerRightArrowButton from "../../../../icons/DrawerRightArrowButton";

const DesktopLayout = ({ filters, list, map }) => {
  const isFilterPanelOpen = useFilterPanel();
  const isListPanelOpen = useListPanel();
  const dispatch = useAppDispatch();

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
            height: "calc(100% - 120px)",
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
