import React from "react";
import { Button } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

const CancelButton = props => {
  return (
    <Button variant="contained" color="secondary" {...props}>
      <Cancel />
      {props.label ? props.label : "Cancel"}
    </Button>
  );
};

export default CancelButton;
