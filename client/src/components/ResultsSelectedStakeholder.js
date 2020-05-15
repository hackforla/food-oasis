import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapMarker from "./mapMarker";
import pantryIcon from "../images/pantryIcon.svg";
import mealIcon from "../images/mealIcon.svg";
import splitPantryMealIcon from "../images/splitPantryMealIcon.svg";
import fbIcon from "../images/fbIcon.png";
import instaIcon from "../images/instaIcon.png";

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
}));

const SelectedStakeholderDisplay = (props) => {
  const { doSelectStakeholder, selectedStakeholder } = props;
  const classes = useStyles();

  const standardTime = (timeStr) => {
    if (parseInt(timeStr.substring(0, 2)) === 12) {
      return `12${timeStr.substring(2, 5)}PM`;
    }
    return parseInt(timeStr.substring(0, 2)) > 12
      ? `${parseInt(timeStr.substring(0, 2)) - 12}${timeStr.substring(2, 5)}PM`
      : `${timeStr.substring(0, 5)}AM`;
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
          <img
            src={
              selectedStakeholder.categories[0].id === 1 &&
                selectedStakeholder.categories[1] &&
                selectedStakeholder.categories[1].id === 9
                ? splitPantryMealIcon
                : selectedStakeholder.categories[0].id === 1
                  ? pantryIcon
                  : mealIcon
            }
            alt="Organization Category Icon"
            className={classes.typeLogo}
          />
        </div>
        <div className={classes.infoHolder}>
          <span>{selectedStakeholder.name}</span>
          <span>{selectedStakeholder.address1}</span>
          <div>
            {selectedStakeholder.city} {selectedStakeholder.zip}
          </div>
          <em
            style={{
              color:
                selectedStakeholder.categories[0].id === 1
                  ? "#336699"
                  : "#CC3333",
            }}
          >
            {selectedStakeholder.categories[0].name}
          </em>
          {selectedStakeholder.categories[1] ? <em style={{
            color: "#CC3333",
          }}>
            {selectedStakeholder.categories[1].name}
          </em> : null}
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
              selectedStakeholder.categories[0].id === 1 &&
                selectedStakeholder.categories[1] &&
                selectedStakeholder.categories[1].id === 9
                ? ""
                : selectedStakeholder.categories[0].id === 1
                  ? "#336699"
                  : "#CC3333",
              selectedStakeholder.submittedDate ? true : false
            )}
        </div>
      </div>
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
              selectedStakeholder.categories[0].id === 1
                ? "#336699"
                : "#CC3333",
          }}
        >
          Directions
        </div>
      </a>
      <h2 className={classes.title}>Hours</h2>
      <div className={classes.hoursContainer}>
        {selectedStakeholder.hours.map((hour) => (
          <div
            key={JSON.stringify(hour)}
            className={classes.singleHourContainer}
          >
            <span>{hour.day_of_week}</span>
            <span>
              {standardTime(hour.open)}-{standardTime(hour.close)}
            </span>
          </div>
        ))}
      </div>
      {selectedStakeholder.phone ? (
        <React.Fragment>
          <h2 className={classes.title}>Phone</h2>
          <span className={classes.fontSize}>{selectedStakeholder.phone}</span>
        </React.Fragment>
      ) : null}
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
      {selectedStakeholder.requirements ? (
        <React.Fragment>
          <h2 className={classes.title}>Eligibility/Requirement</h2>
          <span className={classes.fontSize}>
            {selectedStakeholder.requirements}
          </span>
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
            selectedStakeholder.categories[0].id === 1 ? "#336699" : "#CC3333"
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

// address1: "1725 Beverly Boulevard"
// address2: "Ste 1-B"
// adminContactEmail: ""
// adminContactName: ""
// adminContactPhone: ""
// adminNotes: "could not find website or facebook page.↵called but no answer, mailbox is full"
// approvedDate: null
// assignedDate: null
// assignedLoginId: null
// assignedUser: ""
// categories: [{…}]
// categoryNotes: ""
// city: "Los Angeles"
// claimedDate: Moment {_isAMomentObject: true, _i: "2019-12-01T08:00:00", _f: "YYYY-MM-DDTHH:mm:ss", _isUTC: false, _pf: {…}, …}
// claimedLoginId: null
// claimedUser: ""
// covidNotes: ""
// createdDate: Moment {_isAMomentObject: true, _i: "2019-12-01T08:00:00", _f: "YYYY-MM-DDTHH:mm:ss", _isUTC: false, _pf: {…}, …}
// createdLoginId: null
// createdUser: ""
// description: ""
// distance: 0.6749636545572547
// donationAcceptFrozen: false
// donationAcceptPerishable: false
// donationAcceptRefrigerated: false
// donationContactEmail: ""
// donationContactName: ""
// donationContactPhone: ""
// donationDeliveryInstructions: ""
// donationNotes: ""
// donationPickup: false
// donationSchedule: ""
// eligibilityNotes: ""
// email: ""
// facebook: ""
// foodTypes: ""
// hours: (2) [{…}, {…}]
// id: 2893
// inactive: false
// instagram: ""
// items: ""
// languages: "English"
// latitude: 34.065401
// linkedin: ""
// longitude: -118.266495
// modifiedDate: Moment {_isAMomentObject: true, _i: "2020-04-18T17:01:39", _f: "YYYY-MM-DDTHH:mm:ss", _isUTC: false, _pf: {…}, …}
// modifiedLoginId: 106
// modifiedUser: "Webinar User"
// name: "Chinese Community Service Center"
// notes: ""
// parentOrganization: ""
// phone: "(323)483-3035"
// physicalAccess: ""
// pinterest: ""
// rejectedDate: null
// requirements: ""
// reviewNotes: ""
// reviewedLoginId: null
// reviewedUser: ""
// services: ""
// state: "CA"
// submittedDate: Moment {_isAMomentObject: true, _i: "2020-04-18T17:35:32", _f: "YYYY-MM-DDTHH:mm:ss", _isUTC: false, _pf: {…}, …}
// submittedLoginId: 106
// submittedUser: "Webinar User"
// twitter: ""
// website: ""
// zip: "90026"
