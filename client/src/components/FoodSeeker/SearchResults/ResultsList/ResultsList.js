import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import * as analytics from "services/analytics";
import { useSelectedOrganization } from "../../../../appReducer";
import StakeholderDetails from "../StakeholderDetails/StakeholderDetails";
import StakeholderPreview from "../StakeholderPreview/StakeholderPreview";
import useBreakpoints from "hooks/useBreakpoints";

const ResultsList = ({ stakeholders, loading, handleReset, handleFlyTo }) => {
  const selectedOrganization = useSelectedOrganization();
  const { isDesktop } = useBreakpoints();
  useEffect(() => {
    analytics.postEvent("showList");
  }, []);

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
      {loading && (
        <Stack justifyContent="center" alignContent="center">
          <CircularProgress />
        </Stack>
      )}
      {!loading && stakeholders.length === 0 && (
        <Stack sx={{ padding: "1em 0", alignContent: "center" }}>
          <Typography>
            Sorry, we don&apos;t have any results for this area.
          </Typography>
          <Button variant="outlined" onClick={handleReset} disableElevation>
            Click here to reset the search
          </Button>
        </Stack>
      )}
      {stakeholders &&
      selectedOrganization &&
      !selectedOrganization.inactive ? (
        <StakeholderDetails />
      ) : (
        <>
          {stakeholders.length > 0 && isDesktop && (
            <Typography
              sx={(theme) => ({
                width: 1,
                padding: "0.75rem 1em",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: { xs: "18px" },
                color: theme.palette.common.gray,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  borderBottom: `0.5px solid ${theme.palette.common.black}`,
                  pointerEvents: "none",
                  marginX: "1em",
                },
              })}
            >
              {stakeholders.length}{" "}
              {stakeholders.length === 1 ? "Location" : "Locations"}
            </Typography>
          )}
          <Box sx={{ width: 1, margin: 0, flex: 1 }}>
            <Virtuoso
              data={stakeholders}
              itemContent={(index) => {
                const stakeholder = stakeholders[index];
                return (
                  <Box
                    sx={{
                      width: 1,
                      borderBottom: ".2em solid #f1f1f1",
                      padding: "0",
                    }}
                  >
                    <StakeholderPreview
                      stakeholder={stakeholder}
                      handleFlyTo={() =>
                        handleFlyTo({
                          longitude: stakeholder.longitude,
                          latitude: stakeholder.latitude,
                        })
                      }
                    />
                  </Box>
                );
              }}
            />
          </Box>
        </>
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
