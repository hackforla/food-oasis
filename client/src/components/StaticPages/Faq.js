import React, { useEffect } from "react";
import faqbg from "./assets/faq-bg.webp";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import { Link, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as analytics from "../../services/analytics";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  outer: {
    background: "#fff",
  },
  main: {
    padding: "1.5rem 0",
    maxWidth: "1200px",
    margin: "0 auto",
    "& $ul": {
      paddingLeft: "26px",
      margin: "5px",
      fontSize: "16px",
      lineHeight: "26.55px",
    },
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
      "& $span": {
        textTransform: "none",
      },
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
  glossary: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#f0f0f0",
    display: "flex",
    flexWrap: "wrap",
    "& $h2": {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  forVolunteers: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#B6D8FB",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  dl: {
    marginTop: "10px",
    marginBottom: "0",
    "& $dt": {
      fontWeight: "600",
      fontSize: "20px",
    },
    "& $dd": {
      marginLeft: "0",
      marginBottom: "32px",
    },
    "& $dd:last-child": {
      marginBottom: "0",
    },
  },
}));
const About = () => {
  const classes = useStyles();

  useEffect(() => {
    analytics.postEvent("visitFaqPage");
  }, []);

  return (
    <div className={classes.outer}>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="FAQ" src={faqbg} style={{ width: "100%" }} />
        </figure>
        <Typography variant="h1" className={classes.title}>
          FAQ
        </Typography>
        <section className={classes.glossary}>
          <img
            alt="Glossary"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Food Seekers</Typography>
          <Container maxWidth="sm">
            <Typography variant="body1" className={classes.dl}>
              <dl>
                <dt> How do I use this directory?</dt>
                <ul>
                  <li>
                    From the “Find Food” page, type in your zip code or address
                    and click “Enter.”
                  </li>
                  <li>
                    A list of nearby options, sorted from nearest to farthest,
                    will pop up on the left side of the screen.
                  </li>
                  <li>
                    Choose “PANTRIES” or “MEALS” if you would like to filter by
                    type of food resource.
                  </li>
                  <li>
                    The “Details” button on an entry provides information like
                    Directions, Hours of Operation and Contact Information for
                    the service.
                  </li>
                </ul>
                <br />
                <dt>
                  Does this web-based directory include every resource where I
                  can get free food in Los Angeles County?
                </dt>
                <ul>
                  <li>
                    No. While our directory is not an exhaustive list of every
                    food resource open to the public in Los Angeles, our
                    volunteers work hard to ensure the information listed is
                    updated. To suggest a listing missing from our directory,{" "}
                    <Link to={"/suggestion"} component={RouterLink}>
                      use this link
                    </Link>
                    .
                  </li>
                </ul>
                <br />
                <dt>
                  What is the difference between a food bank, food pantry and
                  meal program?
                </dt>
                <ul>
                  <li>
                    Generally, food banks collect donated food and distribute
                    items to food pantries. Food pantries provide free groceries
                    to food seekers. Meal programs provide free cooked meals to
                    food seekers. Many locations provide multiple services. Our
                    updated directory indicates which services are available at
                    each location.
                  </li>
                </ul>
              </dl>
            </Typography>
          </Container>
        </section>
        <section className={classes.forVolunteers}>
          <img
            alt="For Volunteers"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Food Providers</Typography>
          <Container maxWidth="sm">
            <Typography variant="body1" align="center" className={classes.dl}>
              <dt>How can I add our food resource to your directory?</dt>
              <dd>
                Please visit our “
                <Link to={"/suggestion"} component={RouterLink}>
                  Suggest New Listing
                </Link>
                ” page.
              </dd>
            </Typography>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default About;
