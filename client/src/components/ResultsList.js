import React from "react";
import SelectedStakeholderDisplay from "./ResultsSelectedStakeholder";
import PropTypes from "prop-types";
import moment from "moment";
import mapMarker from "./mapMarker";
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
    return stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID &&
      stakeholder.categories[1] &&
      stakeholder.categories[1].id === MEAL_PROGRAM_CATEGORY_ID
      ? splitPantryMealIconGrey
      : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
      ? pantryIconGrey
      : mealIconGrey;
  }
  return stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID &&
    stakeholder.categories[1] &&
    stakeholder.categories[1].id === MEAL_PROGRAM_CATEGORY_ID
    ? splitPantryMealIcon
    : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
    ? pantryIcon
    : mealIcon;
};

const isLastOccurrenceInMonth = (currentDay) => {
  const currentMonth = currentDay.month();
  if (currentDay.add(7, "days").month() !== currentMonth) {
    return true;
  }
};

const stakeholdersCurrentDaysHours = (stakeholder) => {
  const currentDay = moment();
  const currentDayOfWeek = currentDay.format("ddd");
  const dayOccurrenceInMonth = Math.ceil(currentDay.date() / 7); // In tandum with currentDayOfWeek tells us which week the day falls
  const currentTime = currentDay.format("HH:mm:ss");
  const currentDaysHoursOfOperation = stakeholder?.hours?.filter(
    (todaysHours) => {
      const hasHoursToday = currentDayOfWeek === todaysHours.day_of_week;
      const stakeholderOpenTime = moment(todaysHours.open, "HH:mm:ss").format(
        "HH:mm:ss"
      );
      const stakeholderClosingTime = moment(
        todaysHours.close,
        "HH:mm:ss"
      ).format("HH:mm:ss");
      const isOnlyOpenOnLastWeekOfMonth =
        hasHoursToday &&
        isLastOccurrenceInMonth(currentDay) &&
        todaysHours.week_of_month === 5;
      return (
        hasHoursToday &&
        currentTime >= stakeholderOpenTime &&
        currentTime < stakeholderClosingTime &&
        (todaysHours.week_of_month === 0 ||
          dayOccurrenceInMonth === todaysHours.week_of_month ||
          isOnlyOpenOnLastWeekOfMonth)
      );
    }
  );
  if (currentDaysHoursOfOperation?.length > 0) {
    return currentDaysHoursOfOperation;
  }
};

const calculateMinutesToClosing = (hours) => {
  const currentTime = moment().format("HH:mm:ss");
  return moment(hours[0].close, "HH:mm:ss").diff(
    moment(currentTime, "HH:mm:ss"),
    "minutes"
  );
};

const isAlmostClosed = (hours) => {
  const minutesToCloseFlag = 30;
  const minutesToClosing = calculateMinutesToClosing(hours);
  return minutesToClosing <= minutesToCloseFlag;
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
    <div className={classes.stakeholderArrayHolder}>
      {stakeholders && selectedStakeholder && !selectedStakeholder.inactive ? (
        <SelectedStakeholderDisplay
          doSelectStakeholder={doSelectStakeholder}
          selectedStakeholder={selectedStakeholder}
        />
      ) : stakeholders ? (
        stakeholders.map((stakeholder) => {
          const stakeholderHours = stakeholdersCurrentDaysHours(stakeholder);
          const isOpenFlag = !!stakeholderHours;
          const isAlmostClosedFlag =
            isOpenFlag && isAlmostClosed(stakeholderHours);
          const minutesToClosing =
            isAlmostClosedFlag && calculateMinutesToClosing(stakeholderHours);

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
                <em
                  style={{
                    color:
                      stakeholder.inactiveTemporary || stakeholder.inactive
                        ? "#545454"
                        : stakeholder.categories[0].id ===
                          MEAL_PROGRAM_CATEGORY_ID
                        ? "#CC3333"
                        : "#336699",
                  }}
                >
                  {stakeholder.categories[0].name}
                </em>
                <div className={classes.labelHolder}>
                  {stakeholder.categories[1] ? (
                    <em
                      style={{
                        alignSelf: "flex-start",
                        color:
                          stakeholder.categories[1].id ===
                          FOOD_PANTRY_CATEGORY_ID
                            ? "#336699"
                            : "#CC3333",
                      }}
                    >
                      {stakeholder.categories[1].name}
                    </em>
                  ) : null}
                  {stakeholder.inactiveTemporary || stakeholder.inactive ? (
                    <em className={classes.closedLabel}>
                      {stakeholder.inactiveTemporary
                        ? "Temporarily Closed"
                        : "Closed"}
                    </em>
                  ) : null}

                  {isOpenFlag &&
                  !(stakeholder.inactiveTemporary || stakeholder.inactive) ? (
                    <em className={classes.openIndicatorLabel}>OPEN</em>
                  ) : null}

                  {isAlmostClosedFlag &&
                  !(stakeholder.inactiveTemporary || stakeholder.inactive) &&
                  isAlmostClosedFlag ? (
                    <em className={classes.closingSoonIndicatorLabel}>
                      {`Closing in ${minutesToClosing} minutes`}
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
                    ? "#545454"
                    : stakeholder.categories[0].id ===
                        FOOD_PANTRY_CATEGORY_ID &&
                      stakeholder.categories[1] &&
                      stakeholder.categories[1].id === MEAL_PROGRAM_CATEGORY_ID
                    ? ""
                    : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
                    ? "#336699"
                    : "#CC3333",
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
  );
};

ResultsList.propTypes = {
  selectedStakeholder: PropTypes.object,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
};

export default ResultsList;
