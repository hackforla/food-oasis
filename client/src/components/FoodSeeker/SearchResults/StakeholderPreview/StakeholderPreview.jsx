import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid2 from "@mui/material/Unstable_Grid2";
import InternalLink from "components/UI/InternalLink";
import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "constants/stakeholder";
import { useSiteContext } from "contexts/siteContext";
import {
  calculateMinutesToClosing,
  calculateMinutesToOpening,
  extractNumbers,
  formatDatewTimeZoneDD,
  formatDatewTimeZoneMMM,
  formatDatewTimeZoneWeekdayShort,
  formatDatewTimeZonehhmmss,
  getGoogleMapsDirectionsUrl,
  hoursSort,
  isAlmostClosed,
  isAlmostOpen,
  isCurrentDayAndWeek,
  nextOpenTime,
  standardTime,
} from "helpers";
import AppleIcon from "icons/AppleIcon";
import ForkIcon from "icons/ForkIcon";
import StakeholderIcon from "images/stakeholderIcon";
import PropTypes from "prop-types";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useOrgNameFilter,
  useSearchCoordinates,
  useUserCoordinates,
} from "../../../../appReducer";
import { linkText, success } from "../../../../theme/palette";
import HighlightedText from "./HighlightedText";

const isLastOccurrenceInMonth = (tenantTimeZone) => {
  const currentDate = new Date();
  const currentDatePlus7Days = new Date();
  currentDatePlus7Days.setDate(currentDatePlus7Days.getDate() + 7);

  const currentDateCurrentMonth = formatDatewTimeZoneMMM(
    currentDate,
    tenantTimeZone
  );

  const currentDatePlus7DaysCurrentMonth = formatDatewTimeZoneMMM(
    currentDatePlus7Days,
    tenantTimeZone
  );

  if (currentDateCurrentMonth !== currentDatePlus7DaysCurrentMonth) {
    return true;
  }
  return false;
};

// pass in date object to check if it is Open
export const stakeholdersDaysHours = (
  stakeholder,
  tenantTimeZone,
  dateToCheck
) => {
  const timeZone = tenantTimeZone;
  const currentDayOfWeek = formatDatewTimeZoneWeekdayShort(
    dateToCheck,
    timeZone
  );

  // In tandum with currentDayOfWeek tells us which week the day falls
  const dayOccurrenceInMonth = Math.ceil(
    Number(formatDatewTimeZoneDD(dateToCheck, timeZone)) / 7
  );

  const currentTime = formatDatewTimeZonehhmmss(dateToCheck, timeZone);

  const currentDaysHoursOfOperation =
    stakeholder.hours &&
    stakeholder.hours.filter((todaysHours) => {
      const hasHoursToday = currentDayOfWeek === todaysHours.day_of_week;

      const isOnlyOpenOnLastWeekOfMonth =
        hasHoursToday &&
        isLastOccurrenceInMonth(tenantTimeZone) &&
        todaysHours.week_of_month === -1;
      return (
        hasHoursToday &&
        currentTime >= todaysHours.open &&
        currentTime < todaysHours.close &&
        (todaysHours.week_of_month === 0 ||
          dayOccurrenceInMonth === todaysHours.week_of_month ||
          isOnlyOpenOnLastWeekOfMonth)
      );
    });
  if (currentDaysHoursOfOperation?.length > 0) {
    return currentDaysHoursOfOperation;
  }
};

function getLinkUrl(organization) {
  const name = organization.name.toLowerCase().replaceAll(" ", "_");
  return `${location.pathname}?latitude=${organization.latitude}&longitude=${organization.longitude}&org=${name}&id=${organization.id}`;
}

