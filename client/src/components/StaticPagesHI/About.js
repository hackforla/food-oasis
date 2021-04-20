import React from "react";

import aboutbg from "./assets/about-header.jpg";
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
  lightSection: {
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
  darkSection: {
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
}));
const About = () => {
  const classes = useStyles();
  // const { t } = useTranslation("about");
  return (
    <div className={classes.outer}>
      <h1 className={classes.title}>
        <span>About This Food-Finder Tool:<br/>Code For Hawaiʻi and Aloha Harvest</span>
      </h1>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="About" src={aboutbg} style={{ width: "100%" }} />
        </figure>
        <div className={classes.lightSection}>
          <img
            alt="Code For Hawaiʻi and Aloha Harvest"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>What Is This Tool & How Do I Use It?</h2>
          <p>
            This tool is meant to provide an easy way for people on Oʻahu to locate food resources near them that are
            open to the public.
          </p>
          <p>
            From the “Find Food” page, type in your zip code or address and hit Enter. A list of nearby options, sorted
            from nearest to farthest, will pop up on the left side of the page. Click “PANTRIES” or “MEALS” if you’d
            like to filter by type. Click “Details” on an entry to view information like Directions, Hours, Phone,
            Email, and Eligibility Requirements.
          </p>
          <p>
            The data Aloha Harvest uses to populate this directory includes all food pantry and meal programs we work
            with that are open to the public. It is not an exhaustive list of every single food resource on O‘ahu. A
            volunteer reviews this list once a week to confirm that all details are still current and correct. Learn
            more on the FAQs page.
          </p>
          <p>
            Click to the three horizontal lines in the upper right of the page to use the Menu and navigate to other
            pages.
          </p>
        </div>
        <div className={classes.darkSection}>
          <img
            alt="Code For Hawaiʻi and Aloha Harvest"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Code For Hawaii and Aloha Harvest</h2>
          <p>
            This food-finder tool was developed by Hack for LA Brigade, and this O‘ahu-specific instance was built out
            by Code For Hawaii. These groups are part of the Code For America network, a national alliance of community
            organizers, developers, and designers that are putting technology to work in service of their local
            communities.
          </p>
          <p>
            Code For Hawaii reached out to Aloha Harvest to provide the data (directory of places to get food) for this
            tool. It’s a natural partnership, as Aloha Harvest has long needed a user-friendly way to assist people who
            are seeking food.
          </p>
        </div>
        <div className={classes.lightSection}>
          <img
            alt="Code For Hawaiʻi and Aloha Harvest"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>More About Aloha Harvest</h2>
          <p>
            <a href={"https://alohaharvest.org/"}>Aloha Harvest</a> is the
            largest food rescue nonprofit in the state of Hawaiʻi. Seven days a
            week, free of charge and free of liability, we rescue quality excess
            food from donors (ex: wholesale distributors, grocery stores,
            restaurants, hotels) and redistribute it to recipient agencies
            feeding the hungry (ex: homeless shelters, social services, food
            pantries).
          </p>
          <p>
            We have been doing this work for over 21 years and represent the
            largest and most successful collaboration between businesses and
            nonprofits in the state.
            <a href="https://drive.google.com/file/d/1-sdszGH_y2MLd-yTDVa0ESalyY_zCDKH/view">
              Last year
            </a>
            , we worked with 370 food donors and 273 recipient agencies to
            redistribute over 2.7 million pounds of good food that would have
            otherwise been wasted!
          </p>
          <p>
            This work is essential because even while 1 in 5 people in Hawaiʻi
            rely on food pantries for assistance, about 237,000 tons of good
            food is wasted annually. Here's a
            <a href="https://www.youtube.com/watch?v=p9kNYCUtg8E&feature=youtu.be">
              short
            </a>{" "}
            video that explains more of our process, impact, and future
            potential.
          </p>
          <p>
            Visit <a href="https://alohaharvest.org">alohaharvest.org</a> or follow us on
            <a href="http://instagram.com/alohaharvest">Instagram</a>, <a href="http://facebook.com/alohaharvest">Facebook</a>,
            <a href="https://www.linkedin.com/company/4005035">LinkedIn</a>,
            and <a href="http://twitter.com/alohaharvest">Twitter</a>.
          </p>
        </div>
        <section className={classes.contact}>
          <img
            alt="Contact Aloha Harvest"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Contact Aloha Harvest</h2>
          <p>
            Call our office at 808-208-1581, or email <a href="mailto:info@alohaharvest.org">info@alohaharvest.org</a>
          </p>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default About;
