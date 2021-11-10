import React, { useEffect } from "react";

import donatebg from "./assets/donate-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import { makeStyles } from "@material-ui/core";
import Footer from "../Layout/Footer";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import logo from "images/foodoasis.svg";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import donationStep1 from "images/donationStep1.png";
import donationStep2 from "images/donationStep2.png";
import donationStep3 from "images/donationStep3.png";
import donationStep4 from "images/donationStep4.png";
import donationStep5 from "images/donationStep5.png";
import donationStep6 from "images/donationStep6.png";
import donationStep7 from "images/donationStep7.png";
import * as analytics from "../../services/analytics";
import { Button, IconButton } from "../../components/UI";

const useStyles = makeStyles((theme) => ({
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
  donationDialog: {
    flexGrow: 1,
    overflow: "scroll",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    "@media only screen and (min-width: 64em)": {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1, 4),
    },
  },
  paper: {
    maxWidth: 400,
    padding: theme.spacing(2),
    margin: `${theme.spacing(2)}px auto`,
    "@media only screen and (min-width: 64em)": {
      margin: `${theme.spacing(3)}px auto`,
      padding: theme.spacing(3),
    },
  },
  step: {
    backgroundColor: "#ef624f",
    width: theme.spacing(3),
    height: theme.spacing(3),
    "@media only screen and (min-width: 64em)": {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  },
  dialogCloseButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  donateButtonWrapper: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#fff",
  },
  donationImg: {
    width: "100%",
    height: "auto",
  },
}));

const Donate = () => {
  const classes = useStyles();
  const [showDonationDialog, setShowDonationDialog] = React.useState(false);

  useEffect(() => {
    analytics.postEvent("visitDonatePage");
  }, []);

  const handleShowDonationDialog = () => {
    setShowDonationDialog(showDonationDialog ? false : true);
  };
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
            extensive. We have a directory of over 1,300 organizations to
            update. Your tax-deductible donation would help us offset some of
            those costs.
          </p>
          <Button
            className={classes.btnOutline}
            onClick={handleShowDonationDialog}
          >
            Donate
          </Button>
          {showDonationDialog && (
            <DonationDialog
              showDonationDialog={showDonationDialog}
              setShowDonationDialog={setShowDonationDialog}
            />
          )}
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
            We’re run 100% by remote volunteers who do critical work by updating
            our food directory weekly. The work you do impact those who don’t
            have enough to eat. Your help to update our directory makes it
            easier for anyone to get in touch with groups that fit their needs.
          </p>
          <a
            href="//laworks.com/opportunity/a0C3l00000iCS6GEAW"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnWhite}
          >
            Become a Volunteer
          </a>
        </div>
        <section className={classes.cards}>
          <aside className={classes.signup}>
            <h3>Get monthly updates on what we&apos;re doing</h3>
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
        <Footer />
      </div>
    </div>
  );
};

export default Donate;

const DonationDialog = ({ showDonationDialog, setShowDonationDialog }) => {
  const classes = useStyles();
  const handleCloseDonationDialog = () => {
    setShowDonationDialog(false);
  };
  return (
    <Dialog
      onClose={handleCloseDonationDialog}
      aria-labelledby="simple-dialog-title"
      open={showDonationDialog}
      maxWidth="sm"
    >
      <DialogTitle id="simple-dialog-title">
        <Grid container justifyContent="center">
          <img style={{ height: "50px" }} src={logo} alt="logo" />
          <Grid item>
            <Typography align="center">
              Please make donations to our parent organization (Code for
              America)
            </Typography>
            <Typography align="center" color="error" variant="h6">
              This is a 7-step process.
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              icon="close"
              className={classes.dialogCloseButton}
              onClick={handleCloseDonationDialog}
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <div className={classes.donationDialog}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>1</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>Enter your donation amount.</Typography>
              <img
                className={classes.donationImg}
                src={donationStep1}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>2</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>Check the box right below.</Typography>
              <img
                className={classes.donationImg}
                src={donationStep2}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>3</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>
                Under "Person to notify" and "Honoree Name" write{" "}
                <em>"Food Oasis"</em>.
              </Typography>
              <img
                className={classes.donationImg}
                src={donationStep3}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>4</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>
                Under "Recipient Email" write{" "}
                <em>"foodoasis+donations@hackforla.org"</em>.
              </Typography>
              <img
                className={classes.donationImg}
                src={donationStep4}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>5</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>
                Choose the brigade <em>"Hack for LA"</em> in the dropdown.
              </Typography>
              <img
                className={classes.donationImg}
                src={donationStep5}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>6</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>Click next.</Typography>
              <img
                className={classes.donationImg}
                src={donationStep6}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.step}>7</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>
                Under "What inspired you to donate today?" write{" "}
                <em>"Food Oasis"</em>.
              </Typography>
              <img
                className={classes.donationImg}
                src={donationStep7}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Grid
        className={classes.donateButtonWrapper}
        container
        justifyContent="center"
      >
        <Grid item>
          <Box m={3}>
            <a
              href="//www.codeforamerica.org/donate"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.btnOutline}
            >
              Donate
            </a>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};
