import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress, Stack } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import StakeholderPreview from "../StakeholderPreview/StakeholderPreview";
import StakeholderDetails from "../StakeholderDetails/StakeholderDetails";
import * as analytics from "services/analytics";
import { useSelectedOrganization } from "../../../../appReducer";
import { Virtuoso } from "react-virtuoso";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
    padding: "1px", // This keeps the control width from infintely switching widths back and forth - have no idea why
  },
  list: {
    width: "100%",
    margin: 0,
    flex: 1,
  },
  preview: {
    width: "100%",
    borderBottom: " .2em solid #f1f1f1",
    padding: "0",
  },
  emptyResult: {
    padding: "1em 0",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
}));

const ResultsList = ({ stakeholders, loading, handleReset }) => {
  const classes = useStyles();
  const selectedOrganization = useSelectedOrganization();

  useEffect(() => {
    analytics.postEvent("showList");
  }, []);

  return (
    <div className={classes.listContainer}>
      {loading && (
        <Stack justifyContent="center" alignContent="center">
          <CircularProgress />
        </Stack>
      )}
      {!loading && stakeholders.length === 0 && (
        <div className={classes.emptyResult}>
          <p>Sorry, we don&apos;t have any results for this area.</p>
          <Button variant="outlined" onClick={handleReset} disableElevation>
            Click here to reset the search
          </Button>
        </div>
      )}
      {stakeholders &&
      selectedOrganization &&
      !selectedOrganization.inactive ? (
        <StakeholderDetails />
      ) : (
        <div className={classes.list}>
          <Virtuoso
            data={stakeholders}
            itemContent={(index) => (
              <div className={classes.preview}>
                <StakeholderPreview stakeholder={stakeholders[index]} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

ResultsList.propTypes = {
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleReset: PropTypes.func,
};

export default ResultsList;
