import { Box, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddressDropDown from "components/FoodSeeker/AddressDropDown";
import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "constants/stakeholder";
import { useLocationPermission } from "hooks/useGeolocation";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import * as analytics from "services/analytics";
import CategoryButton from "./CategoryButton";
import SwitchViewsButton from "./SwitchViewsButton";
import useFeatureFlag from "hooks/useFeatureFlag";
import { TENANT_CONFIG } from "../../../../helpers/Constants";
import Geolocate from "./Geolocate";
import useBreakpoints from "hooks/useBreakpoints";

const ResultsFilters = ({
  categoryIds,
  toggleCategory,
  showList,
  toggleShowList,
}) => {
  const isMealsSelected = categoryIds.indexOf(MEAL_PROGRAM_CATEGORY_ID) >= 0;
  const isPantrySelected = categoryIds.indexOf(FOOD_PANTRY_CATEGORY_ID) >= 0;
  const { taglineText } = TENANT_CONFIG;
  const locationPermission = useLocationPermission();
  const [error, setError] = useState("");
  const hasAdvancedFilterFeatureFlag = useFeatureFlag("advancedFilter");
  const { isMobile } = useBreakpoints();

  useEffect(() => {
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

  return (
    <Grid2
      container
      sx={{
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        padding: "0.5rem 0",
        zIndex: 2,
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
          {!hasAdvancedFilterFeatureFlag && (
            <Grid2
              container
              xs={12}
              sm={6}
              spacing={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Grid2 item="true">
                <CategoryButton
                  icon="pantry"
                  onClick={togglePantry}
                  label="Pantries"
                  isSelected={isPantrySelected}
                />
              </Grid2>
              <Grid2 item="true">
                <CategoryButton
                  icon="meal"
                  onClick={toggleMeal}
                  label="Meals"
                  isSelected={isMealsSelected}
                  style={{ marginLeft: 5 }}
                />
              </Grid2>
            </Grid2>
          )}

          <Grid2 xs={12} sm={6}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                marginX: "1rem",
                maxWidth: "99vw",
                gap: "0.5rem",
              }}
            >
              <AddressDropDown autoFocus={false} />
              {isMobile && <Geolocate />}
              <Box
                sx={{
                  maxWidth: "48px",
                  boxSizing: "border-box",
                }}
                display={{ xs: "block", sm: "none" }}
              >
                <SwitchViewsButton
                  isListView={showList}
                  onClick={toggleShowList}
                />
              </Box>
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
