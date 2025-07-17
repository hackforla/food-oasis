import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "constants/stakeholder";

type Props = {
  categoryIds: number[];
  toggleCategory: (id: number) => void;
};

export const useInitializeCategoryFilter = ({
  categoryIds,
  toggleCategory,
}: Props) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pantryParam = params.get("pantry");
    const mealParam = params.get("meal");

    if (pantryParam === "0" && categoryIds.includes(FOOD_PANTRY_CATEGORY_ID)) {
      toggleCategory(FOOD_PANTRY_CATEGORY_ID);
    }
    if (mealParam === "0" && categoryIds.includes(MEAL_PROGRAM_CATEGORY_ID)) {
      toggleCategory(MEAL_PROGRAM_CATEGORY_ID);
    }
  }, []);
};
