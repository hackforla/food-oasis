import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../../UI";
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
import SuggestionDialog from "./SuggestionDialog";
import * as analytics from "services/analytics";
import {
  useSelectedOrganization,
  useAppDispatch,
  useSearchCoordinates,
  useUserCoordinates,
} from "../../../../appReducer";
import { useHistory } from "react-router-dom";

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
    fontSize: "1.1em",
  },
  singleHourContainer: {
    width: "100%",
    display: "inherit",
    justifyContent: "space-between",
    margin: ".2em 0",
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
  button: {
    borderColor: theme.palette.primary.translucent,
    "&:hover": {
      background: theme.palette.primary.main,
    },
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
    fontSize: "1.2em",
    fontWeight: "bold",
    paddingTop: "1em",
    paddingBottom: "1em",
    color: "blue",
    textDecoration: "underline",
    border: "none",
    backgroundColor: "#fafafa",
  },
}));

const StakeholderDetails = () => {
  const classes = useStyles();
  const [SuggestionDialogOpen, setSuggestionDialogOpen] = useState(false);
  const selectedOrganization = useSelectedOrganization();
  const dispatch = useAppDispatch();
  const searchCoordinates = useSearchCoordinates();
  const userCoordinates = useUserCoordinates();
  const originCoordinates = searchCoordinates || userCoordinates;
  const history = useHistory();

  useEffect(() => {
    if (selectedOrganization?.id) {
      analytics.postEvent("viewDetail", {
        id: selectedOrganization.id,
        name: selectedOrganization.name,
      });
    }
  }, [selectedOrganization?.id, selectedOrganization?.name]);

  const handleSuggestionDialogOpen = async () => {
    setSuggestionDialogOpen(true);
  };

  const handleSuggestionDialogClose = async () => {
    setSuggestionDialogOpen(false);
  };

  const handleBackButtonClick = () => {
    dispatch({ type: "RESET_SELECTED_ORGANIZATION" });
    history.push("/organizations");
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

  const numbers = extractNumbers(selectedOrganization.phone).map((n) => {
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

  const formatEmailPhone = (text) => {
    const phoneRegEx =
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;
    const emailRegEx = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    const phoneMatches = text.match(phoneRegEx);
    const emailMatches = text.match(emailRegEx);
    if (phoneMatches) {
      phoneMatches.forEach((match) => {
        text = text.replace(
          match,
          `<a key=${match} href="tel:${match}">${match}</a>`
        );
      });
    }
    if (emailMatches) {
      emailMatches.forEach((match) => {
        text = text.replace(
          match,
          `<a key=${match} href="mailto:${match}">${match}</a>`
        );
      });
    }
    return text;
  };

  return (
    <div className={classes.stakeholder}>
      <div className={classes.backButtonWrapper}>
        <div
          role="button"
          className={classes.backButton}
          onClick={handleBackButtonClick}
        >
          {" "}
          &lt; Back to List{" "}
        </div>
      </div>
      <SuggestionDialog
        id="assign-dialog"
        keepMounted
        open={SuggestionDialogOpen}
        onClose={handleSuggestionDialogClose}
        stakeholder={selectedOrganization}
      />
      <div className={classes.topInfo}>
        <StakeholderIcon
          stakeholder={selectedOrganization}
          height="50px"
          width="50px"
        />
        <div className={classes.info}>
          <span>{selectedOrganization.name}</span>
          <span>{selectedOrganization.address1}</span>
          <div>
            {selectedOrganization.city} {selectedOrganization.zip}
          </div>
          {selectedOrganization.categories.map((category) => (
            <em
              key={category.id}
              style={{
                alignSelf: "flex-start",
                color:
                  selectedOrganization.inactiveTemporary ||
                  selectedOrganization.inactive
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
              key={selectedOrganization.id}
              style={{
                alignSelf: "flex-start",
                margin: "0 0.25em 0.25em 0",
              }}
            >
              {selectedOrganization.foodTypes}
            </em>
          </div>
          <div className={classes.label}>
            {selectedOrganization.inactiveTemporary ||
            selectedOrganization.inactive ? (
              <em className={classes.closedLabel}>
                {selectedOrganization.inactiveTemporary
                  ? "Temporarily Closed"
                  : "Closed"}
              </em>
            ) : null}
          </div>
        </div>
        <div className={classes.check}>
          {selectedOrganization.distance >= 10
            ? selectedOrganization.distance
                .toString()
                .substring(0, 3)
                .padEnd(4, "0")
            : selectedOrganization.distance.toString().substring(0, 3)}{" "}
          mi
        </div>
      </div>
      {selectedOrganization.verificationStatusId ===
      VERIFICATION_STATUS.VERIFIED ? (
        <p
          style={{
            color:
              selectedOrganization.inactiveTemporary ||
              selectedOrganization.inactive
                ? CLOSED_COLOR
                : selectedOrganization.categories[0].id === 1
                ? ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
                : ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID],
          }}
        >
          Data updated on{" "}
          {selectedOrganization.approvedDate
            ? selectedOrganization.approvedDate.format("MMM Do, YYYY")
            : selectedOrganization.modifiedDate
            ? selectedOrganization.modifiedDate.format("MMM Do, YYYY")
            : selectedOrganization.createdDate.format("MMM Do, YYYY")}
        </p>
      ) : null}
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => {
            analytics.postEvent("getDirections", {
              id: selectedOrganization.id,
              name: selectedOrganization.name,
            });
            window.open(
              getGoogleMapsDirectionsUrl(originCoordinates, {
                latitude: selectedOrganization.latitude,
                longitude: selectedOrganization.longitude,
              })
            );
          }}
        >
          Directions
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={handleSuggestionDialogOpen}
        >
          Send Correction
        </Button>
      </div>

      <h2 className={classes.title}>Eligibility/Requirements</h2>
      {selectedOrganization.requirements ? (
        <span
          className={classes.fontSize}
          dangerouslySetInnerHTML={{
            __html: formatEmailPhone(selectedOrganization.requirements),
          }}
        ></span>
      ) : (
        <div className={classes.fontSize}>No special requirements</div>
      )}

      <h2 className={classes.title}>Hours</h2>
      {selectedOrganization.allowWalkins ? (
        <div className={classes.fontSize}>Walk-ins welcome.</div>
      ) : null}

      {selectedOrganization.hoursNotes ? (
        <div
          className={classes.fontSize}
          dangerouslySetInnerHTML={{
            __html: formatEmailPhone(selectedOrganization.hoursNotes),
          }}
        ></div>
      ) : null}
      {selectedOrganization.hours ? (
        <>
          <div className={classes.hoursContainer}>
            {selectedOrganization.hours &&
            selectedOrganization.hours.length > 0 ? (
              selectedOrganization.hours.sort(hoursSort).map((hour) => (
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
              id: selectedOrganization.id,
              name: selectedOrganization.name,
            });
          }}
        >
          {numbers}
        </div>
      ) : (
        <span className={classes.fontSize}>No Phone Number on record</span>
      )}
      <h2 className={classes.title}>E-Mail</h2>
      {selectedOrganization.email ? (
        <React.Fragment>
          <a
            className={classes.fontSize}
            href={"mailto:" + selectedOrganization.email}
            onClick={() => {
              analytics.postEvent("sendEmail", {
                id: selectedOrganization.id,
                name: selectedOrganization.name,
              });
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedOrganization.email}
          </a>
        </React.Fragment>
      ) : (
        <span className={classes.fontSize}>No E-Mail Address on record</span>
      )}

      <h2 className={classes.title}>Languages</h2>
      {selectedOrganization.languages ? (
        <span className={classes.fontSize}>
          {selectedOrganization.languages}
        </span>
      ) : (
        <span className={classes.fontSize}>No information on languages.</span>
      )}

      <h2 className={classes.title}>Notes</h2>
      {selectedOrganization.notes ? (
        <span
          className={classes.fontSize}
          dangerouslySetInnerHTML={{
            __html: formatEmailPhone(selectedOrganization.notes),
          }}
        ></span>
      ) : (
        <span className={classes.fontSize}>No notes to display.</span>
      )}

      <h2 className={classes.title}>Covid Notes</h2>
      {selectedOrganization.covidNotes ? (
        <span
          className={classes.fontSize}
          dangerouslySetInnerHTML={{
            __html: formatEmailPhone(selectedOrganization.covidNotes),
          }}
        ></span>
      ) : (
        <span className={classes.fontSize}>No covid notes to display.</span>
      )}

      {selectedOrganization.website ? (
        <React.Fragment>
          <h2 className={classes.title}>Website</h2>
          <a
            className={classes.fontSize}
            href={selectedOrganization.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedOrganization.website}
          </a>
        </React.Fragment>
      ) : null}

      {selectedOrganization.services ? (
        <React.Fragment>
          <h2 className={classes.title}>Services</h2>
          <span className={classes.fontSize}>
            {selectedOrganization.services}
          </span>
        </React.Fragment>
      ) : null}

      {selectedOrganization.items ? (
        <React.Fragment>
          <h2 className={classes.title}>Items Available</h2>
          <span className={classes.fontSize}>{selectedOrganization.items}</span>
        </React.Fragment>
      ) : null}

      {selectedOrganization.facebook || selectedOrganization.instagram ? (
        <React.Fragment>
          <h2 className={classes.title}>Social Media</h2>
          <div className={classes.icon}>
            {selectedOrganization.facebook ? (
              <a
                className={classes.icons}
                href={selectedOrganization.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="fb-logo" src={fbIcon} />
              </a>
            ) : null}
            {selectedOrganization.instagram ? (
              <a
                className={classes.icons}
                href={selectedOrganization.instagram}
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
