import React from "react";
import { Button } from "@material-ui/core";
import { Save } from "@material-ui/icons";

const SaveButton = props => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Save />
      {props.label ? props.label : "Save"}
    </Button>
  );
};

export default SaveButton;
