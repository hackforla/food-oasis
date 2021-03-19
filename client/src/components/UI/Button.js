import React from "react";
import { Button as MaterialButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { ICON_DICT } from "./IconButton";

const Base = ({ children, color = "primary", ...props }) => {
  return (
    <MaterialButton variant="contained" color={color} {...props}>
      {children}
    </MaterialButton>
  );
};

Base.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  color: PropTypes.string,
};

const Button = ({ icon, children, ...props }) => {
  const Icon = ICON_DICT[icon];
  if (icon) {
    return (
      <Base startIcon={<Icon />} {...props}>
        {children}
      </Base>
    );
  }
  return <Base {...props}>{children}</Base>;
};

export default Button;

Button.propTypes = {
  kind: PropTypes.string,
  icon: PropTypes.oneOf([
    "add",
    "delete",
    "check",
    "close",
    "save",
    "edit",
    "cancel",
    "search",
    "details",
    "remove",
  ]),
};
