import React from "react";
import PantryIcon from "../icons/PantryIcon";
import SplitPantryMealIcon from "icons/SplitPantryMealIcon";
import MealIcon from "../icons/MealIcon";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";

const Icon = ({ stakeholder, height, width }) => {
  if (
    !stakeholder ||
    !stakeholder.categories ||
    !stakeholder.categories.length
  ) {
    return <div />;
  }

  let isClosed = false;
  if (stakeholder.inactiveTemporary || stakeholder.inactive) {
    isClosed = true;
  }

  const isBothMealProgramAndFoodPantry =
    stakeholder.categories.some(
      (category) => category.id === FOOD_PANTRY_CATEGORY_ID
    ) &&
    stakeholder.categories.some(
      (category) => category.id === MEAL_PROGRAM_CATEGORY_ID
    );
  const isFoodPantry = stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID;

  if (isBothMealProgramAndFoodPantry) {
    return (
      <SplitPantryMealIcon isClosed={isClosed} height={height} width={width} />
    );
  } else if (isFoodPantry) {
    return <PantryIcon isClosed={isClosed} height={height} width={width} />;
  } else {
    return <MealIcon isClosed={isClosed} height={height} width={width} />;
  }
};

export default Icon;
