import PantryIconStakeholder from "../icons/PantryIconStakeholder";
import SplitPantryMealIconStakeholder from "icons/SplitPantryMealIconStakeholder";
import MealIconStakeholder from "../icons/MealIconStakeholder";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";
import type { SearchStakeholder } from "../types/appState";

interface StakeholderIconProps {
  stakeholder: SearchStakeholder;
}

const StakeholderIcon = ({ stakeholder }: StakeholderIconProps) => {
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
    return <SplitPantryMealIconStakeholder isClosed={isClosed} />;
  } else if (isFoodPantry) {
    return <PantryIconStakeholder isClosed={isClosed} />;
  } else {
    return <MealIconStakeholder isClosed={isClosed} />;
  }
};

export default StakeholderIcon;
