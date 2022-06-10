import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Tooltip } from "@material-ui/core";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";
import useBreakpoints from "hooks/useBreakpoints";
import theme from "theme/clientTheme";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import SwitchViewsButton from "./SwitchViewsButton";
import CategoryButton from "./CategoryButton";
import * as analytics from "services/analytics";
import { Button } from "../../../UI";
import { tenantDetails } from "../../../../helpers/Configuration";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";

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
  categoryIds,
  toggleCategory,
  showList,
  toggleShowList,
}) => {
  const classes = useStyles();
  const isMealsSelected = categoryIds.indexOf(MEAL_PROGRAM_CATEGORY_ID) >= 0;
  const isPantrySelected = categoryIds.indexOf(FOOD_PANTRY_CATEGORY_ID) >= 0;
  const { taglineText } = tenantDetails;
  const { getUserLocation, isLoading: isGettingLocation } = useGeolocation();
  const locationPermission = useLocationPermission();
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (error && locationPermission === "granted") {
      setError("");
    }
  }, [error, locationPermission]);

  const toggleMeal = useCallback(() => {
    toggleCategory(MEAL_PROGRAM_CATEGORY_ID);
    analytics.postEvent("toggleMealFilter", {});
  }, [toggleCategory]);

  const togglePantry = useCallback(() => {
    toggleCategory(FOOD_PANTRY_CATEGORY_ID);
    analytics.postEvent("togglePantryFilter", {});
  }, [toggleCategory]);

  const { isMobile } = useBreakpoints();

  return (
    <Grid item container className={classes.controlPanel}>
      {!isMobile && (
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
        justifyContent="center"
        alignItems="center"
        className={classes.filterContainer}
        wrap="wrap-reverse"
      >
        <Grid
          item
          container
          xs={12}
          sm={6}
          spacing={1}
          className={classes.buttonContainer}
        >
          <Grid item>
            <CategoryButton
              icon="pantry"
              onClick={togglePantry}
              label="Pantries"
              isSelected={isPantrySelected}
            />
          </Grid>
          <Grid item>
            <CategoryButton
              icon="meal"
              onClick={toggleMeal}
              label="Meals"
              isSelected={isMealsSelected}
              style={{ marginLeft: 5 }}
            />
          </Grid>

          <Grid item>
            {isMobile && (
              <SwitchViewsButton
                isListView={showList}
                onClick={toggleShowList}
                color={theme.palette.primary.dark}
                style={{ marginLeft: 5 }}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.inputContainer}>
          <div className={classes.form}>
            <AddressDropDown />
            <Tooltip
              title={
                locationPermission === "denied" || !!error
                  ? "Please allow location access"
                  : "Show Your Current Location"
              }
            >
              <span>
                <Button
                  onClick={() => {
                    analytics.postEvent("recenterMap", {});
                    getUserLocation();
                  }}
                  disabled={locationPermission === "denied" || !!error}
                  className={classes.nearbySearch}
                  icon="locationSearching"
                  iconPosition="start"
                  isLoading={isGettingLocation}
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
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
  showList: PropTypes.bool,
  toggleShowList: PropTypes.func,
};

export default ResultsFilters;
