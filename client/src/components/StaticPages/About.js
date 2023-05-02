import React, { useEffect } from "react";
import aboutbg from "./assets/about-bg.webp";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farm2people from "./assets/farm2people.png";
import foodBank from "./assets/food-bank.png";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as analytics from "../../services/analytics";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const useStyles = makeStyles(() => ({
  outer: {
    background: "#fff",
  },
  main: {
    padding: "1.5rem 0",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media only screen and (min-width: 75em)": {
      padding: "1.5rem 2rem",
    },
  },
  title: {
    textTransform: "uppercase",
    textAlign: "center",
    background: "#FFF",
    margin: 0,
    padding: "32px 0",
  },
  description: {
    fontSize: "20px",
    padding: "5px 32px 10px",
    "@media only screen and (min-width: 75em)": {
      fontSize: "24px",
      padding: "5px 120px 20px",
    },
  },
  figure: {
    margin: 0,
    padding: 0,
  },
  icon: {
    margin: "auto",
    marginBottom: "20px",
  },
  mission: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#f0f0f0",
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
    "& $p": {
      marginBottom: "16px",
    },
  },
  team: {
    padding: "50px 32px 50px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
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
    "& $p": {
      marginBottom: "16px",
    },
  },
  contact: {
    padding: "50px 32px 50px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    "& $h2": {
      flexBasis: "100",

      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
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

  useEffect(() => {
    analytics.postEvent("visitAboutPage");
  }, []);

  return (
    <div className={classes.outer}>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="About" src={aboutbg} style={{ width: "100%" }} />
        </figure>
        <Container maxWidth="md">
          <Typography variant="h1" className={classes.title}>
            <span>About</span> Food Oasis / LA
          </Typography>
          <Typography component="p" className={classes.description}>
            There are numerous free food resources in Los Angeles County. With
            an updated directory of over 1000 listings, our website helps
            connect you to these resources.
          </Typography>{" "}
        </Container>

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
              Food Oasis is a web-based directory that connects people to free
              food resources in Los Angeles. Our team is dedicated to
              maintaining an updated directory of hundreds of free food
              resources in the area such as food pantries and meal programs. Our
              volunteers frequently verify each listing for the most
              comprehensive and up-to-date information. 
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
              We are a 100% volunteer-run project. We are part of{" "}
              <Link
                href="https://hackforla.org/"
                target={"_blank"}
                rel="noopener noreferrer"
                variant="secondary"
              >
                Hack for LA
              </Link>
              . Our team includes product managers, researchers, designers,
              developers, writers and data validators who maintain this
              web-based directory. We verify each listing in our directory
              regularly to ensure the contact information, hours of operation,
              and services provided are accurate.
            </Typography>
          </Container>
        </section>
        <section className={classes.contact}>
          <img
            alt="Questions"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Questions</Typography>
          <Typography variant="body1">
            For more information, please visit our{" "}
            <Link to={"/faqs"} variant="secondary" component={RouterLink}>
              FAQ page
            </Link>
            .
          </Typography>
        </section>
        <section className={classes.partners}>
          <Typography variant="h2">Our Partners</Typography>
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
              src={farm2people}
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
