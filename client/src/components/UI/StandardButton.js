import { IconButton as MuiIconButton } from "@mui/material";
import PropTypes from "prop-types";
import { ICON_DICT } from "../UI/iconLookup.js";

const IconButton = ({ icon, ...props }) => {
  const Icon = ICON_DICT[icon];
  return (
    <MuiIconButton
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      fontSize={props.fontSize || "inherit"}
      aria-label={icon}
      {...props}
    >
      <Icon />
    </MuiIconButton>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export { IconButton };
