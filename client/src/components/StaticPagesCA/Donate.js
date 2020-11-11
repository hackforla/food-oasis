import React from "react";

import donatebg from "./assets/donate-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
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
    color: "#4d4d4d",
    textTransform: "uppercase",
    fontWeight: 500,
    textAlign: "center",
    background: "#FFF",
    margin: 0,
    padding: "32px 0",
  },
  btnOrange: {
    color: "#fff",
    fontSize: "18px",
    background: "#e57109",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "6px",
    padding: "8px 16px",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  btnOutline: {
    color: "#fff",
    border: "1px solid #336699",
    background: "#336699",
    borderRadius: "6px",
    padding: "8px 16px",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  btnWhite: {
    color: "#336699",
    background: "#ffffff",
    borderRadius: "6px",
    padding: "8px 16px",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  figure: {
    margin: 0,
    padding: 0,
  },
  icon: {
    margin: "auto",
  },
  donate: {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    background: "#f0f0f0",
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
    "& $btnOutline": {
      margin: "20px auto 0 auto",
    },
  },
  volunteerSection: {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    color: "#fff",
    background: "#336699",
    display: "flex",
    flexWrap: "wrap",
    "& $h2": {
      color: "#fff",
      flexBasis: "100%",
      textTransform: "uppercase;",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    "& $btnWhite": {
      margin: "20px auto 0 auto",
    },
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 0 32px 0",
    justifyContent: "center",
    "& $aside": {
      textAlign: "center",
      borderRadius: "24px",
      padding: "1.25rem",
      maxWidth: "550px",
      margin: "1rem 0",
      "& $btnWhite": {
        display: "inline-block",
        marginBottom: "20px",
      },
      "& $h3": {
        fontSize: "40px",
        fontWeight: "500",
        color: "#ffffff",
        margin: "20px 0",
      },
      "@media only screen and (min-width: 64em)": {
        marginLeft: "1rem",
        marginRight: "1rem",
      },
    },
    "@media only screen and (min-width: 64em)": {
      flexWrap: "nowrap",
      padding: "32px",
    },
  },
  signup: {
    background: "rgba(229, 113, 9, .7)",
  },
  volunteer: {
    background: "#e57109",
  },
}));
const Donate = () => {
  const classes = useStyles();
  // const { t } = useTranslation("donate");
  return (
    <div className={classes.outer}>
      <h1 className={classes.title}>Donate</h1>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="Donate" src={donatebg} style={{ width: "100%" }} />
        </figure>
        <section className={classes.donate}>
          <img
            alt="Why Donate?"
            src={iconSpacerBlue}
            className={classes.icon}
            height="40"
          />
          <h2>Why Donate?</h2>
          <p>
            We’ve done so much already as a 100% volunteer-run organization—but
            we need your help to finish what we set out to do. The admin,
            development, and marketing costs to expand our directory are
            extensive. Your tax-deductible donation would help us offset some of
            those costs.
          </p>
          <p>
            Please make donations to our parent organization (Code for America).
            At the Code for America donation page you will see a text box: “What
            inspired you to donate today”?{" "}
            <b>
              <strong>
                Please write Food Oasis and Hack for LA in that box.
              </strong>
            </b>{" "}
            Your donation will get earmarked for Food Oasis.
          </p>
          <a
            // href="//www.codeforamerica.org/donate"
            href=" https://svbinthecommunity.benevity.org/community/fundraiser/1842"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnOutline}
          >
            Donate
          </a>
        </section>
        <div className={classes.volunteerSection}>
          <img
            alt="Volunteer"
            src={iconSpacer}
            className={classes.icon}
            height="40"
          />
          <h2>Volunteer</h2>
          <p>
            Virtual volunteer opportunity! Help us validate our database.
            Correct, up-to-date information is vital for someone seeking food.
          </p>
          <p>
            To volunteer as a data validator, please join us on Zoom for online
            training. We meet{" "}
            <strong>Saturday mornings from 10 AM - 12 PM PST.</strong> Sign up
            at this address:
          </p>
          <a
            href="//laworks.com/opportunity/a0C3l00000iCS6GEAW"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnWhite}
          >
            Become a Volunteer
          </a>
          <p>
            Developers, designers, data specialists, or researchers - If you
            have tech skills, please inquire about joining our team as a
            developer, designer, or data specialist via email,{" "}
            <a href="mailto:jenny@foodoasis.la">jenny@foodoasis.la</a>.
          </p>
        </div>
        <section className={classes.cards}>
          <aside className={classes.signup}>
            <h3>Get monthly updates on what we're doing</h3>
            <a
              href="//foodoasis.us18.list-manage.com/subscribe?u=40d31892cbbe01312937f7de6&id=42235bb7ce"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.btnWhite}
            >
              Signup
            </a>
          </aside>
          <aside className={classes.volunteer}>
            <h3>Want to give your time instead?</h3>
            <a
              href="//laworks.com/opportunity/a0C3l00000iCS6GEAW"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.btnWhite}
            >
              Volunteer
            </a>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Donate;
