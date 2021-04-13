import React from "react";
import donatebg from "./assets/donate-bg.png";
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
    color: "#4d4d4d",
    textTransform: "uppercase",
    fontWeight: 500,
    textAlign: "center",
    background: "#FFF",
    margin: 0,
    padding: "32px 0",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  btnBlue: {
    color: "#ffffff",
    background: "#336699",
    borderRadius: "6px",
    padding: "8px 16px",
    margin: ".5rem",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  btnWhite: {
    color: "#336699",
    background: "#ffffff",
    borderRadius: "6px",
    padding: "8px 16px",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:hover": {
      filter: "brightness(1.2)",
    },
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
    flexDirection: "column",
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
    flexDirection: "column",
    margin: "0 0 32px 0",
    alignItems: "center",
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
    textAlign: "center",
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
          <h2>How to Donate?</h2>
          <p>
            Mahalo for making the work of food rescue and redistribution on O‘ahu possible! As a 501(c)(3) nonprofit,
            Aloha Harvest relies completely on the generosity of our funders, ranging from national grants to individual
            donations by community members.</p>

          <p>To donate online, visit http://alohaharvest.org/donate.</p>

          <p>You will receive an automatic acknowledgement upon donation.</p>

          <p>To donate via check, please make your donation out to:<br/>
            Aloha Harvest<br/>
            3599 Wai`alae Ave., Suite 23<br/>
            Honolulu, HI 96816<br/></p>

          <p>You will be mailed a letter of acknowledgement approximately one month from the time we receive your
            check!</p>

          <p>To learn more about the impact your donation makes possible, please visit alohaharvest.org/data.</p>

          <br/>
          <p>
            To donate online, visit{" "}
            <a href="http://alohaharvest.org/donate">
              http://alohaharvest.org/donate
            </a>
            .
          </p>
          <br />
          <p>
            To donate via check, please make your donation out to: <br />
            Aloha Harvest <br />
            3599 Wai`alae Ave., Suite 23 <br />
            Honolulu, HI 96816
            <br />
          </p>
          <h2>Donate Excess Food</h2>
          <p>If you or your business have excess food you’d like to donate to us for redistribution, please visit
            <a href={www.alohaharvest.org / donate - food}>www.alohaharvest.org/donate-food</a> to get started. You can
            also call us at 808-208-1581 or email
            info@alohaharvest.org with questions.
          </p>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Donate;
