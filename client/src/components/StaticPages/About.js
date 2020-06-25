import React from "react";

import aboutbg from "./assets/about-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farmPeople from "./assets/farm-people.png";
import foodBank from "./assets/food-bank.png";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  outer: {
    background: "#f0f0f0",
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
    flexBasis: "100%",
  },
  mission: {
    padding: "32px",
    margin: "32px 0",
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
  },
  team: {
    padding: "32px",
    margin: "32px 0",
    borderRadius: "24px",
    color: "#4d4d4d",
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
  partners: {
    background: "#fff",
    padding: "48px 32px",
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
      <h1 className={classes.title}>
        <span>About</span> Food Oasis / LA
      </h1>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="About" src={aboutbg} style={{ width: "100%" }} />
        </figure>
        <div className={classes.mission}>
          <img
            alt="Our Mission"
            src={iconSpacer}
            className={classes.icon}
            height="40"
          />
          <h2>Our Mission</h2>
          <p>
            Access to enough food should be a basic right, but it’s not a
            reality for over 1.1 million people in Los Angeles County. Los
            Angeles is home to the greatest number of food-insecure adults and
            children in the nation. Due to COVID, there are ___ more people who
            are struggling to find enough food. These are not only people who
            are experiencing homelessness. This includes everyone.
          </p>
          <p>
            No one organization can solve this. It takes a group effort—and
            that’s where Food Oasis comes in. Food Oasis built a directory to
            connect anyone with hundreds of free food resources. We also took
            the extra steps to update the data we have in our directory. Los
            Angeles now has an updated directory that we will share with our
            community and partners.
          </p>
        </div>
        <section className={classes.team}>
          <img
            alt="Our Team"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Our Team</h2>
          <p>
            Food Oasis started in 2015 under{" "}
            <a href="//hackforla.org">Hack for LA</a>, a brigade under the
            non-profit <a href="//codeforamerica.org">Code for America</a>. he
            goal was to create a site of free and subsidized food resources. The
            team gave the project to a nonprofit to manage its day-to-day
            operations. The upkeep turned out to be much more work than any
            single nonprofit could handle.
          </p>
          <p>
            In 2020, our current Hack for LA team assembled to build new digital
            pieces of this puzzle. One goal was to relaunch the site with
            hundreds of new food resources. We learned from the past how
            difficult it is to keep resources updated. Now, we are training
            volunteers to update the resources in the directory. The final piece
            we added is a new database that connects pantry directors with food
            donors.
          </p>
          <p>
            Our web-based solution is sparking collaboration, community
            building, and team building. The result of this community building
            is the food seeker will have updated data to find the food they
            need.
          </p>
          <p>
            We are 100% volunteer-run project. We look forward to sharing our
            updated directory with Los Angeles.
          </p>
        </section>
        <section className={classes.partners}>
          <img
            alt="Our Team"
            src={iconSpacerGray}
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
