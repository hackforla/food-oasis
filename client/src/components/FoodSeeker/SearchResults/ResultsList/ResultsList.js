import { useState } from "react";
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

function getInitialState(loading, selectedOrganization) {
  if (loading) {
    return "loading";
  } else if (selectedOrganization) {
    return "details";
  }
  return "list";
}
const ResultsList = ({ stakeholders, loading, handleReset, handleFlyTo }) => {
  const selectedOrganization = useSelectedOrganization();
  const [view, setView] = useState(
    getInitialState(loading, selectedOrganization)
  ); // list, details, loading
  const [topMostIndex, setTopMostIndex] = useState(0);
  const { isDesktop } = useBreakpoints();

  useEffect(() => {
    analytics.postEvent("showList");
  }, []);

  useEffect(() => {
    if (selectedOrganization) {
      setView("details");
    }
  }, [selectedOrganization]);

  const renderView = () => {
    switch (view) {
      case "details":
        return <StakeholderDetails onBackClick={() => setView("list")} />;
      case "list":
        return (
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
            {stakeholders ? (
              <Box sx={{ width: 1, margin: 0, flex: 1 }}>
                <Virtuoso
                  initialTopMostItemIndex={topMostIndex}
                  data={stakeholders}
                  itemContent={(index, stakeholder) => {
                    return (
                      <Box
                        sx={{
                          borderBottom: ".2em solid #f1f1f1",
                        }}
                      >
                        <StakeholderPreview
                          stakeholder={stakeholder}
                          onSelect={() => {
                            setTopMostIndex(index);
                            handleFlyTo({
                              longitude: stakeholder.longitude,
                              latitude: stakeholder.latitude,
                            });
                          }}
                        />
                      </Box>
                    );
                  }}
                />
              </Box>
            ) : (
              <Stack sx={{ padding: "1em 0", alignContent: "center" }}>
                <Typography>
                  Sorry, we don&apos;t have any results for this area.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disableElevation
                >
                  Click here to reset the search
                </Button>
              </Stack>
            )}
          </>
        );
      case "loading":
        return (
          <Stack justifyContent="center" alignContent="center">
            <CircularProgress />
          </Stack>
        );
      default:
        return null;
    }
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
