import React from "react";

import aboutbg from "./assets/about-bg.png";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farmPeople from "./assets/farm-people.png";
import foodBank from "./assets/food-bank.png";
import { makeStyles } from "@material-ui/core";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import Container from "@material-ui/core/Container";
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
      marginTop: "15px",
      marginBottom: "15px",
    },
    "& $p": {
      marginBottom: "16px",
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
      marginTop: "15px",
      marginBottom: "15px",
    },
    "& $a": {
      color: "#4d4d4d",
    },
    "& $p": {
      marginBottom: "16px",
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
      flexBasis: "100",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "15px",
      marginBottom: "15px",
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
      color: "#4d4d4d",
      width: "100%",
      flexBasis: "100",
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
          <span>About</span> Food Oasis McKinney
        </Typography>
        <div className={classes.mission}>
          <img
            alt="Our Mission"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Our Mission</Typography>
          <Container maxWidth="sm">
            <Typography variant="body1">
              Access to enough food should be a basic right. Unfortunately, this
              is not the reality for millions of people in the McKinney area.
            </Typography>
            <Typography variant="body1">
              Food pantries in the area are experiencing unprecedented demand.
              The demand for food assistance has almost doubled since the
              beginning of 2020. To compound matters, it is the hard work of
              volunteers that keeps pantries and meal programs open. The number
              of volunteers available to distribute food has diminished.
            </Typography>
            <Typography variant="body1">
              The primary goal of Food Oasis is to provide up-to-date
              information to the people of McKinney who are experiencing food
              insecurity. We built a directory that connects anyone with
              hundreds of free food resources. Food Oasis presents reliable
              information on a user-friendly platform. This will reduce stress
              and uncertainty for food seekers. It will also demonstrate to our
              community the growing need of food donations in McKinney.
            </Typography>
            <Typography variant="body1">
              Food Oasis is creating a directory of updated food resources.
              There are countless groups helping to feed hungry people. But it’s
              difficult for those in need to find them because there’s no one
              source of updated info. We’re working to change that.
            </Typography>
          </Container>
        </div>
        <section className={classes.team}>
          <img
            alt="Our Team"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Our Team</Typography>
          <Container maxWidth="sm">
            <Typography variant="body1">
              Food Oasis started in 2015 under{" "}
              <a
                href="//hackforla.org"
                target="_blank"
                rel="noopener noreferrer"
              >
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
            </Typography>
            <Typography variant="body1">
              In August 2019, our current Hack for LA team assembled to build
              new digital pieces of this puzzle. One goal was to relaunch the
              site with hundreds of new food resources. We learned from the past
              how difficult it is to keep resources updated. Now, we are
              training volunteers to update the resources in the directory. The
              final piece we added is a new second database that connects pantry
              directors with food donation organizations.
            </Typography>
            <Typography variant="body1">
              Our web-based solution is sparking collaboration, community
              building, and team building. The result of this community-building
              gives the food seeker updated information to find the free food
              resources they need.
            </Typography>
            <Typography variant="body1">
              We are 100% volunteer-run project. We look forward to sharing our
              updated directory with Los Angeles.
            </Typography>
          </Container>
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
          <h2>Our Partners</h2>
          <a
            href="https://www.foodcyclela.org/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              alt="Food Cycle LA"
              src={foodCycle}
              className={classes.partnersLogo}
            />
          </a>
          <a
            href="https://foodforward.org/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              alt="Food Forward"
              src={foodForward}
              className={classes.partnersLogo}
            />
          </a>
          <a
            href="https://www.farm2people.org/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              alt="Farm People"
              src={farmPeople}
              className={classes.partnersLogo}
            />
          </a>
          <a
            href="https://www.lafoodbank.org/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
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
