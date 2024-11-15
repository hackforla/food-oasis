import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useSelectedOrganization,
} from "../../../../appReducer";
import StakeholderDetails from "../StakeholderDetails/StakeholderDetails";
import StakeholderPreview from "../StakeholderPreview/StakeholderPreview";
import useBreakpoints from "hooks/useBreakpoints";
import { useMapbox } from "hooks/useMapbox";

const ResultsList = ({ stakeholders, loading, handleReset }) => {
  const selectedOrganization = useSelectedOrganization();
  const [topMostIndex, setTopMostIndex] = useState(0);
  const { isDesktop } = useBreakpoints();
  const dispatch = useAppDispatch();
  const { flyTo } = useMapbox();

  useEffect(() => {
    analytics.postEvent("showList");
  }, []);

  const renderView = () => {
    if (selectedOrganization)
      return (
        <StakeholderDetails
          onBackClick={() => dispatch({ type: "RESET_SELECTED_ORGANIZATION" })}
          isDesktop={isDesktop}
        />
      );

    if (loading) {
      return (
        <Stack justifyContent="center" alignContent="center">
          <CircularProgress />
        </Stack>
      );
    }

    return (
      <>
        {stakeholders.length > 0 && isDesktop && (
          <Stack sx={{ width: 1, padding: "0 35px 0 65px" }}>
            <Typography
              sx={(theme) => ({
                paddingTop: "1.4rem",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: { xs: "18px" },
                color: theme.palette.common.gray,
                position: "relative",
              })}
            >
              {stakeholders.length}{" "}
              {stakeholders.length === 1 ? "Location" : "Locations"}
            </Typography>
            <Divider
              sx={(theme) => ({
                background: theme.palette.common.black,
                marginTop: "16px",
              })}
            />
          </Stack>
        )}
        {stakeholders ? (
          <Box sx={{ width: 1, margin: 0, flex: 1 }}>
            <Virtuoso
              initialTopMostItemIndex={topMostIndex}
              data={stakeholders}
              itemContent={(index, stakeholder) => {
                return (
                  <>
                    <Box
                      sx={{
                        width: 1,
                        padding: "0",
                      }}
                    >
                      <StakeholderPreview
                        stakeholder={stakeholder}
                        onSelect={() => {
                          setTopMostIndex(index);
                          flyTo({
                            longitude: stakeholder.longitude,
                            latitude: stakeholder.latitude,
                          });
                        }}
                        isDesktop={isDesktop}
                      />
                    </Box>
                    <Divider sx={{ margin: "0 23px 0 65px" }} />
                  </>
                );
              }}
            />
          </Box>
        ) : (
          <Stack sx={{ padding: "1em 0", alignContent: "center" }}>
            <Typography>
              Sorry, we don&apos;t have any results for this area.
            </Typography>
            <Button variant="outlined" onClick={handleReset} disableElevation>
              Click here to reset the search
            </Button>
          </Stack>
        )}
      </>
    );
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        width: 1,
        height: 1,
        padding: "1px",
        textAlign: "center",
        fontSize: { sm: 12 },
      }}
    >
      {renderView()}
    </Stack>
  );
};

ResultsList.propTypes = {
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleReset: PropTypes.func,
  handleFlyTo: PropTypes.func,
};

export default ResultsList;
