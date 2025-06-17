import { Grid } from "@mui/material";

import MealLocatorIcon from "icons/MealLocatorIcon";
import PantryLocatorIcon from "icons/PantryLocatorIcon";
import PropTypes from "prop-types";
import { useCallback } from "react";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useFilterPanel,
  useOpenTimeFilter,
} from "../../../../appReducer";
import FilterPanel from "../ResultsFilters/FilterPanel";
import AdvancedFilterButton from "./AdvancedFilterButton";
import { getDayTimeNow } from "helpers";

const AdvancedFilters = ({
  toggleMeal,
  togglePantry,
  isMealSelected,
  isPantrySelected,
}) => {
  // toggling filter panel state
  const dispatch = useAppDispatch();
  const open = useFilterPanel();

  // toggling Open Now state
  const openTime = useOpenTimeFilter();
  const handleOpenNowToggle = () => {
    const [dayNow, timeNow] = getDayTimeNow();

    dispatch({
      type: "OPEN_TIME_FILTER_UPDATED",
      openTimeFilter:
        openTime.radio !== "Open Now"
          ? {
              radio: "Open Now",
              day: dayNow,
              time: timeNow,
            }
          : {
              radio: "Show All",
              day: "",
              time: "",
            },
    });
  };

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
          onClick={() => handleOpenNowToggle()}
          isSelected={openTime.radio === "Open Now"}
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
    </>
  );
};

AdvancedFilters.propTypes = {
  categoryIds: PropTypes.any,
  toggleCategory: PropTypes.func,
};

export default AdvancedFilters;
