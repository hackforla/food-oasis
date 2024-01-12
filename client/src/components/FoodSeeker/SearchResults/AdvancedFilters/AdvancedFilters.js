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
import { useAppDispatch, useFilterPanel } from "../../../../appReducer";
import FilterPanel from "../ResultsFilters/FilterPanel";
import AdvancedFilterButton from "./AdvancedFilterButton";

const AdvancedFilters = ({ toggleCategory, categoryIds }) => {
  const isMealSelected = categoryIds.includes(MEAL_PROGRAM_CATEGORY_ID);
  const isPantrySelected = categoryIds.includes(FOOD_PANTRY_CATEGORY_ID);

  const toggleMeal = useCallback(() => {
    toggleCategory(MEAL_PROGRAM_CATEGORY_ID);
    analytics.postEvent("toggleMealFilter", {});
  }, [toggleCategory]);

  const togglePantry = useCallback(() => {
    toggleCategory(FOOD_PANTRY_CATEGORY_ID);
    analytics.postEvent("togglePantryFilter", {});
  }, [toggleCategory]);

  // toggling filter panel state
  const dispatch = useAppDispatch();
  const open = useFilterPanel();

  return (
    <>
      <Grid
        item
        sx={{
          whiteSpace: "nowrap",
          marginLeft: "0.5rem",
          marginTop: "0.75rem",
        }}
      >
        <AdvancedFilterButton
          label="Pantry"
          onClick={togglePantry}
          isSelected={isPantrySelected}
          icon={PantryLocatorIcon}
        />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap", marginTop: "0.75rem" }}>
        <AdvancedFilterButton
          label="Meal"
          onClick={toggleMeal}
          isSelected={isMealSelected}
          icon={MealLocatorIcon}
        />
      </Grid>
      <Grid item sx={{ whiteSpace: "nowrap", marginTop: "0.75rem" }}>
        <AdvancedFilterButton
          label="Open Now"
          onClick={() => console.log("todo: `Open Now` filter button")}
        />
      </Grid>
      <Grid
        item
        sx={{ whiteSpace: "nowrap", marginTop: "0.75rem", marginRight: "1rem" }}
      >
        <AdvancedFilterButton
          label="More Filters"
          onClick={() => {
            dispatch({
              type: "FILTER_PANEL_TOGGLE",
              filterPanel: !open,
            });
          }}
          isSelected={open}
        />
      </Grid>
      <FilterPanel
        mealPantry={{
          toggleMeal,
          togglePantry,
          isMealSelected,
          isPantrySelected,
        }}
      />
    </>
  );
};

AdvancedFilters.propTypes = {
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
};

export default AdvancedFilters;
