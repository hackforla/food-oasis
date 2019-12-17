import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
}));
const SearchBarAutocomplete = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return <div className={classes.container} ref={ref} {...props} />;
});

export default SearchBarAutocomplete;
