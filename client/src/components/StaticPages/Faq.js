import React, { useEffect } from "react";

import faqbg from "./assets/faq-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import { makeStyles } from "@material-ui/core";
import Footer from "../Layout/Footer";
import * as analytics from "../../services/analytics";

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

  useEffect(() => {
    analytics.postEvent("visitFaqPage");
  }, []);

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
        <section className={classes.glossary}>
          <img
            alt="Glossary"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Glossary</h2>
          <dl className={classes.dl}>
            <dt>Food Seeker</dt>
            <dd>A person in need of free groceries or meals.</dd>
            <dt>Food Pantry</dt>
            <dd>
              A place that gives away free groceries—not cooked meals—to the
              community.
            </dd>
            <dt>Food Bank</dt>
            <dd>
              A nonprofit that collects donated food and distributes it to food
              pantries.
            </dd>
            <dt>Meal Program or Soup Kitchen</dt>
            <dd>
              A place that gives away free cooked meals—not grocery and pantry
              items—to the community.
            </dd>
            <dt>Food Donation</dt>
            <dd>
              Donated food includes pantry items, produce, and prepared meals.
            </dd>
            <dt>Food Rescue Organization</dt>
            <dd>
              Collects food donations from farmers, grocery stores, restaurants,
              corporations, and caterers. Their goal is to give food to people
              who need it and not have it go to waste.
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
            <dt>How can I sign up to volunteer?</dt>
            <dd>
              <a
                href="//volunteer.laworks.com/opportunity/a0C3l00000r3wLvEAI/%E2%9A%99-help-the-hungry-with-phone-calls-and-research"
                target="_blank"
                rel="noopener noreferrer"
              >
                Attend a training session
              </a>{" "}
              to get an assignment, or reach out to{" "}
              <a href="mailto:foodoasisinfo@hackforla.org">
                foodoasisinfo@hackforla.org
              </a>
              .
            </dd>
            <dt>When can I volunteer?</dt>
            <dd>
              Anytime. After you attend a training session, you can update the
              details whenever you have time. That may mean calling in the
              mornings or researching online in the evenings.
            </dd>
            <dt>How do I set up an account to start my assignment?</dt>
            <dd>
              <a href="/register">Enter your info here</a>, and look out for a
              confirmation email from{" "}
              <a href="mailto:foodoasis+noreply@hackforla.org">
                foodoasis+noreply@hackforla.org
              </a>
              . Follow the instructions on the email.
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
              There are countless groups helping to feed hungry Angelenos. But
              it’s difficult for those in need to find them because there’s no
              one source of updated info. We’re working to change that.
            </dd>
            <dt>What will my donation go toward?</dt>
            <dd>
              Your donations help us cover the human costs required to update
              the food resources in Los Angeles.
            </dd>
          </dl>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default About;
