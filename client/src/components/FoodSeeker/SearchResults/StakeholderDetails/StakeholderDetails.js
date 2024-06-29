import {
  Box,
  Button,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
  VERIFICATION_STATUS,
} from "constants/stakeholder";
import {
  extractNumbers,
  formatDateMMMddYYYY,
  getGoogleMapsDirectionsUrl,
  validateUrl,
  hoursSort,
  isCurrentDayAndWeek,
  nextOpenTime,
  isAlmostClosed,
  isAlmostOpen,
  calculateMinutesToClosing,
  calculateMinutesToOpening,
} from "helpers";
import facebookIcon from "images/facebookIcon.png";
import instagramIcon from "images/instagramIcon.png";
import StakeholderIcon from "images/stakeholderIcon";
import ForkIcon from "icons/ForkIcon";
import AppleIcon from "icons/AppleIcon";
import IosShareIcon from "@mui/icons-material/IosShare";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as analytics from "services/analytics";
import {
  useSearchCoordinates,
  useSelectedOrganization,
  useUserCoordinates,
  useWidget,
  usePosition,
} from "../../../../appReducer";
import { useToasterContext } from "../../../../contexts/toasterContext";
import SEO from "../../../SEO";
import CorrectionDialog from "./CorrectionDialog";
import { useSiteContext } from "contexts/siteContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { stakeholdersDaysHours } from "../StakeholderPreview/StakeholderPreview";
import { success } from "../../../../theme/palette";

const MinorHeading = styled(Typography)(({ theme }) => ({
  variant: "h5",
  component: "h3",
  textAlign: "left",
  margin: "0",
  fontWeight: "600",
  color: theme.palette.headingText.main,
}));

const DetailText = styled(Typography)(({ theme }) => ({
  variant: "body1",
  component: "p",
  textAlign: "left",
  marginBottom: "16px",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  "& a": {
    color: theme.palette.link.normal,
    "&:visited": {
      color: theme.palette.link.visited,
    },
    "&:hover": {
      color: theme.palette.link.hovered,
    },
  },
}));

