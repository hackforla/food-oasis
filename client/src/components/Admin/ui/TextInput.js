import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import BigTooltip from "./BigTooltip";

const TextInput = (props) => {
  let { tooltip } = props;

  const renderTextField = () => {
    return (
      <TextField
        type="text"
        variant="outlined"
        size="small"
        margin="normal"
        fullWidth
        {...props}
      />
    );
  };

  const renderTextFieldWithTooltip = () => {
    return <BigTooltip title={tooltip}>{renderTextField()}</BigTooltip>;
  };
  //{renderTextFieldWithTooltip()}
  //{renderTextField()}
  return tooltip ? renderTextFieldWithTooltip() : renderTextField();
};

TextInput.propTypes = {
  variant: PropTypes.string,
  // tooltip: PropTypes.string,
};

export default TextInput;
