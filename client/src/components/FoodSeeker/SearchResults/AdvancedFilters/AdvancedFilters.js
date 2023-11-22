import { Grid } from "@mui/material";
import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "constants/stakeholder";
import MealLocatorIcon from "icons/MealLocatorIcon";
import PantryLocatorIcon from "icons/PantryLocatorIcon";
import PropTypes from "prop-types";
import { useCallback } from "react";
import * as analytics from "services/analytics";
import AdvancedFilterButton from "./AdvancedFilterButton";
const AdvancedFilters = ({ toggleCategory, categoryIds }) => {
  const toggleMeal = useCallback(() => {
    toggleCategory(MEAL_PROGRAM_CATEGORY_ID);
    analytics.postEvent("toggleMealFilter", {});
  }, [toggleCategory]);

  const togglePantry = useCallback(() => {
    toggleCategory(FOOD_PANTRY_CATEGORY_ID);
    analytics.postEvent("togglePantryFilter", {});
  }, [toggleCategory]);

  const isMealSelected = categoryIds.indexOf(MEAL_PROGRAM_CATEGORY_ID) >= 0;
  const isPantrySelected = categoryIds.indexOf(FOOD_PANTRY_CATEGORY_ID) >= 0;

  return (
    <>
      <Grid item sx={{ whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
        <AdvancedFilterButton
          label="Pantry"
          onClick={togglePantry}
          isSelected={isPantrySelected}
          icon={PantryLocatorIcon}
        />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap" }}>
        <AdvancedFilterButton
          label="Meal"
          onClick={toggleMeal}
          isSelected={isMealSelected}
          icon={MealLocatorIcon}
        />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap" }}>
        <AdvancedFilterButton label="Open Now" onClick="" />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap" }}>
        <AdvancedFilterButton label="Days" onClick="" hasDropdown={true} />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap", marginRight: "1rem" }}>
        <AdvancedFilterButton label="More Filters" onClick="" />
      </Grid>
    </>
  );
};

AdvancedFilters.propTypes = {
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
};

export default AdvancedFilters;
