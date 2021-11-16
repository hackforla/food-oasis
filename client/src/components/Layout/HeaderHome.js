import React from "react";
import Menu from "./Menu";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerHolder: {
    backgroundColor: "transparent",
    marginBottom: "-65px",
    boxShadow: "none",
  },
  header: {
    minHeight: "60px",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0.25em 1.25em 0 0",
    [theme.breakpoints.down("xs")]: {
      padding: "0.25em 0.5em 0 0",
      minHeight: "45px",
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky" className={classes.headerHolder}>
        <Toolbar className={classes.header}>
          <Menu />
        </Toolbar>
      </AppBar>
    </>
  );
}
