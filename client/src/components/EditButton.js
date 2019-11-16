import React from "react";
import { Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const styles = {
  button: {
    backgroundColor: "#FAEBD7",
  },
};

const EditButton = props => {
  return (
    <Button style={styles.button} {...props}>
      <Edit />
      {props.label ? props.label : "Edit"}
    </Button>
  );
};

export default EditButton;
