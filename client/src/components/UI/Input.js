import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const Input = (props) => {
  return (
    <TextField
      {...props}
      label={props.label}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
