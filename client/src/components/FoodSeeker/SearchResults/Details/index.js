import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../../../components/UI";

import MapMarker from "images/mapMarker";
import StakeholderIcon from "images/stakeholderIcon";
import fbIcon from "images/fbIcon.png";
import instaIcon from "images/instaIcon.png";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
  VERIFICATION_STATUS,
} from "constants/stakeholder";
import { ORGANIZATION_COLORS, CLOSED_COLOR } from "constants/map";
import { extractNumbers, getGoogleMapsDirectionsUrl } from "helpers";

import { OriginCoordinatesContext } from "contexts/origin-coordinates-context";
import SuggestionDialog from "./SuggestionDialog";
import * as analytics from "services/analytics";

const useStyles = makeStyles((theme) => ({
  stakeholder: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "1em",
    alignItems: "center",
    paddingBottom: "5em",
    flexShrink: 0,
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  topInfo: {
    width: "100%",
    display: "inherit",
    justifyContent: "inherit",
  },
  info: {
    fontSize: "1.1em",
    textAlign: "left",
    width: "60%",
    display: "inherit",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  check: {
    width: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "flex-start",
  },
  hoursContainer: {
    width: "100%",
    display: "inherit",
    flexDirection: "inherit",
    fontSize: "1.2em",
  },
  singleHourContainer: {
    width: "100%",
    display: "inherit",
    justifyContent: "space-between",
    margin: ".8em 0",
  },
  fontSize: {
    fontSize: "14px",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  icon: {
    display: "flex",
    alignSelf: "flex-start",
  },
  icons: {
    alignSelf: "flex-start",
    margin: "0 1em 0 0",
  },
  arrow: {
    position: "fixed",
    bottom: "1em",
    left: "1em",
    alignSelf: "flex-start",
    margin: "1em 0 0 0",
    cursor: "pointer",
  },
  label: {
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
  buttons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  numbers: {
    display: "inline",
    alignSelf: "flex-start",
  },
  backButtonWrapper: {
    display: "inline",
    alignSelf: "flex-start",
    marginBottom: "1em",
    position: "sticky",
    top: "-0.1em",
    width: "100%",
    cursor: "pointer",
    backgroundColor: "#fafafa",
    zIndex: 10,
    textAlign: "left",
  },
  backButton: {
    paddingTop: "1em",
    paddingBottom: "1em",
    color: "blue",
    textDecoration: "underline",
    border: "none",
    backgroundColor: "#fafafa",
  },
}));

const StakeholderDetails = ({ selectedStakeholder, onClose, setToast }) => {
  const classes = useStyles();
  const [SuggestionDialogOpen, setSuggestionDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedStakeholder?.id) {
      analytics.postEvent("viewDetail", {
        id: selectedStakeholder.id,
        name: selectedStakeholder.name,
      });
    }
  }, [selectedStakeholder?.id, selectedStakeholder?.name]);

  const handleSuggestionDialogOpen = async () => {
    setSuggestionDialogOpen(true);
  };

  const handleSuggestionDialogClose = async () => {
    setSuggestionDialogOpen(false);
  };

  const dayOfWeek = (dayOfWeekString) => {
    switch (dayOfWeekString.toLowerCase()) {
      case "sun":
        return 1;
      case "mon":
        return 2;
      case "tue":
        return 3;
      case "wed":
        return 4;
      case "thu":
        return 5;
      case "fri":
        return 6;
      default:
        return 7;
    }
  };

  const hoursSort = (h1, h2) => {
    if (h1.week_of_month !== h2.week_of_month) {
      return h1.week_of_month < h2.week_of_month ? -1 : 1;
    }
    const h1dow = dayOfWeek(h1.day_of_week);
    const h2dow = dayOfWeek(h2.day_of_week);
    if (h1dow !== h2dow) {
      return h1dow < h2dow ? -1 : 1;
    }
    return h1.open < h2.open ? -1 : 1;
  };

  const standardTime = (timeStr) => {
    if (timeStr) {
      if (parseInt(timeStr.substring(0, 2)) === 12) {
        return `12${timeStr.substring(2, 5)} PM`;
      }
      return parseInt(timeStr.substring(0, 2)) > 12
        ? `${parseInt(timeStr.substring(0, 2)) - 12}${timeStr.substring(
            2,
            5
          )} PM`
        : `${timeStr.substring(0, 5)} AM`;
    }
  };

  const numbers = extractNumbers(selectedStakeholder.phone).map((n) => {
    if (n.number) {
      return (
        <a
          key={n.value}
          className={classes.fontSize}
          href={"tel:" + n.value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {n.value}
        </a>
      );
    } else {
      return <span key={n.value}> {n.value} </span>;
    }
  });

  return (
    <div className={classes.stakeholder}>
      <div className={classes.backButtonWrapper}>
        <button className={classes.backButton} onClick={onClose}>
          {" "}
          &lt; Back to List{" "}
        </button>
      </div>
      <SuggestionDialog
        id="assign-dialog"
        keepMounted
        open={SuggestionDialogOpen}
        onClose={handleSuggestionDialogClose}
        stakeholder={selectedStakeholder}
        setToast={setToast}
      />
      <div className={classes.topInfo}>
        <StakeholderIcon stakeholder={selectedStakeholder} />
        <div className={classes.info}>
          <span>{selectedStakeholder.name}</span>
          <span>{selectedStakeholder.address1}</span>
          <div>
            {selectedStakeholder.city} {selectedStakeholder.zip}
          </div>
          {selectedStakeholder.categories.map((category) => (
            <em
              key={category.id}
              style={{
                alignSelf: "flex-start",
                color:
                  selectedStakeholder.inactiveTemporary ||
                  selectedStakeholder.inactive
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
          <div className={classes.label}>
            <em
              key={selectedStakeholder.id}
              style={{
                alignSelf: "flex-start",
                margin: "0 0.25em 0.25em 0",
              }}
            >
              {selectedStakeholder.foodTypes}
            </em>
          </div>
          <div className={classes.label}>
            {selectedStakeholder.inactiveTemporary ||
            selectedStakeholder.inactive ? (
              <em className={classes.closedLabel}>
                {selectedStakeholder.inactiveTemporary
                  ? "Temporarily Closed"
                  : "Closed"}
              </em>
            ) : null}
          </div>
        </div>
        <div className={classes.check}>
          {selectedStakeholder.distance >= 10
            ? selectedStakeholder.distance
                .toString()
                .substring(0, 3)
                .padEnd(4, "0")
            : selectedStakeholder.distance.toString().substring(0, 3)}{" "}
          mi
          <MapMarker
            category={
              selectedStakeholder.categories[0].id ===
                FOOD_PANTRY_CATEGORY_ID &&
              selectedStakeholder.categories[1] &&
              selectedStakeholder.categories[1].id === MEAL_PROGRAM_CATEGORY_ID
                ? -1
                : selectedStakeholder.categories[0].id ===
                  FOOD_PANTRY_CATEGORY_ID
                ? 0
                : 1
            }
            inactive={
              selectedStakeholder.inactiveTemporary ||
              selectedStakeholder.inactive
                ? true
                : false
            }
          />
        </div>
      </div>
      {selectedStakeholder.verificationStatusId ===
      VERIFICATION_STATUS.VERIFIED ? (
        <p
          style={{
            color:
              selectedStakeholder.inactiveTemporary ||
              selectedStakeholder.inactive
                ? CLOSED_COLOR
                : selectedStakeholder.categories[0].id === 1
                ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
                : ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID],
          }}
        >
          Data updated on{" "}
          {selectedStakeholder.approvedDate
            ? selectedStakeholder.approvedDate.format("MMM Do, YYYY")
            : selectedStakeholder.modifiedDate
            ? selectedStakeholder.modifiedDate.format("MMM Do, YYYY")
            : selectedStakeholder.createdDate.format("MMM Do, YYYY")}
        </p>
      ) : null}
      <div className={classes.buttons}>
        <OriginCoordinatesContext.Consumer>
          {(origin) => (
            <Button
              variant="outlined"
              onClick={() => {
                analytics.postEvent("getDirections", {
                  id: selectedStakeholder.id,
                  name: selectedStakeholder.name,
                });
                window.open(
                  getGoogleMapsDirectionsUrl(origin, {
                    latitude: selectedStakeholder.latitude,
                    longitude: selectedStakeholder.longitude,
                  })
                );
              }}
            >
              Directions
            </Button>
          )}
        </OriginCoordinatesContext.Consumer>
        <Button variant="outlined" onClick={handleSuggestionDialogOpen}>
          Send Correction
        </Button>
      </div>
      {selectedStakeholder.hours ? (
        <>
          <h2 className={classes.title}>Hours</h2>
          <div className={classes.hoursContainer}>
            {selectedStakeholder.hours &&
            selectedStakeholder.hours.length > 0 ? (
              selectedStakeholder.hours.sort(hoursSort).map((hour) => (
                <div
                  key={JSON.stringify(hour)}
                  className={classes.singleHourContainer}
                >
                  <span>
                    {hour.week_of_month === 5
                      ? "Last " + hour.day_of_week
                      : hour.week_of_month === 1
                      ? "1st " + hour.day_of_week
                      : hour.week_of_month === 2
                      ? "2nd " + hour.day_of_week
                      : hour.week_of_month === 3
                      ? "3rd " + hour.day_of_week
                      : hour.week_of_month === 4
                      ? "4th " + hour.day_of_week
                      : hour.day_of_week}
                  </span>
                  <span>
                    {standardTime(hour.open)}-{standardTime(hour.close)}
                  </span>
                </div>
              ))
            ) : (
              <span className={classes.fontSize}>No hours on record</span>
            )}
          </div>
        </>
      ) : null}

      <h2 className={classes.title}>Phone</h2>
      {numbers.length ? (
        <div
          className={classes.numbers}
          onClick={() => {
            analytics.postEvent("dialPhone", {
              id: selectedStakeholder.id,
              name: selectedStakeholder.name,
            });
          }}
        >
          {numbers}
        </div>
      ) : (
        <span className={classes.fontSize}>No Phone Number on record</span>
      )}
      <h2 className={classes.title}>E-Mail</h2>
      {selectedStakeholder.email ? (
        <React.Fragment>
          <a
            className={classes.fontSize}
            href={"mailto:" + selectedStakeholder.email}
            onClick={() => {
              analytics.postEvent("sendEmail", {
                id: selectedStakeholder.id,
                name: selectedStakeholder.name,
              });
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedStakeholder.email}
          </a>
        </React.Fragment>
      ) : (
        <span className={classes.fontSize}>No E-Mail Address on record</span>
      )}

      <h2 className={classes.title}>Eligibility/Requirements</h2>
      {selectedStakeholder.requirements ? (
        <span className={classes.fontSize}>
          {selectedStakeholder.requirements}
        </span>
      ) : (
        <span className={classes.fontSize}>No special requirements</span>
      )}

      <h2 className={classes.title}>Languages</h2>
      {selectedStakeholder.languages ? (
        <span className={classes.fontSize}>
          {selectedStakeholder.languages}
        </span>
      ) : (
        <span className={classes.fontSize}>No information on languages.</span>
      )}

      <h2 className={classes.title}>Notes</h2>
      {selectedStakeholder.notes ? (
        <span className={classes.fontSize}>{selectedStakeholder.notes}</span>
      ) : (
        <span className={classes.fontSize}>No notes to display.</span>
      )}

      <h2 className={classes.title}>Covid Notes</h2>
      {selectedStakeholder.covidNotes ? (
        <span className={classes.fontSize}>
          {selectedStakeholder.covidNotes}
        </span>
      ) : (
        <span className={classes.fontSize}>No covid notes to display.</span>
      )}

      {selectedStakeholder.website ? (
        <React.Fragment>
          <h2 className={classes.title}>Website</h2>
          <a
            className={classes.fontSize}
            href={selectedStakeholder.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedStakeholder.website}
          </a>
        </React.Fragment>
      ) : null}

      {selectedStakeholder.services ? (
        <React.Fragment>
          <h2 className={classes.title}>Services</h2>
          <span className={classes.fontSize}>
            {selectedStakeholder.services}
          </span>
        </React.Fragment>
      ) : null}

      {selectedStakeholder.items ? (
        <React.Fragment>
          <h2 className={classes.title}>Items Available</h2>
          <span className={classes.fontSize}>{selectedStakeholder.items}</span>
        </React.Fragment>
      ) : null}

      {selectedStakeholder.facebook || selectedStakeholder.instagram ? (
        <React.Fragment>
          <h2 className={classes.title}>Social Media</h2>
          <div className={classes.icon}>
            {selectedStakeholder.facebook ? (
              <a
                className={classes.icons}
                href={selectedStakeholder.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="fb-logo" src={fbIcon} />
              </a>
            ) : null}
            {selectedStakeholder.instagram ? (
              <a
                className={classes.icons}
                href={selectedStakeholder.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="ig-logo" src={instaIcon} />
              </a>
            ) : null}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default StakeholderDetails;
