import React from "react";
import PantryIcon from "images/pantryIcon";
import MealIcon from "images/mealIcon";
import SplitPantryMealIcon from "images/splitPantryMealIcon";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";

const Icon = ({ stakeholder, height, width }) => {
  let isClosed = false;
  if (!stakeholder || !stakeholder.categories || !stakeholder.categories.length)
    return <div />;
  if (stakeholder.inactiveTemporary || stakeholder.inactive) isClosed = true;

  return stakeholder.categories.some(
    (category) => category.id === FOOD_PANTRY_CATEGORY_ID
  ) &&
    stakeholder.categories.some(
      (category) => category.id === MEAL_PROGRAM_CATEGORY_ID
    ) ? (
    <SplitPantryMealIcon isClosed={isClosed} height={height} width={width} />
  ) : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID ? (
    <PantryIcon isClosed={isClosed} height={height} width={width} />
  ) : (
    <MealIcon isClosed={isClosed} height={height} width={width} />
  );
};

export default Icon;
