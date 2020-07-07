import React from "react";

import donatebg from "./assets/donate-bg.png";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
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
    color: "#336699",
    fontSize: "14px",
    border: "1px solid #336699",
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
    flexBasis: "100%",
  },
  donate: {
    padding: "32px",
    margin: "32px 0 0 0",
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
    "& $btnOutline": {
      margin: "20px auto",
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
    background: "#336699",
  },
  volunteer: {
    background: "#e57109",
    "& $btnWhite": {
      color: "#e57109",
    },
  },
}));
const Donate = () => {
  const classes = useStyles();
  // const { t } = useTranslation("donate");
  return (
    <div className={classes.outer}>
      <h1 className={classes.title}>
        Donate
        <br />
        <a
          href="//www.codeforamerica.org/donate"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.btnOrange}
        >
          Donate
        </a>
      </h1>
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
            we need your help to finish what we set out to do. There are
            numerous admin costs that come with expanding and updating our free
            food directory to include over 1,500 organizations. Your
            tax-deductible donation would help us offset some of those costs
          </p>
          <p>
            Please make donations to our parent organization (Code for America).
            When asked to select a brigade, choose “Hack for LA” in the dropdown
            menu and your donation will get earmarked exclusively for Food Oasis
            Los Angeles.
          </p>
          <a
            href="//www.codeforamerica.org/donate"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnOutline}
          >
            Donate
          </a>
        </section>
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
              href="//us02web.zoom.us/meeting/register/tZEld-usrj4qEtJ7ICuM_0KODTSY4ubLukVZ"
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
