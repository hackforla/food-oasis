import React from "react";

import donatebg from "./assets/donate-bg.webp";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import { makeStyles } from "@material-ui/core";
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
    flexDirection: "column",
    "& $h2": {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
    "& $btnOutline": {
      margin: "20px auto 0 auto",
    },
    "& $p": {
      marginBottom: "16px",
    },
  },
  volunteerSection: {
    padding: "32px",
    margin: "32px 0 0 0",
    borderRadius: "24px",
    color: "#4d4d4d",
    background: "#B6D8FB",
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
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="Donate" src={donatebg} style={{ width: "100%" }} />
        </figure>
        <Typography variant="h1" className={classes.title}>
          Donate
        </Typography>
        <section className={classes.donate}>
          <img
            alt="Why Donate?"
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Why Donate?</Typography>
          <Container maxWidth="sm">
            <Typography variant="body1">
              We’ve done so much already as a 100% volunteer-run
              organization—but we need your help to finish what we set out to
              do. The admin, development, and marketing costs to expand our
              directory are extensive. Your tax-deductible donation would help
              us offset some of those costs.
            </Typography>
            <Typography variant="body1">
              Please make donations to our parent organization (Code for
              America). At the Code for America donation page you will see a
              text box: “What inspired you to donate today”?{" "}
              <b>
                <strong>
                  Please write Food Oasis and Hack for LA in that box.
                </strong>
              </b>{" "}
              Your donation will get earmarked for Food Oasis.
            </Typography>
          </Container>
          <a
            href="//www.codeforamerica.org/donate"
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
            src={iconSpacerGray}
            className={classes.icon}
            height="40"
          />
          <Typography variant="h2">Want to give your time instead?</Typography>
          <p>(TBD)</p>
        </div>
        <section className={classes.cards}>
          {/* <aside className={classes.signup}>
            <h3>Get monthly updates on what we&apos;re doing</h3>
            <a
              href="//foodoasis.us18.list-manage.com/subscribe?u=40d31892cbbe01312937f7de6&id=42235bb7ce"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.btnWhite}
            >
              Signup
            </a>
          </aside> */}
        </section>
      </div>
    </div>
  );
};

export default Donate;