const StakeholderDetails = ({ onBackClick, isDesktop }) => {
  const [SuggestionDialogOpen, setSuggestionDialogOpen] = useState(false);
  const selectedOrganization = useSelectedOrganization();
  const searchCoordinates = useSearchCoordinates();
  const userCoordinates = useUserCoordinates();
  const originCoordinates = searchCoordinates || userCoordinates;
  const isWidget = useWidget();
  const navigate = useNavigate();
  const { setToast } = useToasterContext();
  const { tenantTimeZone } = useSiteContext();
  const position = usePosition();
  const [paddingBottom, setPaddingBottom] = useState(30);

  useEffect(() => {
    const windowHeight = window.innerHeight / 100;
    if (
      position.y === (100 / window.innerHeight) * 54 * windowHeight ||
      position.y === 0 * windowHeight
    ) {
      setPaddingBottom(200);
    } else if (position.y === 17 * windowHeight) {
      setPaddingBottom(300);
    }
  }, [position]);

  // USE EFFECT BASED ON THIS FUNCTION IN Mobile.js
  // const handleStop = (e, ui) => {
  //   const windowHeight = window.innerHeight / 100;
  //   let newY;
  //   if (ui.y < 20 * windowHeight) {
  //     newY = hasAdvancedFilterFeatureFlag ? (100 / window.innerHeight) * 60 : 0;
  //   } else if (ui.y > 20 * windowHeight && ui.y < 40 * windowHeight) {
  //     newY = 17;
  //   } else if (ui.y > 40 * windowHeight) {
  //     newY = 54;
  //   }
  //   setPosition({ x: 0, y: newY * windowHeight });
  // };

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
    onBackClick();
    navigate(isWidget ? "/widget" : "/organizations");
  };

  const standardTime = (timeStr) => {
    if (timeStr) {
      if (parseInt(timeStr.substring(0, 2)) === 12) {
        return `12${timeStr.substring(2, 5)} pm`;
      }
      if (parseInt(timeStr.substring(0, 2)) === 0) {
        return `12${timeStr.substring(2, 5)} am`;
      }
      return parseInt(timeStr.substring(0, 2)) > 12
        ? `${parseInt(timeStr.substring(0, 2)) - 12}${timeStr.substring(
            2,
            5
          )} pm`
        : `${parseInt(timeStr.substring(0, 5))}${timeStr.substring(2, 5)} am`;
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

  const currentDate = new Date();
  const stakeholderHours = stakeholdersDaysHours(
    selectedOrganization,
    tenantTimeZone,
    currentDate
  );
  const isOpenFlag = !!stakeholderHours;
  const showAllowWalkinsFlag = selectedOrganization.allowWalkins;
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

  useEffect(() => {
    window.addEventListener(
      "popstate",
      function () {
        onBackClick();
      },
      false
    );
  }, [onBackClick]);

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
      <Stack
        height={"100%"}
        width={"100%"}
        sx={{
          display: "flex",
        }}
      >
        <Stack
          direction={"row"}
          alignItems="flex-end"
          sx={{
            width: 1,
            padding: isDesktop ? "1.5rem 35px 0 65px" : "1rem 1.5rem",
          }}
        >
          <Button
            variant="text"
            sx={(theme) => ({
              fontSize: { xs: "14px", md: "18px" },
              color: { md: theme.palette.common.gray, xs: "#747476" },
              textTransform: "none",
              fontWeight: "bold", 
              "&:focus": {
                borderWidth: "2px",
                borderColor: theme.palette.primary.dark,
                borderStyle: "solid",
                dropShadow: "10px 10px  12px",            
              },
            })}
            onClick={handleBackButtonClick}
          >
            {isDesktop ? "Back to Locations" : "Back to Search"}
          </Button>
        </Stack>
        {isDesktop && (
          <Divider
            sx={(theme) => ({
              background: theme.palette.common.black,
              margin: isDesktop ? "16px 35px 0 65px" : "0 1.5rem",
            })}
          />
        )}
        <Grid2
          container
          spacing={0}
          sx={{
            flex: 1,
            minHeight: "6rem",
            overflowY: "auto",
            padding: isDesktop
              ? "38px 35px 0 65px"
              : `3px 23px ${paddingBottom}px`,
          }}
        >
          <Grid2 xs={2}>
            <Stack
              xs={2}
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ marginTop: ".2rem", marginRight: "1rem" }}
            >
              <StakeholderIcon stakeholder={selectedOrganization} />
            </Stack>
          </Grid2>
          <Grid2 xs={10}>
            <Stack direction="column" xs={10}>
              <Stack>
                <Typography
                  variant="h4"
                  component="h2"
                  align="left"
                  fontWeight="bold"
                >
                  {selectedOrganization.name}
                </Typography>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  marginTop="8px"
                  sx={{ gap: "16px" }}
                >
                  {selectedOrganization.categories
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
                          key={selectedOrganization.id + category.id}
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

                <Box textAlign="left">
                  {selectedOrganization.inactiveTemporary ||
                  selectedOrganization.inactive ? (
                    <Chip
                      color="inactiveButton"
                      sx={{
                        borderRadius: "6px",
                        fontStyle: "normal",
                        fontSize: "12px",
                      }}
                      label={
                        selectedOrganization.inactiveTemporary
                          ? "Temporarily Closed"
                          : "Permanently Closed"
                      }
                    />
                  ) : null}

                  {!(
                    selectedOrganization.inactiveTemporary ||
                    selectedOrganization.inactive
                  ) && (
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

                <Box textAlign="left" sx={{ marginTop: "16px" }}>
                  {selectedOrganization.hours &&
                  selectedOrganization.hours.length > 0 ? (
                    <Typography>
                      Open{" "}
                      {nextOpenTime(
                        selectedOrganization.hours.sort(hoursSort),
                        tenantTimeZone
                      )}
                    </Typography>
                  ) : (
                    <Typography>No hours on record</Typography>
                  )}
                </Box>

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
                      key={selectedOrganization.id}
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
                      key={selectedOrganization.id}
                    >
                      {`Opening in ${minutesToOpening} minutes`}
                    </Typography>
                  </Box>
                )}

                {selectedOrganization.hours ? (
                  <Stack>
                    <Divider sx={{ margin: "8px 0px 4px" }} />
                    {selectedOrganization.hours
                      .sort(hoursSort)
                      .map((hour, index) => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          key={JSON.stringify(hour)}
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

                {selectedOrganization.foodTypes ? (
                  <Box textAlign="left">
                    <Typography
                      variant="body2"
                      component="p"
                      key={selectedOrganization.id}
                      sx={{
                        alignSelf: "flex-start",
                        margin: "1em 0.25em 0.5em 0",
                        fontSize: "1rem !important",
                      }}
                    >
                      {selectedOrganization.foodTypes}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}

                <Stack
                  direction="row"
                  justifyContent="start"
                  spacing={1}
                  useflexgap="true"
                  sx={{ margin: "16px 0 29px" }}
                >
                  <Button
                    variant="gray"
                    startIcon={<SubdirectoryArrowRightIcon />}
                    size="large"
                    sx={{ width: "50%" }}
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
                    variant="gray"
                    onClick={shareLink}
                    size="large"
                    startIcon={<IosShareIcon />}
                    sx={{ width: "50%" }}
                  >
                    Share
                  </Button>
                </Stack>

                <MinorHeading>Address</MinorHeading>
                <DetailText sx={{ marginBottom: "0" }}>
                  {selectedOrganization.address1}
                </DetailText>
                <DetailText>
                  {selectedOrganization.city} {selectedOrganization.zip}
                </DetailText>

                <MinorHeading>Phone</MinorHeading>
                {numbers}

                <MinorHeading>Email</MinorHeading>
                {selectedOrganization.email ? (
                  <>
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
                  </>
                ) : (
                  <DetailText>No E-Mail Address on record</DetailText>
                )}

                {selectedOrganization.website ? (
                  <>
                    <MinorHeading>Website</MinorHeading>
                    <DetailText>
                      <Link
                        href={validateUrl(selectedOrganization.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedOrganization.website}
                      </Link>
                    </DetailText>
                  </>
                ) : null}

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

                {selectedOrganization.hoursNotes ? (
                  <>
                    <MinorHeading>Hour Notes</MinorHeading>
                    <DetailText
                      dangerouslySetInnerHTML={{
                        __html: formatEmailPhone(
                          selectedOrganization.hoursNotes
                        ),
                      }}
                    ></DetailText>
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

                {selectedOrganization.facebook ||
                selectedOrganization.instagram ? (
                  <>
                    <MinorHeading>Social Media</MinorHeading>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ marginBottom: "16px" }}
                    >
                      {selectedOrganization.facebook ? (
                        <Link
                          href={selectedOrganization.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="icon"
                        >
                          <img alt="facebook link" src={facebookIcon} />
                        </Link>
                      ) : null}
                      {selectedOrganization.instagram ? (
                        <a
                          href={selectedOrganization.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="icon"
                        >
                          <img alt="instagram link" src={instagramIcon} />
                        </a>
                      ) : null}
                    </Stack>
                  </>
                ) : null}

                <MinorHeading>Eligibility/Requirements</MinorHeading>
                {selectedOrganization.requirements ? (
                  <DetailText
                    dangerouslySetInnerHTML={{
                      __html: formatEmailPhone(
                        selectedOrganization.requirements
                      ),
                    }}
                  ></DetailText>
                ) : (
                  <DetailText>No special requirements</DetailText>
                )}
                <MinorHeading>Report Error</MinorHeading>
                <DetailText>
                  If you see an error in this information, please help us by{" "}
                  <Link
                    onClick={handleSuggestionDialogOpen}
                    sx={{ cursor: "pointer" }}
                  >
                    sending a correction
                  </Link>
                  .
                </DetailText>

                {selectedOrganization.verificationStatusId ===
                VERIFICATION_STATUS.VERIFIED ? (
                  <DetailText>
                    Data updated on{" "}
                    {selectedOrganization.approvedDate
                      ? formatDateMMMddYYYY(selectedOrganization.approvedDate)
                      : selectedOrganization.modifiedDate
                      ? formatDateMMMddYYYY(selectedOrganization.modifiedDate)
                      : formatDateMMMddYYYY(selectedOrganization.createdDate)}
                  </DetailText>
                ) : null}
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};

export default StakeholderDetails;
