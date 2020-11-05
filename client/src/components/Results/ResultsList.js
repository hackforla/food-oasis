import React, { useRef, useState, useEffect } from "react";
import StakeholderDetails from "components/Stakeholder/StakeholderDetails";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StakeholderPreview from "components/Stakeholder/StakeholderPreview";
import { isMobile } from "helpers";

const useStyles = makeStyles((theme) => ({
  list: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1em",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      overflowY: "scroll",
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
}));

const ResultsList = ({
  doSelectStakeholder,
  selectedStakeholder,
  stakeholders,
  setToast,
}) => {
  const classes = useStyles();
  const listRef = useRef();
  const itemsRef = useRef([]);

  const [position, setPosition] = useState(0);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, stakeholders.length);
  }, [stakeholders]);

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
};

export default ResultsList;
