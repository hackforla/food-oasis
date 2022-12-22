import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioTrueFalseEither = (props) => {
  const { label, name, value, onChange } = props;
  return (
    <FormControl
      component="fieldset"
      style={{ border: "1px solid gray", padding: "0.5em", width: "100%" }}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        defaultValue="either"
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
        <FormControlLabel value="either" control={<Radio />} label="Either" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioTrueFalseEither;
