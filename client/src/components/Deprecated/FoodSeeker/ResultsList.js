import React, { useRef, useState, useEffect } from "react";
import StakeholderDetails from "components/FoodSeeker/StakeholderDetails";
import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StakeholderPreview from "components/FoodSeeker/StakeholderPreview";
import { isMobile } from "helpers";
import * as analytics from "../../services/analytics";
import { Button } from "../../../components/UI";

const useStyles = makeStyles((theme) => ({
  list: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    padding: "0 1em",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.only("sm")]: {
      order: 1,
      height: "30em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      fontSize: "12px",
    },
  },
  preview: {
    width: "100%",
    borderBottom: " .2em solid #f1f1f1",
  },
  emptyResult: {
    padding: "1em 0",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
}));

const ResultsList = ({
  doSelectStakeholder,
  selectedStakeholder,
  stakeholders,
  setToast,
  status,
  handleReset,
}) => {
  const classes = useStyles();
  const listRef = useRef();
  const itemsRef = useRef([]);

  const [position, setPosition] = useState(0);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, stakeholders.length);
  }, [stakeholders]);

  useEffect(() => {
    analytics.postEvent("showList");
  }, []);

  const mobileView = isMobile();

  const selectStakeholder = (stakeholder) => {
    doSelectStakeholder(stakeholder);
    if (stakeholder && mobileView) {
      const index = stakeholders.findIndex((s) => s.id === stakeholder.id);
      const currentRef = itemsRef.current[index];
      setPosition(currentRef.offsetTop);
      listRef.current.scrollTo(0, 0);
    }
    if (!stakeholder && mobileView) {
      window.scrollTo(0, 0);
      listRef.current.scrollTo(0, position);
    }
  };

  return (
    <Grid item xs={12} md={4} className={classes.list} ref={listRef}>
      {status === "loading" && (
        <div className={classes.emptyResult}>
          <CircularProgress />
        </div>
      )}
      {status === "loaded" && stakeholders.length === 0 && (
        <div className={classes.emptyResult}>
          <p>Sorry, we don&apos;t have any results for this area.</p>
          <Button onClick={handleReset} disableElevation>
            Click here to reset the search
          </Button>
        </div>
      )}
      {stakeholders && selectedStakeholder && !selectedStakeholder.inactive ? (
        <StakeholderDetails
          doSelectStakeholder={selectStakeholder}
          selectedStakeholder={selectedStakeholder}
          setToast={setToast}
        />
      ) : (
        stakeholders.map((stakeholder, i) => (
          <div
            key={stakeholder.id}
            className={classes.preview}
            ref={(el) => (itemsRef.current[i] = el)}
          >
            <StakeholderPreview
              stakeholder={stakeholder}
              doSelectStakeholder={selectStakeholder}
            />
          </div>
        ))
      )}
    </Grid>
  );
};

ResultsList.propTypes = {
  selectedStakeholder: PropTypes.object,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  doSelectStakeholder: PropTypes.func,
  setToast: PropTypes.func,
  status: PropTypes.string,
  handleReset: PropTypes.func,
};

export default ResultsList;
