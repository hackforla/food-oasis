import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
// import classNames from "classnames";
// import { bodyTextColor } from "../../theme/colors";
import BigTooltip from "./BigTooltip";

// const useStyles = makeStyles((theme) => ({}));

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
  tooltip: PropTypes.string,
};

export default TextInput;
