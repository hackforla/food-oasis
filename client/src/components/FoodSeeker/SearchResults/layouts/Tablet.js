import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    overflow: "hidden",
  },
  map: {
    height: "50%",
  },
  list: {
    height: "50%",
    overflow: "auto",
  },
}));

const TabletLayout = ({ filters, list, map }) => {
  const classes = useStyles();

  return (
    <>
      {filters}
      <div className={classes.container}>
        <div className={classes.map}>{map}</div>
        <div className={classes.list}>{list}</div>
      </div>
    </>
  );
};

export default TabletLayout;
