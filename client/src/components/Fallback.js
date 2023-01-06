import React from "react";
import { useLocation } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  outer: {
    background: "#fff",
  },
  main: {
    padding: "1.5rem 0;",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media only screen and (min-width: 75em)": {
      padding: "1.5rem 2rem",
    },
  },
  figure: {
    margin: 0,
    padding: 0,
  },
  unauthorized: {
    padding: "32px",
    margin: "32px 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      color: "#336699",
      flexBasis: "100",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
}));
const Fallback = () => {
  const classes = useStyles();
  const { state } = useLocation();

  return (
    <div className={classes.outer}>
      <div className={classes.main}>
        <figure className={classes.figure}></figure>
        <div className={classes.unauthorized}>
          <h2>Unauthorized</h2>
          <p>{state?.message || "Something went wrong."}</p>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
