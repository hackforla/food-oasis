import React from "react";
import { IconButton as MuiIconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { ICON_DICT } from "./iconLookup";

const IconButton = ({ icon, ...props }) => {
  const Icon = ICON_DICT[icon];
  return (
    <MuiIconButton
      variant={props.variant || "contained"}
      color={props.color || "default"}
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

export default IconButton;
