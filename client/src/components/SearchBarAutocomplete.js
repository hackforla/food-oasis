import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: "5",
  },
}));
export default function SearchBarAutocomplete() {
  const classes = useStyles();
  return <div className={classes.container}>🔎 LocationAutoComplete</div>;
}
