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
    <Stack>
      {stakeholders.length > 0 && (
        <Stack spacing={2}>
          <Typography
            pl={2}
            sx={(theme) => ({
              fontWeight: "bold",
              fontSize: { xs: "18px" },
              color: theme.palette.common.gray,
            })}
          >
            {stakeholders.length}{" "}
            {stakeholders.length === 1 ? "Location" : "Locations"}
          </Typography>
          <Divider
            sx={(theme) => ({
              background: theme.palette.common.black,
            })}
          />
        </Stack>
      )}
      {stakeholders ? (
        <Virtuoso
          initialTopMostItemIndex={topMostIndex}
          data={stakeholders}
          style={{
            height: "calc(100vh - 123px)",
            width: "100%",
          }}
          itemContent={(index, stakeholder) => {
            return (
              <>
                <Stack
                  key={stakeholder.id}
                  sx={{
                    minHeight: "6rem",
                    "&:hover": {
                      backgroundColor: "#cce3f2",
                    },
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
                  />
                  <Divider />
                </Stack>
              </>
            );
          }}
        />
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
