import React from "react";
import { TextField as MuiTextField } from "@mui/material";
import PropTypes from "prop-types";

const TextField = (props) => {
  return (
    <MuiTextField
      variant={props.variant || "outlined"}
      label={props.label}
      {...props}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default TextField;
