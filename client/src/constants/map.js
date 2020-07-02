import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "./stakeholder";
import { foodPantry, mealProgram, closed } from "../theme/colors";

export const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v11";

export const ORGANIZATION_LABELS = {
  [FOOD_PANTRY_CATEGORY_ID]: "Food Pantry",
  [MEAL_PROGRAM_CATEGORY_ID]: "Meal",
};

export const ORGANIZATION_COLORS = {
  [FOOD_PANTRY_CATEGORY_ID]: foodPantry,
  [MEAL_PROGRAM_CATEGORY_ID]: mealProgram,
};

export const CLOSED_COLOR = closed;
