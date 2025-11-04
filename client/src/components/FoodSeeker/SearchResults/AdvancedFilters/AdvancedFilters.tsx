import { Grid } from "@mui/material";
import { FC, MouseEventHandler, Dispatch } from "react";
import { getDayTimeNow } from "helpers";
import MealLocatorIcon from "icons/MealLocatorIcon";
import PantryLocatorIcon from "icons/PantryLocatorIcon";
import {
  useAppDispatch,
  useFilterPanel,
  useOpenTimeFilter,
} from "../../../../appReducer";
import AdvancedFilterButton from "./AdvancedFilterButton";

interface AdvancedFiltersProps {
  toggleMeal: MouseEventHandler<HTMLButtonElement>;
  togglePantry: MouseEventHandler<HTMLButtonElement>;
  isMealSelected: boolean;
  isPantrySelected: boolean;
}

const AdvancedFilters: FC<AdvancedFiltersProps> = ({
  toggleMeal,
  togglePantry,
  isMealSelected,
  isPantrySelected,
}) => {
  // toggling filter panel state
  const dispatch = useAppDispatch() as Dispatch<any>;
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

export default AdvancedFilters;
