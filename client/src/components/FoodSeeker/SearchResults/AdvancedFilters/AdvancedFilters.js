import React, { useCallback } from 'react';
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import AdvancedFilterButton from './AdvancedFilterButton';
import * as analytics from "services/analytics";
import PantryLocatorIcon from 'icons/PantryLocatorIcon';
import MealLocatorIcon from 'icons/MealLocatorIcon';
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";
const AdvancedFilters = ({
  toggleCategory,
  categoryIds,
}) => {
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
      <Grid item sx={{ whiteSpace: "nowrap", marginLeft: '0.5rem' }}>
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
        <AdvancedFilterButton
          label="Open Now"
          onClick=""
        />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap" }}>
        <AdvancedFilterButton
          label="Days"
          onClick=""
          hasDropdown={true}
        />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap", marginRight: '1rem' }}>
        <AdvancedFilterButton
          label="More Filters"
          onClick=""
        />
      </Grid>
    </>
  )
}

AdvancedFilters.propTypes = {
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
};

export default AdvancedFilters