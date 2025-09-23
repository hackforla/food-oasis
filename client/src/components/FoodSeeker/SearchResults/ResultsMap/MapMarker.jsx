import LgMealIcon from "images/markers/lgMealIcon.jsx";
import LgPantryIcon from "images/markers/lgPantryIcon";
import LgSplitIcon from "images/markers/lgSplitIcon";
import SmMealIcon from "images/markers/smMealIcon.jsx";
import SmPantryIcon from "images/markers/smPantryIcon";
import SmSplitIcon from "images/markers/smSplitIcon";


function MapMarker({ category, selected = false, scale = 1 }) {
  const baseWidth = selected ? 53 : 30;
  const baseHeight = selected ? 67 : 40;

  const width = baseWidth * scale;
  const height = baseHeight * scale;

  const Icon = markerIcons[category][selected ? "selected" : "default"];
  return <Icon width={width} height={height} />;
}

export default MapMarker;

const markerIcons = {
  [-1]: {
    default: SmSplitIcon,
    selected: LgSplitIcon,
  },
  [0]: {
    default: SmPantryIcon,
    selected: LgPantryIcon,
  },
  [1]: {
    default: SmMealIcon,
    selected: LgMealIcon,
  },
};