import React from "react";
import { makeStyles } from "@material-ui/core";
import Footer from "../../../Layout/Footer";

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
  title: {
    textTransform: "uppercase",
    fontWeight: 500,
    textAlign: "center",
    background: "#FFF",
    margin: 0,
    padding: "32px 0",
    "& $span": {
      color: "#336699",
    },
  },
  figure: {
    margin: 0,
    padding: 0,
  },
}));
const Page = (props) => {
  const { pageTitle, pageImage, children } = props;
  const classes = useStyles();

  return (
    <div className={classes.outer}>
      <div className={classes.main}>
        <h1 className={classes.title}>
          <span>{pageTitle}</span>
        </h1>
        <br />
        {pageImage && (
          <figure className={classes.figure}>
            <img
              alt={pageImage.alt}
              src={pageImage.src}
              style={{ width: "100%", borderRadius: "24px" }}
            />
          </figure>
        )}
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
