import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import pantryIcon from "../images/pantryIcon.svg";
import mealIcon from "../images/mealIcon.svg";

const useStyles = makeStyles((theme) => ({
  stakeholderHolder: {
    width: "80%",
    display: "inherit",
    flexDirection: "inherit",
    justifyContent: "space-between",
    padding: "1em 0",
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
  },
  title: {
    alignSelf: "flex-start",
  },
  hoursContainer: {
    display: "inherit",
    flexDirection: "inherit",
    fontSize: "1.2em",
  },
  singleHourContainer: {
    width: "100%",
    display: "inherit",
    justifyContent: "space-between",
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

  console.log(doSelectStakeholder, selectedStakeholder);

  return (
    <div className={classes.stakeholderHolder}>
      <div className={classes.topInfoHolder}>
        <div className={classes.imgHolder}>
          <img
            src={
              selectedStakeholder.categories[0].id === 1 ? pantryIcon : mealIcon
            }
            className={classes.typeLogo}
            onClick={() => doSelectStakeholder(null)}
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
        </div>
        <div className={classes.checkHolder}>
          {selectedStakeholder.distance >= 10
            ? selectedStakeholder.distance
                .toString()
                .substring(0, 3)
                .padEnd(4, "0")
            : selectedStakeholder.distance.toString().substring(0, 3)}{" "}
          mi
        </div>
      </div>
      <h2 className={classes.title}>Hours</h2>
      <div className={classes.hoursContainer}>
        {selectedStakeholder.hours.map((hour) => (
          <div className={classes.singleHourContainer}>
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
          <span>{selectedStakeholder.phone}</span>
        </React.Fragment>
      ) : null}
      {selectedStakeholder.website ? (
        <React.Fragment>
          <h2 className={classes.title}>Website</h2>
          <a
            href={selectedStakeholder.website}
            target="_blank"
            url="noopener noreferrer"
          >
            {selectedStakeholder.website}
          </a>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default SelectedStakeholderDisplay;

// address1: "Logan St. and Sunset Blvd"
// address2: ""
// adminNotes: ""
// admin_contact_email: ""
// admin_contact_name: ""
// admin_contact_phone: ""
// approvedDate: null
// assignedDate: null
// assignedLoginId: null
// assignedUser: ""
// categories: [{…}]
// city: "Los Angeles"
// claimedDate: null
// claimedLoginId: null
// claimedUser: ""
// covid_notes: ""
// createdDate: "2019-12-01T08:00:00.000Z"
// createdLoginId: null
// createdUser: ""
// description: ""
// distance: 0.23975261461947162
// donation_accept_frozen: false
// donation_accept_perishable: false
// donation_accept_refrigerated: false
// donation_contact_email: ""
// donation_contact_name: ""
// donation_contact_phone: ""
// donation_delivery_instructions: ""
// donation_pickup: false
// donation_schedule: ""
// email: ""
// facebook: ""
// hours: [{…}]
// id: 2770
// inactive: false
// instagram: ""
// items: ""
// latitude: 34.0769
// linkedin: ""
// longitude: -118.2586
// modifiedDate: null
// modifiedLoginId: null
// modifiedUser: ""
// name: "Echo Park Farmers Market"
// notes: ""
// parentOrganization: ""
// phone: ""
// physicalAccess: ""
// pinterest: ""
// rejectedDate: null
// requirements: ""
// reviewNotes: ""
// reviewedLoginId: null
// reviewedUser: ""
// services: ""
// state: "California"
// twitter: ""
// verifiedDate: null
// verifiedLoginId: null
// verifiedUser: ""
// website: "https://www.facebook.com/Echo-Park-Farmers-Market-313522200882/"
// zip: "90026"
