import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { ICON_DICT } from "./iconLookup";
import type { IconName } from "./iconLookup";

type StandardIconButtonProps = Omit<MuiIconButtonProps, "children"> & {
  icon: IconName;
  fontSize?: SvgIconProps["fontSize"];
  variant?: "text" | "outlined" | "contained";
};

const IconButton = ({
  icon,
  fontSize = "inherit",
  variant = "contained",
  color = "primary",
  ...props
}: StandardIconButtonProps) => {
  const Icon = ICON_DICT[icon];
  return (
    <MuiIconButton
      {...props}
      {...({ variant } as Record<string, unknown>)}
      color={color}
      aria-label={icon}
    >
      <Icon fontSize={fontSize} />
    </MuiIconButton>
  );
};

export { IconButton };
