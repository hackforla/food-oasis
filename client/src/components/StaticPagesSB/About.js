import React from "react";

import aboutbg from "./assets/about-bg.png";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farmPeople from "./assets/farm-people.png";
import foodBank from "./assets/food-bank.png";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
    color: "#4d4d4d",
    textTransform: "uppercase",
    fontWeight: 500,
    textAlign: "center",
    background: "#FFF",
    margin: 0,
    padding: "32px 0",
    "& $span": {
      color: "#4d4d4d",
    },
  },
  figure: {
    margin: 0,
    padding: 0,
  },
  icon: {
    margin: "auto",
  },
  mission: {
    padding: "32px",
    margin: "32px 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      color: "#4d4d4d",
      flexBasis: "100",

      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  team: {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    background: "#B6D8FB",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      flexBasis: "100",

      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    "& $a": {
      color: "#4d4d4d",
    },
  },
  contact: {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    "& $h2": {
      color: "#4d4d4d",
      flexBasis: "100",

      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    "& $a": {
      color: "#4d4d4d",
    },
    "& $p": {
      marginBottom: "16px",
    },
  },
  partners: {
    background: "#fff",
    padding: "48px 32px",
    borderRadius: "24px",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    "& $h2": {
      color: "#4d4d4d",
      width: "100%",
      flexBasis: "100",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "60px",
    },
    "@media only screen and (min-width: 64em)": {
      flexDirection: "row",
    },
  },
  partnersLogo: {
    maxWidth: "100%",
    height: "100%",
    marginBottom: "40px",
    "@media only screen and (min-width: 64em) ": {
      marginBottom: 0,
    },
  },
}));
const About = () => {
  const classes = useStyles();
  // const { t } = useTranslation("about");
  return (
    <div className={classes.outer}>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="About" src={aboutbg} style={{ width: "100%" }} />
        </figure>
        <Typography variant="h1" className={classes.title}>
          <span>About</span> Santa Barbara Food Oasis
        </Typography>
        <div className={classes.mission}>
          <img
            alt="Our Mission"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Our Mission</Typography>
          <p>(TBD))</p>
        </div>
        <section className={classes.team}>
          <img
            alt="Our Team"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Our Team</Typography>
          <p> (TBD) </p>
        </section>
        <section className={classes.contact}>
          <img
            alt="Contact Us"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Contact Us</Typography>
          <Typography variant="body1">
            Questions about our project?
            <br />
            Updates to the listings?
            <br />
            General inquiries?
            <br />
          </Typography>
          <Typography variant="body1">
            Please contact our Support Team
            <br />
            <a href="mailto:foodoasisinfo@hackforla.org">
              foodoasisinfo@hackforla.org
            </a>
          </Typography>
        </section>
        <section className={classes.partners}>
          {/* <img
            alt='Our Team'
            src={iconSpacerGray}
            className={classes.icon}
            height='40'
          /> */}
          <h2>Our Partners</h2>
          <a href="https://www.foodcyclela.org/" target={"_blank"}>
            <img
              alt="Food Cycle LA"
              src={foodCycle}
              className={classes.partnersLogo}
            />
          </a>
          <a href="https://foodforward.org/" target={"_blank"}>
            <img
              alt="Food Forward"
              src={foodForward}
              className={classes.partnersLogo}
            />
          </a>
          <a href="https://www.farm2people.org/" target={"_blank"}>
            <img
              alt="Farm People"
              src={farmPeople}
              className={classes.partnersLogo}
            />
          </a>
          <a href="https://www.lafoodbank.org/" target={"_blank"}>
            <img
              alt="Food Bank"
              src={foodBank}
              className={classes.partnersLogo}
            />
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
