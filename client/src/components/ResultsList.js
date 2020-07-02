import React from "react";
import SelectedStakeholderDisplay from "./ResultsSelectedStakeholder";
import PropTypes from "prop-types";
import moment from "moment";
import mapMarker from "./mapMarker";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pantryIcon from "../images/pantryIcon.svg";
import pantryIconGrey from "../images/pantryIconGrey.svg";
import mealIcon from "../images/mealIcon.svg";
import mealIconGrey from "../images/mealIconGrey.svg";
import splitPantryMealIcon from "../images/splitPantryMealIcon.svg";
import splitPantryMealIconGrey from "../images/splitPantryMealIconGrey.svg";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
  VERIFICATION_STATUS,
} from "../constants/stakeholder";
import { ORGANIZATION_COLORS, CLOSED_COLOR } from "../constants/map";

const useStyles = makeStyles((theme) => ({
  list: {
    textAlign: "center",
    fontSize: "12px",
    [theme.breakpoints.up("md")]: {
      overflow: "scroll",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  labelHolder: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  closedLabel: {
    color: "#545454",
    alignSelf: "flex-end",
    backgroundColor: "#E0E0E0",
    padding: ".25em .5em",
    borderRadius: "3px",
  },
  openIndicatorLabel: {
    color: "#fff",
    alignSelf: "flex-start",
    backgroundColor: "#008000",
    padding: ".25em",
    borderRadius: "3px",
    margin: ".25em 0",
  },
  closingSoonIndicatorLabel: {
    color: "#fff",
    alignSelf: "flex-start",
    backgroundColor: "#CC3333",
    padding: ".25em",
    borderRadius: "3px",
    margin: ".25em 0",
  },
}));

const iconReturn = (stakeholder) => {
  if (stakeholder.inactiveTemporary || stakeholder.inactive) {
    return stakeholder.categories.some(
      (category) => category.id === FOOD_PANTRY_CATEGORY_ID
    ) &&
      stakeholder.categories.some(
        (category) => category.id === MEAL_PROGRAM_CATEGORY_ID
      )
      ? splitPantryMealIconGrey
      : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
      ? pantryIconGrey
      : mealIconGrey;
  }
  return stakeholder.categories.some(
    (category) => category.id === FOOD_PANTRY_CATEGORY_ID
  ) &&
    stakeholder.categories.some(
      (category) => category.id === MEAL_PROGRAM_CATEGORY_ID
    )
    ? splitPantryMealIcon
    : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
    ? pantryIcon
    : mealIcon;
};

const ResultsList = ({
  doSelectStakeholder,
  selectedStakeholder,
  stakeholders,
  setSelectedPopUp,
  setIsPopupOpen,
  viewport,
  setViewport,
}) => {
  const classes = useStyles();

  const handleStakeholderClick = (stakeholder) => {
    doSelectStakeholder(stakeholder);
    setIsPopupOpen(true);
    setSelectedPopUp(stakeholder);
    setViewport({
      ...viewport,
      latitude: stakeholder.latitude,
      longitude: stakeholder.longitude,
    });
  };

  return (
    <Grid item xs={12} md={4} className={classes.list}>
      <div className={classes.stakeholderArrayHolder}>
        {stakeholders &&
        selectedStakeholder &&
        !selectedStakeholder.inactive ? (
          <SelectedStakeholderDisplay
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
          />
        ) : stakeholders ? (
          stakeholders.map((stakeholder) => {
            const currentDayOfWeek = moment().format("ddd");
            const currentTime = moment().format("HH:mm:ss");
            let isAlmostClosed;

            const currentDaysHoursOfOperation = stakeholder.hours.filter(
              (day) => {
                return (
                  currentDayOfWeek === day.day_of_week &&
                  currentTime >=
                    moment(day.open, "HH:mm:ss").format("HH:mm:ss") &&
                  currentTime < moment(day.close, "HH:mm:ss").format("HH:mm:ss")
                );
              }
            );

            isAlmostClosed =
              currentDaysHoursOfOperation[0] &&
              moment(currentDaysHoursOfOperation[0].close, "HH:mm:ss").diff(
                moment(currentTime, "HH:mm:ss"),
                "minutes"
              ) <= 30;

            return (
              <div
                className={classes.stakeholderHolder}
                key={stakeholder.id}
                onClick={() => handleStakeholderClick(stakeholder)}
              >
                <div className={classes.imgHolder}>
                  <img
                    src={iconReturn(stakeholder)}
                    alt={
                      stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
                        ? "Pantry Icon"
                        : "Meal Icon"
                    }
                    className={classes.typeLogo}
                  />
                </div>
                <div className={classes.infoHolder}>
                  <span>{stakeholder.name}</span>
                  <span>{stakeholder.address1}</span>
                  <div>
                    {stakeholder.city} {stakeholder.zip}
                  </div>
                  {stakeholder.categories.map((category) => (
                    <em
                      style={{
                        alignSelf: "flex-start",
                        color:
                          stakeholder.inactiveTemporary || stakeholder.inactive
                            ? CLOSED_COLOR
                            : category.id === FOOD_PANTRY_CATEGORY_ID
                            ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
                            : category.id === MEAL_PROGRAM_CATEGORY_ID
                            ? ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID]
                            : "#000",
                      }}
                    >
                      {category.name}
                    </em>
                  ))}
                  <div className={classes.labelHolder}>
                    {stakeholder.inactiveTemporary || stakeholder.inactive ? (
                      <em className={classes.closedLabel}>
                        {stakeholder.inactiveTemporary
                          ? "Temporarily Closed"
                          : "Closed"}
                      </em>
                    ) : null}

                    {currentDaysHoursOfOperation.length > 0 &&
                    !(stakeholder.inactiveTemporary || stakeholder.inactive) ? (
                      <em className={classes.openIndicatorLabel}>OPEN</em>
                    ) : null}

                    {currentDaysHoursOfOperation.length > 0 &&
                    !(stakeholder.inactiveTemporary || stakeholder.inactive) &&
                    isAlmostClosed ? (
                      <em className={classes.closingSoonIndicatorLabel}>
                        Closing Soon
                      </em>
                    ) : null}
                  </div>
                </div>
                <div className={classes.checkHolder}>
                  {stakeholder.distance >= 10
                    ? stakeholder.distance
                        .toString()
                        .substring(0, 3)
                        .padEnd(4, "0")
                    : stakeholder.distance.toString().substring(0, 3)}{" "}
                  mi
                  {mapMarker(
                    stakeholder.inactiveTemporary || stakeholder.inactive
                      ? CLOSED_COLOR
                      : stakeholder.categories[0].id ===
                          FOOD_PANTRY_CATEGORY_ID &&
                        stakeholder.categories[1] &&
                        stakeholder.categories[1].id ===
                          MEAL_PROGRAM_CATEGORY_ID
                      ? ""
                      : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
                      ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
                      : ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID],
                    stakeholder.verificationStatusId ===
                      VERIFICATION_STATUS.VERIFIED
                      ? true
                      : false,
                    stakeholder.inactiveTemporary || stakeholder.inactive
                      ? true
                      : false
                  )}
                </div>
              </div>
            );
          })
        ) : null}
      </div>
    </Grid>
  );
};

ResultsList.propTypes = {
  selectedStakeholder: PropTypes.object,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
};

export default ResultsList;
