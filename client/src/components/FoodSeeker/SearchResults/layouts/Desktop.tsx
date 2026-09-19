import {
  Stack,
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import { FC, ReactNode } from "react";
import {
  useFilterPanel,
  useListPanel,
  useAppDispatch,
} from "../../../../appReducer";
import DrawerLeftArrowButton from "../../../../icons/DrawerLeftArrowButton";
import DrawerRightArrowButton from "../../../../icons/DrawerRightArrowButton";
import ResultsMap from "../ResultsMap/ResultsMap";
import type { Stakeholder } from "types/Stakeholder";

interface DesktopLayoutProps {
  filters: ReactNode;
  list: ReactNode;
  stakeholders: Stakeholder[];
  categoryIds: number[];
  toggleCategory: (categoryId: number) => void;
  loading: boolean;
  initialZoom: number;
}

const DesktopLayout: FC<DesktopLayoutProps> = ({
  filters,
  list,
  stakeholders,
  categoryIds,
  toggleCategory,
  loading,
  initialZoom,
}) => {
  const isFilterPanelOpen = useFilterPanel();
  const isListPanelOpen = useListPanel();
  const dispatch = useAppDispatch() as (action: any) => void;

  function getLeftPosition() {
    const leftPosition = isFilterPanelOpen ? "340px" : 0;
    const listLeftPosition = isFilterPanelOpen ? "-186px" : "-524px";
    return isListPanelOpen ? leftPosition : listLeftPosition;
  }
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    dispatch({ type: "TOGGLE_LIST_PANEL", listPanel: !isListPanelOpen });
  };
  const LightTooltip = styled(
    ({ className, ...props }: TooltipProps & { className?: string }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    )
  )(({ theme }) => ({
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
            initialZoom={initialZoom}
          />
        </Box>
      </Box>
    </>
  );
};

export default DesktopLayout;
