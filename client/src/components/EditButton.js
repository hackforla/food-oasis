import React from "react";
import { Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const EditButton = props => {
  return (
    <Button {...props}>
      <Edit />
      {props.label ? props.label : "Edit"}
    </Button>
  );
};

export default EditButton;
