import React, { useRef, useState, useEffect } from "react";
import StakeholderDetails from "components/Stakeholder/StakeholderDetails";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StakeholderPreview from "components/Stakeholder/StakeholderPreview";
import { isMobile } from "helpers";

const useStyles = makeStyles((theme, props) => ({
  list: {
    textAlign: "center",
    fontSize: "12px",
    overflow: "scroll",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 2em",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      order: 1,
      height: (props) => (props.isMobile ? "100%" : "30em"),
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
  const classes = useStyles({ isMobile });
  const listRef = useRef();
  const itemsRef = useRef([]);

  const [position, setPosition] = useState(0);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, stakeholders.length);
  }, [stakeholders]);

  const selectStakeholder = (stakeholder) => {
    doSelectStakeholder(stakeholder);
    if (stakeholder && isMobile) {
      const index = stakeholders.findIndex((s) => s.id === stakeholder.id);
      const currentRef = itemsRef.current[index];
      setPosition(currentRef.offsetTop);
      listRef.current.scrollTo(0, 0);
    }
    if (!stakeholder && isMobile) {
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
