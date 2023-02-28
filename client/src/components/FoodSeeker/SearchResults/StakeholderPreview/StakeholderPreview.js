import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import * as momentTz from "moment-timezone";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { SecondaryButton } from "../../../UI/StandardButton";
import { useSiteContext } from "contexts/siteContext";

import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";
import { ORGANIZATION_COLORS, CLOSED_COLOR } from "constants/map";
import { getGoogleMapsDirectionsUrl, extractNumbers } from "helpers";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useSearchCoordinates,
  useUserCoordinates,
} from "../../../../appReducer";
import StakeholderIcon from "images/stakeholderIcon";
import { useHistory, useLocation } from "react-router-dom";

const TENANT_TIME_ZONES = {
  1: "America/Los_Angeles",
  2: "America/Los_Angeles",
  3: "Pacific/Honolulu",
  4: "America/Los_Angeles",
  5: "America/Chicago",
  6: "America/Los_Angeles",
};

const isLastOccurrenceInMonth = (currentDay) => {
  const currentMonth = currentDay.month();
  if (currentDay.add(7, "days").month() !== currentMonth) {
    return true;
  }
};

const stakeholdersCurrentDaysHours = (stakeholder, tenantTimeZone) => {
  const currentDay = momentTz().tz(tenantTimeZone);
  const currentDayOfWeek = currentDay.format("ddd");
  const dayOccurrenceInMonth = Math.ceil(currentDay.format("DD") / 7); // In tandum with currentDayOfWeek tells us which week the day falls
  const currentTime = currentDay.format("HH:mm:ss");
  const currentDaysHoursOfOperation =
    stakeholder.hours &&
    stakeholder.hours.filter((todaysHours) => {
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
    });
  if (currentDaysHoursOfOperation?.length > 0) {
    return currentDaysHoursOfOperation;
  }
};

const calculateMinutesToClosing = (hours, tenantTimeZone) => {
  const currentTime = momentTz().tz(tenantTimeZone).format("HH:mm");
  return moment(hours[0].close, "HH:mm").diff(
    moment(currentTime, "HH:mm"),
    "minutes"
  );
};

const isAlmostClosed = (hours, tenantTimeZone) => {
  const minutesToCloseFlag = 60;
  const minutesToClosing = calculateMinutesToClosing(hours, tenantTimeZone);
  return minutesToClosing <= minutesToCloseFlag;
};

const StakeholderPreview = ({ stakeholder }) => {
  const dispatch = useAppDispatch();
  const searchCoordinates = useSearchCoordinates();
  const userCoordinates = useUserCoordinates();
  const originCoordinates = searchCoordinates || userCoordinates;
  const { tenantId } = useSiteContext();
  const tenantTimeZone = TENANT_TIME_ZONES[tenantId];
  const history = useHistory();
  const location = useLocation();

  const handleSelectOrganization = (organization) => {
    dispatch({ type: "SELECTED_ORGANIZATION_UPDATED", organization });
    analytics.postEvent("selectOrganization", {
      id: organization.id,
      name: organization.name,
    });

    //Update url history
    const name = organization.name.toLowerCase().replaceAll(" ", "_");
    history.push(
      `${location.pathname}?latitude=${organization.latitude}&longitude=${organization.longitude}&org=${name}&id=${organization.id}`
    );
  };

  const mainNumber = extractNumbers(stakeholder.phone).find((n) => n.number);

  const stakeholderHours = stakeholdersCurrentDaysHours(
    stakeholder,
    tenantTimeZone
  );
  const isOpenFlag = !!stakeholderHours;
  const showAllowWalkinsFlag = stakeholder.allowWalkins;
  const isAlmostClosedFlag =
    isOpenFlag && isAlmostClosed(stakeholderHours, tenantTimeZone);
  const minutesToClosing =
    isAlmostClosedFlag &&
    calculateMinutesToClosing(stakeholderHours, tenantTimeZone);

  return (
    <Grid2
      container
      spacing={0}
      key={stakeholder.id}
      sx={{
        width: "100%",
        minHeight: "6rem",
        padding: "0.5rem",
      }}
    >
      <Grid2 xs={2}>
        <Stack
          xs={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ marginTop: ".2rem", height: "100%" }}
        >
          <StakeholderIcon
            stakeholder={stakeholder}
            height="50px"
            width="50px"
          />
          {stakeholder.distance ? (
            <Typography variant="body2" component="p">
              {stakeholder.distance >= 10
                ? stakeholder.distance.toString().substring(0, 3).padEnd(4, "0")
                : stakeholder.distance.toString().substring(0, 3)}{" "}
              mi
            </Typography>
          ) : null}
        </Stack>
      </Grid2>

      <Grid2 xs={10}>
        <Stack direction="column" xs={10}>
          <Typography variant="h6" component="h2" align="left">
            {stakeholder.name}
          </Typography>
          <Box textAlign="left">
            {stakeholder.categories.map((category) => (
              <Typography
                variant="body2"
                fontStyle="italic"
                key={stakeholder.id + category.id}
                sx={{
                  margin: "0.25em 0",
                  marginRight: "0.25em",
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
              </Typography>
            ))}
          </Box>
          <Box textAlign="left">
            <Typography
              variant="body2"
              component="p"
              fontStyle="italic"
              key={stakeholder.id}
              sx={{
                alignSelf: "flex-start",
                margin: "0 0.25em 0.5em 0",
              }}
            >
              {stakeholder.foodTypes}
            </Typography>
          </Box>

          <Box textAlign="left">
            {stakeholder.inactiveTemporary || stakeholder.inactive ? (
              <Chip
                color="#545454"
                backgroundColor="#E0E0E0"
                label={
                  stakeholder.inactiveTemporary
                    ? "Temporarily Closed"
                    : "Permanently Closed"
                }
              />
            ) : null}

            {showAllowWalkinsFlag &&
              !(stakeholder.inactiveTemporary || stakeholder.inactive) && (
                <>
                  {isOpenFlag && (
                    <Chip
                      sx={{ backgroundColor: "#008000" }}
                      label="OPEN NOW"
                    />
                  )}
                  {isAlmostClosedFlag && (
                    <Chip
                      sx={{ backgroundColor: "#CC3333" }}
                      label={`Closing in ${minutesToClosing} minutes`}
                    />
                  )}
                  <Chip label="Walk-Ins Allowed" />
                </>
              )}
          </Box>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <SecondaryButton
              // size="small"
              onClick={() => {
                analytics.postEvent("getDirections", {
                  id: stakeholder.id,
                  name: stakeholder.name,
                });

                window.open(
                  getGoogleMapsDirectionsUrl(originCoordinates, {
                    latitude: stakeholder.latitude,
                    longitude: stakeholder.longitude,
                  })
                );
              }}
            >
              Directions
            </SecondaryButton>

            {mainNumber && (
              <SecondaryButton
                onClick={() => {
                  analytics.postEvent("dialPhone", {
                    id: stakeholder.id,
                    name: stakeholder.name,
                  });
                  window.open(`tel:${mainNumber.value}`);
                }}
              >
                Call
              </SecondaryButton>
            )}

            <SecondaryButton
              disabled={stakeholder.inactive}
              onClick={() => handleSelectOrganization(stakeholder)}
            >
              {/* <Typography variant="button">Details</Typography> */}
              Details
            </SecondaryButton>
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

StakeholderPreview.propTypes = {
  stakeholder: PropTypes.object.isRequired,
};

export default StakeholderPreview;
