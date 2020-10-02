import pantryIcon from "../images/pantryIcon";
import mealIcon from "../images/mealIcon";
import splitPantryMealIcon from "../images/splitPantryMealIcon";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "../constants/stakeholder";

const getIcon = (stakeholder) => {
  let isClosed = false;
  if (stakeholder.inactiveTemporary || stakeholder.inactive) isClosed = true;

  return stakeholder.categories.some(
    (category) => category.id === FOOD_PANTRY_CATEGORY_ID
  ) &&
    stakeholder.categories.some(
      (category) => category.id === MEAL_PROGRAM_CATEGORY_ID
    )
    ? splitPantryMealIcon(isClosed)
    : stakeholder.categories[0].id === FOOD_PANTRY_CATEGORY_ID
    ? pantryIcon(isClosed)
    : mealIcon(isClosed);
};

export default getIcon;
