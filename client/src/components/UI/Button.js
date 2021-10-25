import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { ICON_DICT } from "./iconLookup";

const Base = ({ children, variant, color, type, ...props }) => {
  return (
    <MuiButton
      type={type || "button"}
      variant={variant || "contained"}
      color={color || "primary"}
      aria-label={type || "button"}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Base.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  color: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
};

const Button = ({ children, icon, iconPosition, ...props }) => {
  if (icon) {
    let Icon = ICON_DICT[icon];
    let position =
      iconPosition === "end" ? { endIcon: <Icon /> } : { startIcon: <Icon /> };
    return (
      <Base {...props} {...position}>
        {children}
      </Base>
    );
  }

  return <Base {...props}>{children}</Base>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  kind: PropTypes.string,
  iconPosition: PropTypes.oneOf(["end", "start"]), // will default to "start" if not provided
  icon: PropTypes.oneOf([
    "add",
    "arrowUp",
    "arrowDown",
    "cancel",
    "check",
    "close",
    "delete",
    "details",
    "edit",
    "locationOn",
    "locationSearching",
    "menu",
    "remove",
    "save",
    "search",
    "wrapText",
  ]),
};

export default Button;