const StakeholderPreview = ({ stakeholder, onSelect }) => {
  const dispatch = useAppDispatch();
  const searchCoordinates = useSearchCoordinates();
  const userCoordinates = useUserCoordinates();
  const originCoordinates = searchCoordinates || userCoordinates;
  const { tenantTimeZone } = useSiteContext();
  const orgNameFilter = useOrgNameFilter();

  const handleSelectOrganization = (organization) => {
    onSelect();
    dispatch({ type: "SELECTED_ORGANIZATION_UPDATED", organization });
    analytics.postEvent("selectOrganization", {
      id: organization.id,
      name: organization.name,
    });
  };

  const mainNumber = extractNumbers(stakeholder.phone).find((n) => n.number);

  const currentDate = new Date();
  const stakeholderHours = stakeholdersDaysHours(
    stakeholder,
    tenantTimeZone,
    currentDate
  );
  const isOpenFlag = !!stakeholderHours;
  const showAllowWalkinsFlag = stakeholder.allowWalkins;
  const isAlmostClosedFlag =
    isOpenFlag && isAlmostClosed(stakeholderHours, tenantTimeZone);
  const minutesToClosing =
    isAlmostClosedFlag &&
    calculateMinutesToClosing(stakeholderHours, tenantTimeZone);

  const isAlmostOpenFlag =
    !isOpenFlag && isAlmostOpen(stakeholderHours, tenantTimeZone);
  const minutesToOpening =
    isAlmostOpenFlag &&
    calculateMinutesToOpening(stakeholderHours, tenantTimeZone);

  return (
    <Grid2 container key={stakeholder.id} p={2} gap={2} flex={1}>
      <Grid2 xs={1} onClick={() => handleSelectOrganization(stakeholder)}>
        <Stack
          xs={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
        >
          <StakeholderIcon stakeholder={stakeholder} />
          <Typography variant="body2" align="center">
            {stakeholder?.distance && `${stakeholder.distance?.toFixed(1)} mi`}
          </Typography>
        </Stack>
      </Grid2>

      <Grid2 xs={10} flexGrow={1}>
        <Stack direction="column" xs={10}>
          <Stack sx={{ cursor: "pointer" }}>
            <Typography
              variant="h4"
              component="h2"
              align="left"
              fontWeight="bold"
            >
              <InternalLink
                href={getLinkUrl(stakeholder)}
                sx={{ color: "inherit" }}
                onClick={() => handleSelectOrganization(stakeholder)}
              >
                <HighlightedText
                  text={stakeholder.name}
                  query={orgNameFilter}
                />
              </InternalLink>
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              marginTop="8px"
              sx={{
                gap: "16px",
              }}
              onClick={() => handleSelectOrganization(stakeholder)}
            >
              {stakeholder.categories
                .filter((c) => c.isForFoodSeeker)
                .map((category, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    useflexgap="true"
                    key={`${index}-${category}`}
                    sx={{
                      order:
                        category.id === MEAL_PROGRAM_CATEGORY_ID
                          ? -1
                          : undefined,
                    }}
                  >
                    {category.id === FOOD_PANTRY_CATEGORY_ID ? (
                      <AppleIcon />
                    ) : category.id === MEAL_PROGRAM_CATEGORY_ID ? (
                      <ForkIcon />
                    ) : (
                      ""
                    )}

                    <Typography
                      variant="body2"
                      key={stakeholder.id + category.id}
                      sx={{
                        margin: "0.25em 0",
                        marginRight: "0.25em",
                        fontWeight: "600",
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Stack>
                ))}
            </Stack>

            <Box
              textAlign="left"
              onClick={() => handleSelectOrganization(stakeholder)}
            >
              {stakeholder.inactiveTemporary || stakeholder.inactive ? (
                <Chip
                  color="inactiveButton"
                  sx={{
                    borderRadius: "6px",
                    fontStyle: "normal",
                    fontSize: "12px",
                  }}
                  label={
                    stakeholder.inactiveTemporary
                      ? "Temporarily Closed"
                      : "Permanently Closed"
                  }
                />
              ) : null}

              {!(stakeholder.inactiveTemporary || stakeholder.inactive) && (
                <>
                  {isOpenFlag && (
                    <Chip
                      color="success"
                      label="Open Now"
                      sx={{
                        borderRadius: "6px",
                        fontStyle: "normal",
                        fontSize: "12px",
                        margin: "16px 16px 0 0",
                      }}
                    />
                  )}

                  {showAllowWalkinsFlag && (
                    <Chip
                      label="Walk-Ins Allowed"
                      color="primary"
                      sx={{
                        backgroundColor: "#2260FF",
                        borderRadius: "6px",
                        fontStyle: "normal",
                        fontSize: "12px",
                        margin: "16px 0 0",
                      }}
                    />
                  )}
                </>
              )}
            </Box>
            {stakeholder.hours && stakeholder.hours.length > 0 ? (
              <Accordion
                disableGutters
                sx={{
                  ".MuiAccordionSummary-root": {
                    padding: "0px",
                    minHeight: "0px",
                    marginTop: "16px",
                    alignItems: "flex-start",
                  },
                  ".MuiAccordionSummary-root.Mui-expanded": {
                    minHeight: "0px",
                  },
                  boxShadow: "none",
                  "&.MuiAccordion-root:before": {
                    display: "none",
                  },
                  ".MuiAccordionDetails-root": { padding: "0px 6px 0px 0px" },
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    ".MuiAccordionSummary-content": {
                      justifyContent: "space-between",
                      margin: "0px",
                      flexWrap: "wrap",
                    },
                  }}
                >
                  <Typography>
                    Open{" "}
                    {nextOpenTime(
                      stakeholder.hours.sort(hoursSort),
                      tenantTimeZone
                    )}
                  </Typography>

                  <Typography
                    color={linkText}
                    align="right"
                    sx={{
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    More Hours
                  </Typography>
                  {isAlmostClosedFlag && (
                    <Box
                      textAlign="left"
                      marginTop="4px"
                      sx={{ flexBasis: "100%" }}
                    >
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="bold"
                        color="#E00700"
                        key={stakeholder.id}
                      >
                        {`Closing in ${minutesToClosing} minutes`}
                      </Typography>
                    </Box>
                  )}

                  {isAlmostOpenFlag && (
                    <Box
                      textAlign="left"
                      marginTop="4px"
                      sx={{ flexBasis: "100%" }}
                    >
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="bold"
                        color={success}
                        key={stakeholder.id}
                      >
                        {`Opening in ${minutesToOpening} minutes`}
                      </Typography>
                    </Box>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  {stakeholder.hours ? (
                    <Stack>
                      <Divider sx={{ margin: "8px 0px 4px" }} />
                      {stakeholder.hours.sort(hoursSort).map((hour, index) => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          key={`${hour}-${index}`}
                          marginTop="4px"
                          sx={{
                            ".MuiTypography-root": {
                              fontWeight:
                                index === 0 ||
                                isCurrentDayAndWeek(tenantTimeZone, hour)
                                  ? "bold"
                                  : "",
                            },
                          }}
                        >
                          <Typography>
                            {hour.week_of_month === -1
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
                          </Typography>
                          <Typography>
                            {standardTime(hour.open)} -{" "}
                            {standardTime(hour.close)}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  ) : null}
                </AccordionDetails>
              </Accordion>
            ) : (
              <Stack
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ marginTop: "16px" }}
              >
                <Typography>No hours on record</Typography>
              </Stack>
            )}
            {stakeholder.foodTypes ? (
              <Box
                textAlign="left"
                onClick={() => handleSelectOrganization(stakeholder)}
              >
                <Typography
                  variant="body2"
                  component="p"
                  key={stakeholder.id}
                  sx={{
                    alignSelf: "flex-start",
                    margin: "1em 0.25em 0.5em 0",
                    fontSize: "1rem !important",
                  }}
                >
                  {stakeholder.foodTypes}
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Stack>
          <Stack alignItems="flex-end">
            <InternalLink
              href={getLinkUrl(stakeholder)}
              onClick={() => handleSelectOrganization(stakeholder)}
              sx={{
                color: linkText,
                cursor: "pointer",
                border: "none",
              }}
            >
              more info...
            </InternalLink>
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            spacing={1}
            useflexgap="true"
            sx={{ marginTop: "1em" }}
          >
            <Button
              variant="gray"
              startIcon={<SubdirectoryArrowRightIcon />}
              size="large"
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
            </Button>

            {mainNumber && (
              <Button
                variant="gray"
                startIcon={<PhoneIcon />}
                size="large"
                onClick={() => {
                  analytics.postEvent("dialPhone", {
                    id: stakeholder.id,
                    name: stakeholder.name,
                  });
                  window.open(`tel:${mainNumber.value}`);
                }}
              >
                Call
              </Button>
            )}
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

StakeholderPreview.propTypes = {
  stakeholder: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
};

export default StakeholderPreview;
