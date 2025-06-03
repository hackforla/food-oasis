import { Stack, Box, styled, Tooltip, tooltipClasses } from "@mui/material";
import {
  useFilterPanel,
  useListPanel,
  useAppDispatch,
  useWidget,
} from "../../../../appReducer";
import DrawerLeftArrowButton from "../../../../icons/DrawerLeftArrowButton";
import DrawerRightArrowButton from "../../../../icons/DrawerRightArrowButton";
import ResultsMap from "../ResultsMap/ResultsMap";

const DesktopLayout = ({
  filters,
  list,
  stakeholders,
  categoryIds,
  toggleCategory,
  loading,
}) => {
  const isFilterPanelOpen = useFilterPanel();
  const isListPanelOpen = useListPanel();
  const isWidget = useWidget();
  const dispatch = useAppDispatch();

  function getLeftPosition() {
    const leftPosition = isFilterPanelOpen ? "340px" : 0;
    const listLeftPosition = isFilterPanelOpen ? "-186px" : "-524px";
    return isListPanelOpen ? leftPosition : listLeftPosition;
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
          display: "flex",
          flex: 1,
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            width: "524px",
            transition: "left .5s ease-in-out",
            left: getLeftPosition(),
            height: `100%`,
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
          <ResultsMap
            stakeholders={stakeholders}
            categoryIds={categoryIds}
            toggleCategory={toggleCategory}
            loading={loading}
          />
        </Box>
      </Box>
    </>
  );
};

export default DesktopLayout;
