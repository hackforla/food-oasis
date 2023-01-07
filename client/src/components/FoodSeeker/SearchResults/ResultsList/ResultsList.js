import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import List from "react-virtualized/dist/es/List";
import AutoSizer from "react-virtualized/dist/es/AutoSizer";
import CellMeasurer from "react-virtualized/dist/es/CellMeasurer";
import CellMeasurerCache from "react-virtualized/dist/es/CellMeasurer/CellMeasurerCache";
import StakeholderPreview from "../StakeholderPreview/StakeholderPreview";
import StakeholderDetails from "../StakeholderDetails/StakeholderDetails";
import * as analytics from "services/analytics";
import { Button } from "../../../UI";
import { useSelectedOrganization } from "../../../../appReducer";

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

const cache = new CellMeasurerCache({
  defaultHeight: 340,
  fixedWidth: true,
});

const clearCache = () => cache.clearAll();

const ResultsList = ({ stakeholders, loading, handleReset }) => {
  const classes = useStyles();
  const selectedOrganization = useSelectedOrganization();

  useEffect(() => {
    analytics.postEvent("showList");
  }, []);

  useEffect(() => {
    window.addEventListener("resize", clearCache);
    return () => window.removeEventListener("resize", clearCache);
  }, []);

  useEffect(() => {
    clearCache();
  }, [stakeholders]);

  const scrollToIndex = selectedOrganization
    ? stakeholders.findIndex((s) => s.id === selectedOrganization.id)
    : 0;

  const rowRenderer = useCallback(
    ({ index, style, key, parent }) => (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div ref={registerChild} style={style} className={classes.preview}>
            <StakeholderPreview stakeholder={stakeholders[index]} />
          </div>
        )}
      </CellMeasurer>
    ),
    [stakeholders, classes.preview]
  );

  return (
    <div className={classes.listContainer}>
      {loading && (
        <div className={classes.emptyResult}>
          <CircularProgress />
        </div>
      )}
      {!loading && stakeholders.length === 0 && (
        <div className={classes.emptyResult}>
          <p>Sorry, we don&apos;t have any results for this area.</p>
          <Button onClick={handleReset} disableElevation>
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
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={stakeholders.length}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                scrollToIndex={scrollToIndex}
              />
            )}
          </AutoSizer>
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
