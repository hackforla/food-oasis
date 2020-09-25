import React, { useRef } from "react";
import StakeholderDetails from "./StakeholderDetails";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StakeholderPreview from "./StakeholderPreview";

const useStyles = makeStyles((theme, props) => ({
  list: {
    textAlign: "center",
    fontSize: "12px",
    overflow: "scroll",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      order: 1,
      height: (props) => (props.isMobile ? "100%" : "30em"),
    },
  },
}));

const ResultsList = ({
  doSelectStakeholder,
  selectedStakeholder,
  stakeholders,
  setToast,
  isMobile,
}) => {
  const classes = useStyles({ isMobile });

  const listRef = useRef();

  const selectStakeholder = (stakeholder) => {
    doSelectStakeholder(stakeholder);
    if (!isMobile && !!listRef) listRef.current.scrollIntoView();
  };

  return (
    <Grid item xs={12} md={4} className={classes.list}>
      <div ref={listRef}></div>
      {stakeholders && selectedStakeholder && !selectedStakeholder.inactive ? (
        <StakeholderDetails
          doSelectStakeholder={doSelectStakeholder}
          selectedStakeholder={selectedStakeholder}
          setToast={setToast}
        />
      ) : (
        stakeholders.map((stakeholder) => (
          <StakeholderPreview
            inList
            key={stakeholder.id}
            stakeholder={stakeholder}
            doSelectStakeholder={selectStakeholder}
          />
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
  isMobile: PropTypes.bool,
};

export default ResultsList;
