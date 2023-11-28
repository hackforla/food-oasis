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

const ResultsList = ({ stakeholders, loading, handleReset }) => {
  const selectedOrganization = useSelectedOrganization();

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
        <Box sx={{ width: 1, margin: 0, flex: 1 }}>
          <Virtuoso
            data={stakeholders}
            itemContent={(index) => (
              <Box
                sx={{
                  width: 1,
                  borderBottom: ".2em solid #f1f1f1",
                  padding: "0",
                }}
              >
                <StakeholderPreview stakeholder={stakeholders[index]} />
              </Box>
            )}
          />
        </Box>
      )}
    </Stack>
  );
};

ResultsList.propTypes = {
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleReset: PropTypes.func,
};

export default ResultsList;
