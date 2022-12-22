import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Button } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  white,
  primary,
  hover,
  bodyText,
  inactiveButton,
  inactiveButtonText,
} from "../../../theme/colors";

/**
 * Mapping for logo params to components.
 * Values equal Material UI Icon names:
 * https://material-ui.com/components/material-icons/
 *
 * Consider moving to external file, if this list grows.
 */
const LogoParamMap = {
  close: Close,
  search: Search,
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: white,
  },
  text: {
    color: bodyText,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: `3px solid ${hover}`,
      transition: "none",
      margin: "-3px 0 -6px",
    },
    margin: "3px 0",
  },
  contained: {
    backgroundColor: primary,
    "&:hover": {
      backgroundColor: hover,
      "&:disabled": {
        backgroundColor: inactiveButton,
      },
    },
    "&:disabled": {
      backgroundColor: inactiveButton,
      color: inactiveButtonText,
    },
    lineHeight: "17px",
  },
  outlined: {
    backgroundColor: "transparent",
    border: `1px solid ${primary}`,
    color: primary,
    "&:hover": {
      backgroundColor: "transparent",
      border: `1px solid ${hover}`,
      color: hover,
      "&:disabled": {
        backgroundColor: "transparent",
      },
    },
    "&:disabled": {
      backgroundColor: "transparent",
      border: `1px solid ${inactiveButtonText}`,
      color: inactiveButtonText,
    },
  },
  bigButtonStyles: theme.typography.overline,
}));

const PrimaryButton = (props) => {
  let { children, color, disabled, logo, size, variant } = props;

  let showBigText = false;

  const classes = useStyles();

  // default size to medium
  size = !size || typeof size === "undefined" ? "medium" : size;
  // set logo size based on button size
  let logoSize = size === "medium" ? "small" : "default";

  // condition for when button text should be set to big
  if ((size === "large" || size === "medium") && variant === "text") {
    showBigText = true;
  }

  const renderLogo = () => {
    if (Object.prototype.hasOwnProperty.call(LogoParamMap, logo)) {
      const Logo = LogoParamMap[logo];
      return <Logo fontSize={logoSize} />;
    }
    return null;
  };

  return (
    <Button
      variant={variant}
      classes={{
        root: showBigText
          ? classNames(classes.root, classes.bigButtonStyles)
          : classes.root,
        label: classes.textLabel,
        text: classes.text,
        contained: classes.contained,
        outlined: classes.outlined,
        outlinedPrimary: classes.outlinedPrimaryStyles,
      }}
      color={color ? "default" : color}
      size={size}
      disabled={disabled}
      {...props}
    >
      {logo && renderLogo()}
      {children}
    </Button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PrimaryButton;
