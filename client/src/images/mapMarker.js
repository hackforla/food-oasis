import React from "react";
import PantryIcon from "../icons/PantryIcon";
import SplitPantryMealIcon from "icons/SplitPantryMealIcon";
import MealIcon from "../icons/MealIcon";

/*
This is a temporary test file for Issue #923 testing. It should be
removed once we make a decision about the selected orgaiation map pin style,
and the contents of this file should replace mapMarker.js, if this is the
preferred style.

*/

const MapMarker = ({ category, onClick, selected = false, scale = 1.0 }) => {
  const width = (selected ? 53 : 30) * scale;
  const height = (selected ? 67 : 40) * scale;
  const iconProps = {
    width,
    height,
    selected,
    onClick,
    viewBox: selected ? "0 0 48 64" : "0 0 53 67",
  };

  if (category === 0) {
    return <PantryIcon {...iconProps} />;
  } 
  
  
  if (category === 1) {
    return <MealIcon {...iconProps} />;
  }
  
  if (category === -1) {
    return <SplitPantryMealIcon {...iconProps} />;
  }
};

export default MapMarker;
