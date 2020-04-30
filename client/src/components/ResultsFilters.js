import React from "react";
import Search from "../components/Search";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const FOOD_PANTRY_CATEGORY_ID = 1;
const MEAL_PROGRAM_CATEGORY_ID = 9;

const useStyles = makeStyles((theme) => ({
  filterButton: {
    margin: "0 .25rem",
    fontSize: "max(.8vw,10px)",
    backgroundColor: "#fff",
    border: ".1em solid #000",
    color: "#000",
  },
  distanceControl: {
    margin: "0 .25rem",
    backgroundColor: "#fff",
    padding: ".25em 0 .25em .7em",
    border: ".09em solid #000",
    outline: "none",
  },
  menuItems: {
    fontSize: "max(.8vw,10px)",
    color: "#000",
  },
  controlPanel: {
    width: "100%",
    backgroundColor: "#336699",
    height: "5em",
  },
  inputHolder: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    fontSize: "12px",
    width: "25em",
    height: "2em",
    outline: "none",
    padding: ".25em",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  submit: {
    height: "42px",
    minWidth: "25px",
    backgroundColor: "#BCE76D",
    borderRadius: "0 4px 4px 0",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
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
  buttonHolder: {
    display: "flex",
  },
}));

const distanceInfo = [1, 2, 3, 5, 10, 20, 50];

const ResultsFilters = ({
  origin,
  setOrigin,
  radius,
  setRadius,
  isFoodPantrySelected,
  selectFoodPantry,
  isMealsSelected,
  selectMeals,
  isVerifiedSelected,
  selectVerified,

  search,
  userCoordinates,
}) => {
  const classes = useStyles();

  return (
    <Grid container wrap="wrap-reverse" className={classes.controlPanel}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        justify="center"
        alignItems="center"
        className={classes.buttonHolder}
      >
        <Grid item>
          <Button as={FormControl} className={classes.distanceControl}>
            <Select
              name="select-distance"
              disableUnderline
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              inputProps={{
                name: "select-distance",
                id: "select-distance",
              }}
              className={classes.menuItems}
            >
              <MenuItem key={0} value={0} className={classes.menuItems}>
                DISTANCE
              </MenuItem>
              {distanceInfo.map((distance) => (
                <MenuItem
                  key={distance}
                  value={distance}
                  className={classes.menuItems}
                >
                  {`${distance} MILE${distance > 1 ? "S" : ""}`}
                </MenuItem>
              ))}
            </Select>
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.filterButton}
            style={{
              backgroundColor: isFoodPantrySelected ? "transparent" : "#fff",
            }}
            onClick={() => selectFoodPantry(!isFoodPantrySelected)}
          >
            Food Pantries
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.filterButton}
            style={{
              backgroundColor: isMealsSelected ? "transparent" : "#fff",
            }}
            onClick={() => selectMeals(!isMealsSelected)}
          >
            Meals
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.filterButton}
            style={{
              backgroundColor: isVerifiedSelected ? "transparent" : "#fff",
            }}
            onClick={() => selectVerified(!isVerifiedSelected)}
          >
            Verified
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.inputContainer}>
        <Search userCoordinates={userCoordinates} setOrigin={setOrigin} />
        <Button
          type="button"
          disabled={!origin}
          variant="contained"
          className={classes.submit}
          startIcon={
            <SearchIcon fontSize="large" className={classes.searchIcon} />
          }
          onClick={() => {
            const categoryIds = [];
            if (isFoodPantrySelected) {
              categoryIds.push(FOOD_PANTRY_CATEGORY_ID);
            }
            if (isMealsSelected) {
              categoryIds.push(MEAL_PROGRAM_CATEGORY_ID);
            }
            if (categoryIds.length === 0) {
            }

            search({
              name: "",
              latitude: origin.latitude,
              longitude: origin.longitude,
              radius,
              categoryIds,
              isInactive: "no",
              isAssigned: "either",
              // isApproved is the search criteria for verification, but
              // will be re-named later.
              isApproved: isVerifiedSelected ? "yes" : "either",
              isVerified: "either",
              isRejected: "either",
              isClaimed: "either",
              assignedLoginId: "",
              claimedLoginId: "",
            });
          }}
        />
      </Box>
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
