import React from "react";
import SelectedStakeholderDisplay from "./ResultsSelectedStakeholder";
import PropTypes from "prop-types";
import moment from "moment";
import mapMarker from "../images/mapMarker";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pantryIcon from "../images/pantryIcon";
import mealIcon from "../images/mealIcon";
import splitPantryMealIcon from "../images/splitPantryMealIcon";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "../constants/stakeholder";
import { ORGANIZATION_COLORS, CLOSED_COLOR } from "../constants/map";

const useStyles = makeStyles((theme) => ({
  list: {
    textAlign: "center",
    fontSize: "12px",
    overflow: "scroll",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      order: 1,
      height: "30em",
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
  const currentDaysHoursOfOperation = stakeholder?.hours.filter(
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
  const currentTime = moment().format("HH:mm");
  return moment(hours[0].close, "HH:mm").diff(
    moment(currentTime, "HH:mm"),
    "minutes"
  );
};

const isAlmostClosed = (hours) => {
  const minutesToCloseFlag = 60;
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
    <Grid item xs={12} md={4} className={classes.list}>
      <div className={classes.stakeholderArrayHolder}>
        {stakeholders &&
        selectedStakeholder &&
        !selectedStakeholder.inactive ? (
          <SelectedStakeholderDisplay
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
            iconReturn={iconReturn}
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
                  {iconReturn(stakeholder)}
                </div>
                <div className={classes.infoHolder}>
                  <span>{stakeholder.name}</span>
                  <span>{stakeholder.address1}</span>
                  <div>
                    {stakeholder.city} {stakeholder.zip}
                  </div>
                  {stakeholder.categories.map((category) => (
                    <em
                      key={stakeholder.id + category.id}
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
                          : "Permanently Closed"}
                      </em>
                    ) : null}

                    {isOpenFlag &&
                    !(stakeholder.inactiveTemporary || stakeholder.inactive) ? (
                      <em className={classes.openIndicatorLabel}>OPEN NOW</em>
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
                    stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID &&
                      stakeholder.categories[1] &&
                      stakeholder.categories[1].id === MEAL_PROGRAM_CATEGORY_ID
                      ? -1
                      : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
                      ? 0
                      : 1,
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
