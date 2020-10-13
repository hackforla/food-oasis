import React from "react";

import aboutbg from "./assets/about-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farmPeople from "./assets/farm-people.png";
import foodBank from "./assets/food-bank.png";
import { makeStyles } from "@material-ui/core";
import Footer from "../Footer";

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
            Access to enough food should be a basic right. Unfortunately, this
            is not the reality for millions of people in Hawaii. Food insecurity
            is inconsistent with access to cheap and nutritious food.
          </p>
          <p>(TBD)</p>
          <p>
            Food pantries in the area are experiencing unprecedented demand. The
            demand for food assistance has almost doubled since the beginning of
            2020. To compound matters, it is the hard work of volunteers that
            keeps pantries and meal programs open. The number of volunteers
            available to distribute food has diminished.
          </p>
          <p>
            The primary goal of Food Oasis is to provide up-to-date information
            to Hawaiians. We built a directory that connects anyone with
            hundreds of free food resources. Food Oasis presents reliable
            information on a user-friendly platform. This will reduce stress and
            uncertainty for food seekers. It will also demonstrate to our
            community the growing need of food donations on the islands.
          </p>
          <p>
            Food Oasis is creating a directory of updated food resources. There
            are countless groups helping to feed hungry Hawaiians. But it’s
            difficult for those in need to find them because there’s no one
            source of updated info. We’re working to change that.
          </p>
        </div>
        <section className={classes.team}>
          <img
            alt="Our Team"
            src={iconSpacer}
            className={classes.icon}
            height="40"
          />
          <h2>Our Team</h2>
          <p>
            Food Oasis started in 2015 under{" "}
            <a href="//hackforla.org" target="_blank" rel="noopener noreferrer">
              Hack for LA
            </a>
            , a brigade under the non-profit{" "}
            <a
              href="//codeforamerica.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code for America
            </a>
            . The goal was to create a site of free and subsidized food
            resources. The team gave the project to a nonprofit to manage its
            day-to-day operations. The upkeep turned out to be much more work
            than any single nonprofit could handle.
          </p>

          <p>
            Our web-based solution is sparking collaboration, community
            building, and team building. The result of this community-building
            gives the food seeker updated information to find the free food
            resources they need.
          </p>
          <p>
            We are 100% volunteer-run project. We look forward to sharing our
            updated directory with Hawaii.
          </p>
        </section>
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
            <a href="mailto:foodoasishi@gmail.com">foodoasishi@gmail.com</a>
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
            alt="Food Cycle LA"
            src={foodCycle}
            className={classes.partnersLogo}
          />
          <img
            alt="Food Forward"
            src={foodForward}
            className={classes.partnersLogo}
          />
          <img
            alt="Farm People"
            src={farmPeople}
            className={classes.partnersLogo}
          />
          <img
            alt="Food Bank"
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
