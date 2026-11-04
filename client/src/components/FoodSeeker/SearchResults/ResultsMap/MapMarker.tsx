import type { FC } from "react";
import LgMealIcon from "images/markers/lgMealIcon";
import LgPantryIcon from "images/markers/lgPantryIcon";
import LgSplitIcon from "images/markers/lgSplitIcon";
import SmMealIcon from "images/markers/smMealIcon";
import SmPantryIcon from "images/markers/smPantryIcon";
import SmSplitIcon from "images/markers/smSplitIcon";
import type { SvgIconProps } from "types/svgIcon";

interface MapMarkerProps {
  category: -1 | 0 | 1;
  selected?: boolean;
  scale?: number;
}

function MapMarker({ category, selected = false, scale = 1 }: MapMarkerProps) {
  const baseWidth = selected ? 53 : 30;
  const baseHeight = selected ? 67 : 40;

  const width = baseWidth * scale;
  const height = baseHeight * scale;

  const Icon = markerIcons[category][selected ? "selected" : "default"];
  return <Icon width={width} height={height} />;
}

export default MapMarker;

const markerIcons: Record<
  -1 | 0 | 1,
  { default: FC<SvgIconProps>; selected: FC<SvgIconProps> }
> = {
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
