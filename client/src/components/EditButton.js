import React from "react";
import { Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const styles = {
  button: {
    backgroundColor: "#FAEBD7",
    margin: "10px"
  }
};

const EditButton = props => {
  return (
    <Button {...props} style={styles.button}>
      <Edit />
      {props.label ? props.label : "Edit"}
    </Button>
  );
};

export default EditButton;
