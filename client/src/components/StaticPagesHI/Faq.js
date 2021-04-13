import React from "react";

import faqbg from "./assets/faq-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
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
  },
  glossary: {
    padding: "32px",
    margin: "32px 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    display: "flex",
    flexWrap: "wrap",
    "& $h2": {
      color: "#336699",
      flexBasis: "100%",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  forVolunteers: {
    padding: "32px",
    margin: "32px 0",
    borderRadius: "24px",
    color: "#fff",
    background: "#336699",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      flexBasis: "100%",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    "& $a": {
      color: "#ffffff",
    },
  },
  forDonors: {
    color: "#4d4d4d",
    background: "#fff",
    padding: "32px",
    margin: "32px 0",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      color: "#336699",
      flexBasis: "100%",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  dl: {
    marginTop: "0",
    marginBottom: "0",
    "& $dt": {
      fontWeight: "600",
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
  // const { t } = useTranslation("about");
  return (
    <div className={classes.outer}>
      <h1 className={classes.title}>
        <span>
          FAQ<span>s</span>
        </span>
      </h1>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="FAQ" src={faqbg} style={{ width: "100%" }} />
        </figure>
        <section className={classes.forVolunteers}>
          <img
            alt="For Users"
            src={iconSpacer}
            className={classes.icon}
            height="40"
          />
          <h2>For Users</h2>
          <dl className={classes.dl}>
            <dt>How do I use this tool to find food near me?</dt>
            <dd>
              From the “Find Food” page, type in your zip code or address and hit Enter. A list of nearby options,
              sorted from nearest to farthest, will pop up on the left side of the page. Click “PANTRIES” or “MEALS” if
              you’d like to filter by type. Click “Details” on an entry to view information like Directions, Hours,
              Phone, Email, and Eligibility Requirements.
            </dd>


            <dt>Does this food-finder tool include every single place I can get food/food assistance on Oʻahu?</dt>
            <dd>
              No. The data Aloha Harvest uses to populate this directory includes all food pantry and meal programs we
              deliver food to that are open to the public. We deliver food to almost every program of this kind on the
              island, but not 100% of them. Furthermore, there are many places that individuals can apply to receive
              food assistance that are not open to the general public.

              A volunteer reviews our list once a week to confirm that all details are still current and correct.
            </dd>

            <dt>Where can I go for a comprehensive, statewide list of food resources and related assistance?</dt>
            <dd>Aloha United Way can be called by dialing 211 or visiting auw211.org. Their specialists can help you
              through a directory of every registered social service agency in the state that helps get food to people
              who need it. They can also search a database of 4,000+ government and nonprofit services and programs to
              find the answers you need on related issues, like shelter, clothing, childcare, elderly care, disability
              services and more. They are the only statewide hotline partnering with the Department of Health.
            </dd>

            <dt>Does this tool include resources for neighbor islands?</dt>
            <dd>No, unfortunately Aloha Harvest is currently only located on O‘ahu and does not yet have the capacity to
              establish presence on the neighbor islands. As such, our list of food resources only applies to Oʻahu.
              However, we do have a goal of expanding to the other islands within the next 5 years.
            </dd>

            <dt>Does Aloha Harvest deliver food directly to individuals?</dt>
            <dd>No, unlike a food bank or food pantry, Aloha Harvest provides no direct services to individuals.
              Instead, we perform a “middle man” role: We pick up excess food from a network of food donors and
              redistribute it to a network of nonprofits and social service agencies feeding O‘ahu’s hungry. To learn
              more, visit this tool’s About Us page or our website directly at <a href={alohaharvest.org}>alohaharvest.org</a>.
            </dd>
          </dl>
        </section>
        <section className={classes.forVolunteers}>
          <img
            alt="For Volunteers"
            src={iconSpacer}
            className={classes.icon}
            height="40"
          />
          <h2>For Volunteers</h2>
          <dl className={classes.dl}>
            <dt>Interested in donating excess food, volunteering, or anything else?</dt>
            <dd>
              Visit our website at alohaharvest.org.
            </dd>
          </dl>
        </section>
        <section className={classes.forDonors}>
          <img
            alt="For Donors"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>For Donors</h2>
          <dl className={classes.dl}>
            <dt>What is food insecurity?</dt>
            <dd>
              Unable to consistently access or afford adequate food to live a
              healthy life.
            </dd>
            <dt>How is Food Oasis helping to diminish food insecurity?</dt>
            <dd>
              Food Oasis is creating a directory of updated food resources.
              There are countless groups helping to feed hungry Hawaiians. But
              it’s difficult for those in need to find them because there’s no
              one source of updated info. We’re working to change that.
            </dd>
            <dt>What will my donation go toward?</dt>
            <dd>
              Your donations help us with the human costs required to update the
              food resources in Hawaii.
            </dd>
          </dl>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default About;
