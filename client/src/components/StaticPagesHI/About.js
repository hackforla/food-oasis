import React from "react";

import aboutbg from "./assets/about-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import foodBank from "./assets/aloha-harvest.png";
import { makeStyles } from "@material-ui/core";
import Footer from "../Layout/Footer";

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
  team: {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    color: "#fff",
    background: "#336699",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      flexBasis: "100",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    "& $a": {
      color: "#fff",
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
      color: "#336699",
      flexBasis: "100",
      textTransform: "uppercase;",
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
      color: "#336699",
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
    backgroundColor: "blue",
    marginBottom: "40px",
    "@media only screen and (min-width: 64em) ": {
      marginBottom: 0,
    },
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
const About = () => {
  const classes = useStyles();
  // const { t } = useTranslation("about");
  return (
    <div className={classes.outer}>
      <h1 className={classes.title}>
        <span>About</span> Food Oasis Hawaii
      </h1>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="About" src={aboutbg} style={{ width: "100%" }} />
        </figure>
        <div className={classes.mission}>
          <img
            alt="Our Mission"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Our Mission</h2>
          <p>
            <a href={"https://alohaharvest.org/"}>Aloha Harvest</a> is the largest food rescue nonprofit in the state
            of Hawaiʻi. Seven days a week, free of
            charge and free of liability, we rescue quality excess food from donors (ex: wholesale distributors,
            grocery stores, restaurants, hotels) and redistribute it to recipient agencies feeding the hungry
            (ex: homeless shelters, social services, food pantries).
          </p>
          <p>
            We have been doing this work for over 21 years and represent the largest and most successful collaboration
            between businesses and nonprofits in the state.
            <a href="https://drive.google.com/file/d/1-sdszGH_y2MLd-yTDVa0ESalyY_zCDKH/view">Last year</a>, we
            worked with 370 food donors and 273 recipient agencies to redistribute over 2.7 million pounds of good
            food that would have otherwise been wasted!
          </p>
          <p>
            This work is essential because even while 1 in 5 people in Hawaiʻi rely on food pantries for assistance,
            about 237,000 tons of good food is wasted annually. Here's a
            <a href="https://www.youtube.com/watch?v=p9kNYCUtg8E&feature=youtu.be">short</a> video that explains
            more of our process, impact, and future potential.
          </p>
        </div>
        <section className={classes.contact}>
          <img
            alt="Contact Us"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Contact Us</h2>
          <p>
            Questions about our project?
            <br />
            Updates to the listings?
            <br />
            General inquiries?
            <br />
          </p>
          <p>
            Please contact us
            <br />
            <a href="https://alohaharvest.org/">Aloha Harvest</a>
          </p>
        </section>
        <section className={classes.partners}>
          <img
            alt="Our Team"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Our Partners</h2>
          <img
            alt="Aloha Harvest"
            src={foodBank}
            className={classes.partnersLogo}
          />
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default About;
