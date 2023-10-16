import React from "react";

import donatebg from "./assets/donate-bg.webp";
import iconSpacerGray from "./assets/icon-spacer-gray.svg";
import makeStyles from "@mui/styles/makeStyles";
import { Box, CardMedia, Container, Link, Typography } from "@mui/material";

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
    <Container
      sx={{
        background: "#fff",
      }}
    >
      <Box
        sx={{
          "padding": "1.5rem 0",
          "maxWidth": "1200px",
          "margin": "0 auto",
          "@media only screen and (min-width: 75em)": {
            padding: "1.5rem 2rem",
          },
        }}
      >
        <CardMedia
          component="img"
          alt="Donate"
          src={donatebg}
          style={{ width: "100%" }}
        ></CardMedia>
        <Typography
          variant="h1"
          sx={{
            textTransform: "uppercase",
            fontWeight: 500,
            textAlign: "center",
            background: "#FFF",
            margin: 0,
            padding: "32px 0",
          }}
        >
          Donate
        </Typography>
        <Box
          component="section"
          sx={{
            "padding": "32px",
            "margin": "32px 0 0 0",
            "borderRadius": "24px",
            "background": "#f0f0f0",
            "display": "flex",
            "flexWrap": "wrap",
            "flexDirection": "column",
            "& h2": {
              flexBasis: "100%",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "32px",
              mt: "10px",
              mb: "20px",
            },
            "& p": {
              marginBottom: "16px",
            },
          }}
        >
          <Box
            component="img"
            alt="Why Donate?"
            src={iconSpacerGray}
            sx={{
              margin: "auto",
            }}
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
          <Link
            variant="contained"
            href="//www.codeforamerica.org/donate"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#fff",
              border: "1px solid #336699",
              background: "#336699",
              borderRadius: "6px",
              padding: "8px 16px",
              textDecoration: "none",
              textTransform: "uppercase",
              margin: "20px auto 0 auto",
            }}
          >
            Donate
          </Link>
        </Box>
        <Box
          sx={{
            "padding": "32px",
            "margin": "32px 0 0 0",
            "borderRadius": "24px",
            "background": "#B6D8FB",
            "display": "flex",
            "flexWrap": "wrap",
            "& h2": {
              flexBasis: "100%",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "32px",
              mt: "10px",
              mb: "20px",
            },
          }}
        >
          <Box
            component="img"
            alt="Volunteer"
            src={iconSpacerGray}
            sx={{
              margin: "auto",
            }}
            height="40"
          />
          <Typography variant="h2">Want to give your time instead?</Typography>
          <p>(TBD)</p>
        </Box>
        {/* <Box
          component="section"
          sx={{
            "display": "flex",
            "flexWrap": "wrap",
            "borderRadius": "24px",
            "margin": "0 0 32px 0",
            "justifyContent": "center",
            "background": "rgba(229, 113, 9, .7)",
            "@media only screen and (min-width: 64em)": {
              flexWrap: "nowrap",
              padding: "32px",
            },
          }}
        >
          <Box
            component="aside"
            sx={{
              "textAlign": "center",
              "borderRadius": "24px",
              "padding": "1.25rem",
              "maxWidth": "550px",
              "margin": "1rem 0",
              "& h3": {
                fontSize: "40px",
                fontWeight: "500",
                color: "#ffffff",
                margin: "20px 0",
              },
              "@media only screen and (min-width: 64em)": {
                marginLeft: "1rem",
                marginRight: "1rem",
              },
            }}
          >
            <Typography variant="h3">
              Get monthly updates on what we're doing
            </Typography>
            <Link
              variant="contained"
              href="//foodoasis.us18.list-manage.com/subscribe?u=40d31892cbbe01312937f7de6&id=42235bb7ce"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-block",
                marginBottom: "20px",
                color: "#336699",
                border: "1px solid #ffffff",
                background: "#ffffff",
                borderRadius: "6px",
                padding: "8px 16px",
                textDecoration: "none",
                textTransform: "uppercase",
                margin: "20px auto 0 auto",
              }}
            >
              Signup
            </Link>
          </Box>
        </Box> */}
      </Box>
    </Container>
  );
};

export default Donate;
