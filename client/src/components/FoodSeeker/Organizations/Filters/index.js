import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Tooltip } from "@material-ui/core";
import { tenantName } from "helpers/Configuration";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import * as analytics from "services/analytics";

import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";
import { isMobile } from "helpers";

import theme from "theme/clientTheme";
import SwitchViewsButton from "./SwitchViewsButton";
import SearchBar from "components/FoodSeeker/shared/SearchBar";

const useStyles = makeStyles((theme) => ({
  select: {
    color: "white",
  },
  menuItems: {
    fontSize: "max(.8vw,12px)",
    color: "#000",
  },
  controlPanel: {
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.main,
    padding: "0.5rem 0",
    flex: "1 0 auto",
    position: "sticky",
    top: "48px",
    margin: 0,
    zIndex: 1,
    justifyContent: "center",
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingRight: "0.5em",
    //all: "inherit",
    //backgroundColor: "pink",
    // borderRadius: "6px",
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  nearbyIcon: {
    maxWidth: "30px",
  },
  nearbySearch: {
    height: "40px",
    minWidth: "25px",
    maxWidth: "25px",
    marginLeft: "4px",
    padding: 0,
    cornerRadius: "4px",
    borderRadius: "4px",
    backgroundColor: "#F0F0F0",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      margin: 0,
    },
    "&.Mui-disabled": {
      opacity: 0.8,
      backgroundColor: "white",
    },
    "&:hover": {
      boxShadow: "none",
    },
  },
  submit: {
    height: "40px",
    backgroundColor: "#BCE76D",
    borderRadius: "0 6px 6px 0",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
      marginLeft: "3px",
    },
    "&.Mui-disabled": {
      backgroundColor: "#BCE76D",
      opacity: 0.8,
    },
    "&:hover": {
      backgroundColor: "#C7F573",
      boxShadow: "none",
    },
  },
  taglineContainer: {
    paddingLeft: "2rem",
    verticalAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tagline: {
    margin: "auto 0",
    fontWeight: "700",
    fontSize: "16px",
  },
  filterContainer: {
    display: "flex",
    margin: "0",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "right",
    margin: "0.1rem 0rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  buttonContainer: {
    display: "flex",

    margin: "0.1rem 0rem",
    justifyContent: "left",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

const ResultsFilters = ({
  origin,
  setOrigin,
  isVerifiedSelected,
  userCoordinates,
  categoryIds,
  toggleCategory,
  isMapView,
  switchResultsView,
}) => {
  const classes = useStyles();
  const isMealsSelected = categoryIds.indexOf(MEAL_PROGRAM_CATEGORY_ID) >= 0;
  const isPantrySelected = categoryIds.indexOf(FOOD_PANTRY_CATEGORY_ID) >= 0;

  const toggleMeal = useCallback(() => {
    toggleCategory(MEAL_PROGRAM_CATEGORY_ID);
    analytics.postEvent("toggleMealFilter", {});
  }, [toggleCategory]);

  const togglePantry = useCallback(() => {
    toggleCategory(FOOD_PANTRY_CATEGORY_ID);
    analytics.postEvent("togglePantryFilter", {});
  }, [toggleCategory]);

  const mobileView = isMobile();
  const taglineText = "Locate free food in " + tenantName;

  return (
    <Grid item container className={classes.controlPanel}>
      {!mobileView && (
        <Grid item sm={4} className={classes.taglineContainer}>
          <Typography variant="h6" className={classes.tagline}>
            {taglineText}
          </Typography>
        </Grid>
      )}
      <Grid
        item
        container
        xs={12}
        sm={8}
        justify="center"
        alignItems="center"
        className={classes.filterContainer}
        wrap="wrap-reverse"
      >
        <Grid item container xs={12} sm={6} className={classes.buttonContainer}>
          <Grid item>
            <Button
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: isMealsSelected
                  ? theme.palette.primary.white
                  : theme.palette.primary.main,
                backgroundColor: isPantrySelected
                  ? theme.palette.primary.dark
                  : "#fff",
                color: isPantrySelected ? "#fff" : "#000",
              }}
              onClick={togglePantry}
            >
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.14735 19.2264C7.70202 19.7216 6.83277 19.9998 6.0858 19.9998C3.51778 19.9998 0 15.4426 0 11.3827C0 7.32277 1.67125 4.44393 4.23927 4.44393C5.63232 4.44393 6.75634 4.6131 7.35656 5.32542L7.34535 5.28058C7.34535 5.28058 6.88168 3.29648 6.12351 2.87968C6.54234 2.65549 7.31784 2.02673 7.31784 2.02673C7.31784 2.02673 8.51217 3.65213 8.51217 5.28262V5.32542C9.39467 4.54788 10.4494 4.06688 12.0544 4.06688C14.6224 4.06688 16.2947 7.32277 16.2947 11.3827C16.2947 15.4426 12.6516 19.9998 10.0836 19.9998C9.33047 19.9998 8.59472 19.7308 8.14735 19.2264Z"
                  fill={isPantrySelected ? "#fff" : "#000"}
                />
                <path
                  d="M11.3528 2.62203C10.668 3.75216 9.16287 4.09151 9.16287 4.09151C9.16287 4.09151 8.76748 2.59961 9.45229 1.4705C10.1371 0.341384 11.6412 0 11.6412 0C11.6412 0 12.0366 1.4919 11.3528 2.62203Z"
                  fill={isPantrySelected ? "#fff" : "#000"}
                />
              </svg>
              Pantries
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: isMealsSelected
                  ? theme.palette.primary.white
                  : theme.palette.primary.main,
                backgroundColor: isMealsSelected
                  ? theme.palette.primary.dark
                  : "#fff",
                color: isMealsSelected ? "#fff" : "#000",
                marginLeft: "5px",
              }}
              onClick={toggleMeal}
            >
              <svg
                width="9"
                height="22"
                margin="5"
                viewBox="0 0 9 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.84393 0C6.33198 0 6.42729 0.582211 6.42729 0.582211C6.42729 1.89018 6.42729 4.71511 6.42729 6.03915C6.42729 7.72951 4.67836 8.12225 4.67836 8.12225V20.9114C4.67836 20.9114 4.66343 22 3.50475 22C2.34607 22 4.04103 22 2.91565 22C1.79027 22 1.7696 20.9114 1.7696 20.9114V8.12225C1.7696 8.12225 0 7.741 0 6.04489V0.556947C0 0.556947 0.0137804 0 0.58336 0C1.15294 0 1.16212 0.0195218 1.16212 0.556947C1.16212 1.09437 1.1805 4.49347 1.1805 4.49347C1.1805 4.49347 1.22069 5.01253 1.48596 5.01253C1.75123 5.01253 1.73056 4.49347 1.73056 4.49347C1.73056 4.49347 1.73056 1.11389 1.73056 0.556947C1.73056 -5.47574e-08 1.73745 0 2.32081 0C2.90417 0 2.93058 0.0195218 2.93058 0.556947C2.93058 1.09437 2.93058 4.55089 2.93058 4.55089C2.93058 4.55089 2.95125 5.05042 3.21537 5.05042C3.47949 5.05042 3.5059 4.513 3.5059 4.513C3.5059 4.513 3.5059 1.08863 3.5059 0.544316C3.5059 0 3.6081 0 4.13749 0C4.66688 0 4.70018 0.0321537 4.70018 0.531684C4.70018 1.03121 4.70018 4.44639 4.70018 4.44639C4.70018 4.44639 4.67951 5.06994 4.9643 5.06994C5.25942 5.06994 5.27665 4.48084 5.27665 4.48084C5.27665 4.48084 5.28124 1.13916 5.28124 0.569579C5.28124 0 5.35588 0 5.84393 0Z"
                  fill={isMealsSelected ? "#fff" : "#000"}
                />
              </svg>
              Meals
            </Button>
          </Grid>
          <Grid item>
            {mobileView && (
              <SwitchViewsButton
                isMapView={isMapView}
                onClick={switchResultsView}
                color={theme.palette.primary.dark}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.inputContainer}>
          <div className={classes.form}>
            <SearchBar
              userCoordinates={userCoordinates}
              setOrigin={(origin) => {
                analytics.postEvent("changeOrigin", {});
                setOrigin(origin);
              }}
              origin={origin}
            />
            <Tooltip title="Re-center">
              <span>
                <Button
                  onClick={() => {
                    analytics.postEvent("recenterMap", {});
                    setOrigin({ ...userCoordinates });
                  }}
                  disabled={!userCoordinates}
                  variant="contained"
                  className={classes.nearbySearch}
                  startIcon={
                    <LocationSearchingIcon className={classes.nearbyIcon} />
                  }
                />
              </span>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

ResultsFilters.propTypes = {
  distance: PropTypes.number,
  placeName: PropTypes.string,
  isPantryCategorySelected: PropTypes.bool,
  isMealCategorySelected: PropTypes.bool,
  isVerifiedFilterSelected: PropTypes.bool,
  search: PropTypes.func,
};

export default ResultsFilters;
