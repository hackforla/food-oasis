import React from "react";
import SelectedStakeholderDisplay from "./ResultsSelectedStakehoder";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import pantryIcon from "../images/pantryIcon.svg";
import mealIcon from "../images/mealIcon.svg";

const useStyles = makeStyles((theme) => ({
  stakeholderArrayHolder: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stakeholderHolder: {
    width: "80%",
    minHeight: "6em",
    display: "inherit",
    justifyContent: "space-between",
    padding: "1em 0",
    borderBottom: " .2em solid #f1f1f1",
  },
  imgHolder: {
    display: "inherit",
    justifyContent: "center",
    alignItems: "center",
  },
  typeLogo: {
    width: "72px",
  },
  infoHolder: {
    fontSize: "1.1em",
    textAlign: "left",
    width: "60%",
    display: "inherit",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  checkHolder: {
    width: "10%",
  },
}));

const ResultsList = ({
  doSelectStakeholder,
  selectedStakeholder,
  stakeholders,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.stakeholderArrayHolder}>
      {stakeholders && selectedStakeholder ? (
        <SelectedStakeholderDisplay
          doSelectStakeholder={doSelectStakeholder}
          selectedStakeholder={selectedStakeholder}
        />
      ) : stakeholders ? (
        stakeholders.map((stakeholder) => (
          <div className={classes.stakeholderHolder}>
            <div className={classes.imgHolder}>
              <img
                src={stakeholder.categories[0].id === 1 ? pantryIcon : mealIcon}
                className={classes.typeLogo}
                onClick={() => doSelectStakeholder(stakeholder)}
              />
            </div>
            <div className={classes.infoHolder}>
              <span>{stakeholder.name}</span>
              <span>{stakeholder.address1}</span>
              <div>
                {stakeholder.city} {stakeholder.zip}
              </div>
              <em
                style={{
                  color:
                    stakeholder.categories[0].id === 1 ? "#336699" : "#CC3333",
                }}
              >
                {stakeholder.categories[0].name}
              </em>
            </div>
            <div className={classes.checkHolder}>
              {stakeholder.distance >= 10
                ? stakeholder.distance.toString().substring(0, 3).padEnd(4, "0")
                : stakeholder.distance.toString().substring(0, 3)}{" "}
              mi
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};

ResultsList.propTypes = {
  selectedStakeholder: PropTypes.object,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
};

export default ResultsList;
