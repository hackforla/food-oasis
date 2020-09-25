import React, { useRef } from "react";
import StakeholderDetails from "./StakeholderDetails";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pantryIcon from "../images/pantryIcon";
import mealIcon from "../images/mealIcon";
import splitPantryMealIcon from "../images/splitPantryMealIcon";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "../constants/stakeholder";
import StakeholderPreview from "./StakeholderPreview";

const useStyles = makeStyles((theme, props) => ({
  list: {
    textAlign: "center",
    fontSize: "12px",
    overflow: "scroll",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      order: 1,
      height: (props) => (props.isMobile ? "100%" : "30em"),
    },
  },
  stakeholderArray: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const iconReturn = (stakeholder) => {
  let isClosed = false;
  if (stakeholder.inactiveTemporary || stakeholder.inactive) isClosed = true;

  return stakeholder.categories.some(
    (category) => category.id === FOOD_PANTRY_CATEGORY_ID
  ) &&
    stakeholder.categories.some(
      (category) => category.id === MEAL_PROGRAM_CATEGORY_ID
    )
    ? splitPantryMealIcon(isClosed)
    : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
    ? pantryIcon(isClosed)
    : mealIcon(isClosed);
};

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
      <div className={classes.stakeholderArray}>
        <div ref={listRef}></div>
        {stakeholders &&
        selectedStakeholder &&
        !selectedStakeholder.inactive ? (
          <StakeholderDetails
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
            iconReturn={iconReturn}
            setToast={setToast}
          />
        ) : (
          stakeholders.map((stakeholder) => (
            <StakeholderPreview
              key={stakeholder.id}
              stakeholder={stakeholder}
              doSelectStakeholder={selectStakeholder}
              iconReturn={iconReturn}
            />
          ))
        )}
      </div>
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
