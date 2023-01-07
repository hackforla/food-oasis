import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: "auto",
    overflowY: "hidden",
    display: "flex",
  },
  list: {
    width: "35%",
    overflow: "auto",
  },
  map: {
    height: "100%",
    flex: 1,
  },
}));

const DesktopLayout = ({ filters, list, map }) => {
  const classes = useStyles();

  return (
    <>
      {filters}
      <div className={classes.container}>
        <div className={classes.list}>{list}</div>
        <div className={classes.map}>{map}</div>
      </div>
    </>
  );
};

export default DesktopLayout;
