import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, Tooltip } from "@mui/material";
import LocationSearching from "@mui/icons-material/LocationSearching";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import SwitchViewsButton from "./SwitchViewsButton";
import CategoryButton from "./CategoryButton";
import * as analytics from "services/analytics";
import { tenantDetails } from "../../../../helpers/Configuration";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";

const ResultsFilters = ({
  categoryIds,
  toggleCategory,
  showList,
  toggleShowList,
}) => {
  const isMealsSelected = categoryIds.indexOf(MEAL_PROGRAM_CATEGORY_ID) >= 0;
  const isPantrySelected = categoryIds.indexOf(FOOD_PANTRY_CATEGORY_ID) >= 0;
  const { taglineText } = tenantDetails;
  const {
    getUserLocation,
    // isLoading: isGettingLocation
  } = useGeolocation();
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

  const useMyLocationTrigger = async () => {
    try {
      await getUserLocation();
    } catch (e) {
      console.log({ e });
      setError(e);
    }
    analytics.postEvent("recenterMap", {});
  };

  return (
    <Grid2
      container
      sx={{
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        padding: "0.5rem 0",
      }}
    >
      <Grid2
        display={{ xs: "none", sm: "block" }}
        sm={4}
        sx={{
          paddingLeft: "1rem",
        }}
      >
        <Stack
          sx={{
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h5" componenet="h1" sx={{ fontWeight: "bold" }}>
            {taglineText}
          </Typography>
        </Stack>
      </Grid2>

      <Grid2
        container
        xs={12}
        sm={8}
        justifyContent="center"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={0.5}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Grid2
            container
            xs={12}
            sm={6}
            spacing={1}
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Grid2 item>
              <CategoryButton
                icon="pantry"
                onClick={togglePantry}
                label="Pantries"
                isSelected={isPantrySelected}
              />
            </Grid2>
            <Grid2 item>
              <CategoryButton
                icon="meal"
                onClick={toggleMeal}
                label="Meals"
                isSelected={isMealsSelected}
                style={{ marginLeft: 5 }}
              />
            </Grid2>

            <Grid2 display={{ xs: "block", sm: "none" }}>
              <SwitchViewsButton
                isListView={showList}
                onClick={toggleShowList}
                style={{ marginLeft: 5 }}
              />
            </Grid2>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ margin: "0.5rem" }}
            >
              <AddressDropDown />
              <Tooltip
                title={
                  locationPermission === "denied" || !!error
                    ? "Please allow location access"
                    : "Show Your Current Location"
                }
              >
                <div>
                  <Button
                    variant="recenter"
                    onClick={useMyLocationTrigger}
                    disabled={locationPermission === "denied" || !!error}
                    icon="locationSearching"
                    // isLoading={isGettingLocation}
                  >
                    <LocationSearching
                      htmlColor="white"
                      sx={{ fontSize: "1.25rem" }}
                    />
                  </Button>
                </div>
              </Tooltip>
            </Stack>
          </Grid2>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

ResultsFilters.propTypes = {
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
  showList: PropTypes.bool,
  toggleShowList: PropTypes.func,
};

export default ResultsFilters;
