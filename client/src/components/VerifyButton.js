import React from "react";
import { Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";

const VerifyButton = props => {
  return (
    <Button variant="contained" color="secondary" {...props}>
      <Check />
      {props.label ? props.label : "Verify"}
    </Button>
  );
};

export default VerifyButton;
