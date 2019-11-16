import React from "react";
import { Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const styles = {
  button: {
    backgroundColor: "#FAEBD7",
  },
};

const SearchButton = props => {
  return (
    <Button {...props} style={styles.button}>
      <Search />
      Search
    </Button>
  );
};

export default SearchButton;
