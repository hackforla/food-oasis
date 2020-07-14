import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapMarker from "../images/mapMarker";
import fbIcon from "../images/fbIcon.png";
import instaIcon from "../images/instaIcon.png";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
  VERIFICATION_STATUS,
} from "../constants/stakeholder";
import { ORGANIZATION_COLORS, CLOSED_COLOR } from "../constants/map";

const useStyles = makeStyles((theme) => ({
  stakeholderHolder: {
    width: "80%",
    display: "inherit",
    flexDirection: "inherit",
    justifyContent: "space-between",
    padding: "1em 0",
    alignItems: "center",
  },
  topInfoHolder: {
    width: "100%",
    display: "inherit",
    justifyContent: "inherit",
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
  title: {
    alignSelf: "flex-start",
  },
  link: { textDecoration: "none" },
  directions: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "15em",
    height: "3em",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "10px",
    margin: "1em 0 0 0",
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
  iconHolder: {
    display: "flex",
    alignSelf: "flex-start",
  },
  icons: {
    alignSelf: "flex-start",
    margin: "0 1em 0 0",
  },
  arrow: {
    alignSelf: "flex-start",
    margin: "1em 0 0 0",
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
}));

const SelectedStakeholderDisplay = ({
  doSelectStakeholder,
  selectedStakeholder,
  iconReturn,
}) => {
  const classes = useStyles();

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

  const getGoogleMapsUrl = (zip, address1, address2) => {
    const baseUrl = `https://google.com/maps/place/`;

    const address1urlArray = address1.split(" ");
    const address1url = address1urlArray.reduce(
      (acc, currentWord) => `${acc}+${currentWord}`
    );

    if (address2) {
      const address2urlArray = address2.split(" ");
      const address2url = address2urlArray.reduce(
        (acc, currentWord) => `${acc}+${currentWord}`
      );
      return `${baseUrl}${address1url},+${address2url},+${zip}`;
    }

    return `${baseUrl}${address1url},+${zip}`;
  };

  return (
    <div className={classes.stakeholderHolder}>
      <div className={classes.topInfoHolder}>
        <div className={classes.imgHolder}>
          {iconReturn(selectedStakeholder)}
        </div>
        <div className={classes.infoHolder}>
          <span>{selectedStakeholder.name}</span>
          <span>{selectedStakeholder.address1}</span>
          <div>
            {selectedStakeholder.city} {selectedStakeholder.zip}
          </div>
          {selectedStakeholder.categories.map((category) => (
            <em
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
          <div className={classes.labelHolder}>
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
        <div className={classes.checkHolder}>
          {selectedStakeholder.distance >= 10
            ? selectedStakeholder.distance
                .toString()
                .substring(0, 3)
                .padEnd(4, "0")
            : selectedStakeholder.distance.toString().substring(0, 3)}{" "}
          mi
          {mapMarker(
            selectedStakeholder.inactiveTemporary ||
              selectedStakeholder.inactive
              ? CLOSED_COLOR
              : selectedStakeholder.categories[0].id ===
                  FOOD_PANTRY_CATEGORY_ID &&
                selectedStakeholder.categories[1] &&
                selectedStakeholder.categories[1].id ===
                  MEAL_PROGRAM_CATEGORY_ID
              ? ""
              : selectedStakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
              ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
              : ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID],
            selectedStakeholder.verificationStatusId ===
              VERIFICATION_STATUS.VERIFIED
              ? true
              : false,
            selectedStakeholder.inactiveTemporary ||
              selectedStakeholder.inactive
              ? true
              : false
          )}
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
      <a
        className={classes.link}
        href={getGoogleMapsUrl(
          selectedStakeholder.zip,
          selectedStakeholder.address1,
          selectedStakeholder.address2 || null
        )}
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={classes.directions}
          style={{
            backgroundColor:
              selectedStakeholder.inactiveTemporary ||
              selectedStakeholder.inactive
                ? CLOSED_COLOR
                : selectedStakeholder.categories[0].id === 1
                ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
                : ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID],
          }}
        >
          Directions
        </div>
      </a>
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
      {selectedStakeholder.phone ? (
        <span className={classes.fontSize}>{selectedStakeholder.phone}</span>
      ) : (
        <span className={classes.fontSize}>No Phone Number on record</span>
      )}
      <h2 className={classes.title}>E-Mail</h2>
      {selectedStakeholder.email ? (
        <span className={classes.fontSize}>{selectedStakeholder.email}</span>
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
          <div className={classes.iconHolder}>
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
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => doSelectStakeholder(null)}
        className={classes.arrow}
      >
        <circle
          cx="20"
          cy="20"
          r="20"
          fill={
            selectedStakeholder.inactiveTemporary ||
            selectedStakeholder.inactive
              ? CLOSED_COLOR
              : selectedStakeholder.categories[0].id === 1
              ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
              : ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID]
          }
        />
        <path
          d="M5.38477 19.6153L19.8078 11.2882L19.8078 27.9425L5.38477 19.6153Z"
          fill="white"
        />
        <line
          x1="19.2309"
          y1="18.8076"
          x2="31.5386"
          y2="18.8076"
          stroke="white"
          stroke-width="7"
        />
      </svg>
    </div>
  );
};

export default SelectedStakeholderDisplay;
