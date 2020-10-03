import React from "react";

import aboutbg from "./assets/about-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farmPeople from "./assets/farm-people.png";
import foodBank from "./assets/food-bank.png";
import { makeStyles } from "@material-ui/core";

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
        <span>About</span> California Food Oasis
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
            California Food Oasis is a brand new project spun out of Food Oasis
            Los Angeles. We are gathering resources and databases from the
            community as quickly as we can.
          </p>
          <p>
            Our project just expanded beyond Los Angeles to areas in California
            where people have been severely affected by the recent fires:
          </p>
          <ul>
            <li>Santa Rosa</li>
            <li>Sonoma</li>
            <li>Napa</li>
            <li>San Jose</li>
            <li>Oakland</li>
            <li>Santa Cruz</li>
            <li>Mendocino</li>
          </ul>
          <p>
            <b>
              The primary goal of Food Oasis is to provide up-to-date
              information to Californians who are seeking free food resources.
            </b>
          </p>
          <p>
            We built a directory that connects anyone with hundreds of free food
            resources. Food Oasis presents reliable information on a
            user-friendly platform.
          </p>
          <p>
            The demand for food assistance has almost doubled since the
            beginning of 2020. To compound matters, it is the hard work of
            volunteers that keeps pantries and meal programs open. The number of
            volunteers available to run these organizations has diminished due
            to COVID.
          </p>
          <p>
            Food Oasis is creating an open source directory of validated food
            resources.
          </p>
          <p>
            There are countless groups helping to feed hungry Californians. But
            it’s difficult for those in need to find them because there’s no one
            source of updated information. We’re working to change that. Our
            project is open source.
          </p>
          <p>
            Our goal is share the data with other organizations in order to
            facilitate collaboration.
          </p>
          <p>
            Help us keep this information updated. Click on the Suggest New
            Listing link under the hamburger menu and reach out. Help us connect
            the dots.
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
            In August 2019, our current Hack for LA team assembled to build new
            digital pieces of this puzzle. One goal was to relaunch the site
            with hundreds of new food resources. We learned from the past how
            difficult it is to keep resources updated. Now, we are training
            volunteers to update the resources in the directory. The final piece
            we added is a new second database that connects pantry directors
            with food donation organizations.
          </p>
          <p>
            Our web-based solution is sparking collaboration, community
            building, and team building. The result of this community-building
            gives the food seeker updated information to find the free food
            resources they need.
          </p>
          <p>
            We are a 100% volunteer-run project. We look forward to sharing our
            updated directory with Los Angeles.
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
      </div>
    </div>
  );
};

export default About;
