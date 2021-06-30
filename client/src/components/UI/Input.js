import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const Input = (props) => {
  return (
    <TextField
      {...props}
      variant={props.variant || 'outlined'}
      label={props.label}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
