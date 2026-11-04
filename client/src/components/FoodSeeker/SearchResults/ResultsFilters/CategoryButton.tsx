import { Button, useTheme } from "@mui/material";
import { FC, CSSProperties } from "react";
import MealIcon from "icons/MealIconNoBorder";
import PantryIcon from "icons/PantryIconNoBorder";

interface CategoryButtonProps {
  isSelected: boolean;
  onClick: () => void;
  icon: "pantry" | "meal";
  label: string;
  style?: CSSProperties;
}

const CategoryButton: FC<CategoryButtonProps> = ({
  isSelected,
  onClick,
  icon,
  label,
  style,
}) => {
  const theme = useTheme();
  const Icon = icon === "pantry" ? PantryIcon : MealIcon;
  const ICON_SIZE = "25px";

  return (
    <Button
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "4px",
        borderColor: isSelected
          ? "translucent"
          : icon === "pantry"
          ? theme.palette.foodPantry.main
          : theme.palette.mealProgram.main,
        backgroundColor: !isSelected
          ? theme.palette.common.white
          : icon === "pantry"
          ? theme.palette.foodPantry.main
          : theme.palette.mealProgram.main,
        color: isSelected
          ? theme.palette.common.white
          : icon === "pantry"
          ? theme.palette.foodPantry.main
          : theme.palette.mealProgram.main,
        ...style,
      }}
      onClick={onClick}
    >
      <Icon selected={isSelected} width={ICON_SIZE} height={ICON_SIZE} />
      {label}
    </Button>
  );
};

export default CategoryButton;
