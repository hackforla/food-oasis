import React from "react";
import { IconButton as MaterialIconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Cancel,
  Check,
  Close,
  Delete,
  Details,
  Edit,
  Remove,
  Save,
  Search,
} from "@material-ui/icons";

const IconButton = ({ kind, ...props }) => {
  const Icon = ICON_DICT[kind];
  return (
    <MaterialIconButton
      variant="contained"
      color="default"
      aria-label={props.ariaLabel}
      {...props}
    >
      <Icon />
    </MaterialIconButton>
  );
};

IconButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default IconButton;

export const ICON_DICT = {
  add: Add,
  arrowUp: ArrowUpward,
  arrowDown: ArrowDownward,
  delete: Delete,
  check: Check,
  close: Close,
  save: Save,
  edit: Edit,
  cancel: Cancel,
  search: Search,
  details: Details,
  remove: Remove,
};
