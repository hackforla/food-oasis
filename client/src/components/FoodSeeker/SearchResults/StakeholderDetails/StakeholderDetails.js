import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
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
import CorrectionDialog from "./CorrectionDialog";
import * as analytics from "services/analytics";
import {
  useSelectedOrganization,
  useAppDispatch,
  useSearchCoordinates,
  useUserCoordinates,
  useWidget,
} from "../../../../appReducer";
import { useHistory } from "react-router-dom";
import { useToasterContext } from "../../../../contexts/toasterContext";
import SEO from "../../../SEO";
import { styled } from "@mui/material/styles";

const MinorHeading = styled(Typography)(({ theme }) => ({
  variant: "h5",
  component: "h3",
  textAlign: "left",
  margin: "0.5rem 0",
  fontWeight: "600",
  color: theme.palette.headingText.main,
}));

const DetailText = styled(Typography)(({ theme }) => ({
  variant: "body1",
  component: "p",
  textAlign: "left",
}));

const StakeholderDetails = () => {
  const [SuggestionDialogOpen, setSuggestionDialogOpen] = useState(false);
  const selectedOrganization = useSelectedOrganization();
  const dispatch = useAppDispatch();
  const searchCoordinates = useSearchCoordinates();
  const userCoordinates = useUserCoordinates();
  const originCoordinates = searchCoordinates || userCoordinates;
  const isWidget = useWidget();
  const history = useHistory();
  const { setToast } = useToasterContext();

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
    history.push(isWidget ? "/widget" : "/organizations");
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
        <DetailText key={n.value}>
          <Link
            textAlign="left"
            href={"tel:" + n.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {n.value}
          </Link>
        </DetailText>
      );
    } else {
      return <DetailText key={n.value}> {n.value} </DetailText>;
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

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Food Oasis",
          url: window.location.href,
          text: selectedOrganization.name,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setToast({
          message: "Copied to clipboard",
        });
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <>
      <SEO
        title={`Food Oasis: ${selectedOrganization.name}`}
        url={window.location.href}
      />
      <CorrectionDialog
        id="assign-dialog"
        keepMounted
        open={SuggestionDialogOpen}
        onClose={handleSuggestionDialogClose}
        stakeholder={selectedOrganization}
        setToast={setToast}
      />
      <Stack padding="0 1em 5em 1em" sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          component="p"
          textAlign="left"
          margin={"0 0 1rem 0"}
        >
          <Link
            variant="h4"
            component="button"
            textAlign="left"
            role="button"
            onClick={handleBackButtonClick}
          >
            <Stack direction="row" alignItems="center">
              <ArrowBack fontSize="small" />
              Back to List
            </Stack>
          </Link>
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <StakeholderIcon
            stakeholder={selectedOrganization}
            height="50px"
            width="50px"
          />
          <Box align="left">
            <Typography variant="h6" component="h2" align="left">
              {selectedOrganization.name}
            </Typography>
            <Typography variant="body1" component="p">
              {selectedOrganization.address1}
            </Typography>
            <Typography variant="body1" component="p">
              {selectedOrganization.city} {selectedOrganization.zip}
            </Typography>
            <Box textAlign="left">
              {selectedOrganization.categories.map((category) => (
                <Typography
                  variant="body1"
                  component="p"
                  fontStyle="italic"
                  key={selectedOrganization.id + category.id}
                  sx={{
                    margin: "0.25em 0",
                    marginRight: "0.25em",
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
                </Typography>
              ))}
            </Box>

            <Box textAlign="left">
              <Typography
                variant="body2"
                component="p"
                fontStyle="italic"
                key={selectedOrganization.id}
                sx={{
                  alignSelf: "flex-start",
                  margin: "0 0.25em 0.5em 0",
                }}
              >
                {selectedOrganization.foodTypes}
              </Typography>
            </Box>

            <Box textAlign="left">
              {selectedOrganization.inactiveTemporary ||
              selectedOrganization.inactive ? (
                <Typography
                  sx={{
                    color: "#545454",
                    alignSelf: "flex-end",
                    backgroundColor: "#E0E0E0",
                    padding: ".25em .5em",
                    borderRadius: "3px",
                  }}
                >
                  {selectedOrganization.inactiveTemporary
                    ? "Temporarily Closed"
                    : "Closed"}
                </Typography>
              ) : null}
            </Box>
          </Box>
          <Box>
            {selectedOrganization.distance >= 10
              ? selectedOrganization.distance
                  .toString()
                  .substring(0, 3)
                  .padEnd(4, "0")
              : selectedOrganization.distance.toString().substring(0, 3)}{" "}
            mi
          </Box>
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Button
            variant="outlined"
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
          <Button variant="outlined" onClick={handleSuggestionDialogOpen}>
            Send Correction
          </Button>
          <Button variant="outlined" onClick={shareLink}>
            Share
          </Button>
        </Stack>

        <MinorHeading>Eligibility/Requirements</MinorHeading>
        {selectedOrganization.requirements ? (
          <DetailText
            dangerouslySetInnerHTML={{
              __html: formatEmailPhone(selectedOrganization.requirements),
            }}
          ></DetailText>
        ) : (
          <DetailText>No special requirements</DetailText>
        )}

        <MinorHeading>Hours</MinorHeading>
        {selectedOrganization.allowWalkins ? (
          <DetailText>Walk-ins welcome.</DetailText>
        ) : null}

        {selectedOrganization.hoursNotes ? (
          <DetailText
            dangerouslySetInnerHTML={{
              __html: formatEmailPhone(selectedOrganization.hoursNotes),
            }}
          ></DetailText>
        ) : null}

        {selectedOrganization.hours ? (
          <Stack margin="0.5rem 1rem 0 1rem">
            {selectedOrganization.hours &&
            selectedOrganization.hours.length > 0 ? (
              selectedOrganization.hours.sort(hoursSort).map((hour) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  key={JSON.stringify(hour)}
                >
                  <DetailText>
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
                  </DetailText>
                  <DetailText>
                    {standardTime(hour.open)}-{standardTime(hour.close)}
                  </DetailText>
                </Stack>
              ))
            ) : (
              <DetailText>No hours on record</DetailText>
            )}
          </Stack>
        ) : null}

        <MinorHeading>Phone</MinorHeading>
        {numbers}

        <MinorHeading>Email</MinorHeading>
        {selectedOrganization.email ? (
          <React.Fragment>
            <DetailText>
              <Link
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
              </Link>
            </DetailText>
          </React.Fragment>
        ) : (
          <DetailText>No E-Mail Address on record</DetailText>
        )}

        <MinorHeading>Languages</MinorHeading>
        {selectedOrganization.languages ? (
          <DetailText>{selectedOrganization.languages}</DetailText>
        ) : (
          <DetailText>No information on languages.</DetailText>
        )}

        <MinorHeading>Notes</MinorHeading>
        {selectedOrganization.notes ? (
          <DetailText
            dangerouslySetInnerHTML={{
              __html: formatEmailPhone(selectedOrganization.notes),
            }}
          ></DetailText>
        ) : (
          <DetailText>No notes to display.</DetailText>
        )}

        <MinorHeading>COVID Notes</MinorHeading>
        {selectedOrganization.covidNotes ? (
          <DetailText
            dangerouslySetInnerHTML={{
              __html: formatEmailPhone(selectedOrganization.covidNotes),
            }}
          ></DetailText>
        ) : (
          <DetailText>No covid notes to display.</DetailText>
        )}

        {selectedOrganization.website ? (
          <>
            <MinorHeading>Website</MinorHeading>
            <DetailText>
              <Link
                href={selectedOrganization.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedOrganization.website}
              </Link>
            </DetailText>
          </>
        ) : null}

        {selectedOrganization.services ? (
          <>
            <MinorHeading>Services</MinorHeading>
            <DetailText>{selectedOrganization.services}</DetailText>
          </>
        ) : null}

        {selectedOrganization.items ? (
          <>
            <MinorHeading>Items Available</MinorHeading>
            <DetailText>{selectedOrganization.items}</DetailText>
          </>
        ) : null}

        {selectedOrganization.facebook || selectedOrganization.instagram ? (
          <>
            <MinorHeading>Social Media</MinorHeading>
            <Stack direction="row" spacing={1}>
              {selectedOrganization.facebook ? (
                <Link
                  href={selectedOrganization.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="facebook link" src={fbIcon} />
                </Link>
              ) : null}
              {selectedOrganization.instagram ? (
                <Link
                  href={selectedOrganization.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="instagram link" src={instaIcon} />
                </Link>
              ) : null}
            </Stack>
          </>
        ) : null}

        {selectedOrganization.verificationStatusId ===
        VERIFICATION_STATUS.VERIFIED ? (
          <DetailText color="primary.main">
            Data updated on{" "}
            {selectedOrganization.approvedDate
              ? selectedOrganization.approvedDate.format("MMM Do, YYYY")
              : selectedOrganization.modifiedDate
              ? selectedOrganization.modifiedDate.format("MMM Do, YYYY")
              : selectedOrganization.createdDate.format("MMM Do, YYYY")}
          </DetailText>
        ) : null}
      </Stack>
    </>
  );
};

export default StakeholderDetails;
