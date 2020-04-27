import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  stakeholderArrayHolder: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stakeholderHolder: {
    width: "80%",
    minHeight: "6em",
    display: "inherit",
    justifyContent: "space-between",
    padding: "1em 0",
    borderBottom: " .2em solid #f1f1f1"
  },
  typeLogo: {
    width: "20%",
    height: "auto",
    backgroundColor: "red"
  },
  infoHolder: {
    width: "75%",
    display: "inherit",
    flexDirection: "column",
    alignItems: "flex-start"
  }
}))

const ResultsList = ({ selectedStakeholder, stakeholders }) => {
  const classes = useStyles()

  React.useEffect(() => { console.log("list", stakeholders) }, [stakeholders])

  return <div className={classes.stakeholderArrayHolder}>
    {stakeholders ? stakeholders.map((stakeholder) =>
      <div className={classes.stakeholderHolder}>
        <div className={classes.typeLogo} />
        <div className={classes.infoHolder}>
          <span>{stakeholder.name}</span>
          <span>{stakeholder.address1}</span>
        </div>
      </div>
    ) : null}
  </div >
}

ResultsList.propTypes = {
  selectedStakeholder: PropTypes.object,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
};
export default ResultsList;

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