import React, { useEffect } from "react";
import donatebg from "./assets/donate-bg.webp";
import makeStyles from "@mui/styles/makeStyles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import logo from "images/foodoasis.svg";
import {
  Link,
  Paper,
  Grid,
  Avatar,
  Container,
  Typography,
  Box,
  Button,
  CardMedia
} from "@mui/material";
import donationStep1 from "images/donationStep1.png";
import donationStep2 from "images/donationStep2.png";
import donationStep3 from "images/donationStep3.png";
import donationStep4 from "images/donationStep4.png";
import donationStep5 from "images/donationStep5.png";
import donationStep6 from "images/donationStep6.png";
import donationStep7 from "images/donationStep7.png";
import * as analytics from "../../services/analytics";
import { IconButton } from "../UI/StandardButton";
import Footer from "../Layout/Footer";

const useStyles = makeStyles((theme) => ({
  // donate: {
  //   padding: "10px",
  //   color: "#4d4d4d",
  //   display: "flex",
  //   flexDirection: "column",
  //   flexWrap: "wrap",
  //   "& $h2": {
  //     flexBasis: "100%",
  //     textAlign: "center",
  //     fontWeight: "500",
  //     fontSize: "32px",
  //     marginTop: "10px",
  //     marginBottom: "20px",
  //   },
  //   "& $btnOutline": {
  //     margin: "30px auto",
  //   },
  // },
  donationDialog: {
    flexGrow: 1,
    overflow: "scroll",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    "@media only screen and (min-width: 64em)": {
      margin: `${theme.spacing(1)} auto`,
      padding: theme.spacing(1, 4),
    },
  },
  paper: {
    maxWidth: 400,
    padding: theme.spacing(2),
    margin: `${theme.spacing(2)} auto`,
    "@media only screen and (min-width: 64em)": {
      margin: `${theme.spacing(3)} auto`,
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
    <Container 
       sx={{
         padding: { xs: "1.5rem 0", md: "0rem 2rem"},
         margin: "0 auto",
         maxWidth: "1200px"
       }}
       >
         <CardMedia component="img" alt="Donate" src={donatebg} style={{ width: "100%" }}></CardMedia>
        <Typography variant="h1"
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          margin: 0,
          padding: "32px 0"
        }}
        >
          Donate
        </Typography>
        <Container
        sx={{
          padding: "10px",
          color: "#4d4d4d",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap"
        }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              As of July 2022, about 1 in 4 people in Los Angeles county are
              food insecure, meaning they worry about having enough food for
              their family. We are committed to connecting food seekers to free
              food resources in Los Angeles County.
              <br /> <br />
              Food Oasis is a 100% volunteer-run through{" "}
              <Link
                href="https://hackforla.org/"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Hack for LA
              </Link>
              . Our volunteers have done amazing work but we need your help to
              maintain and expand this important resource. Your tax-deductible
              donation helps us offset the costs involved with marketing and
              updating our directory.
            </Typography>
          </Container>
          <Button
          sx={{
            margin: "30px auto",
            color: "#fff",
            border: "1px solid #336699",
            background: "#336699",
            borderRadius: "6px",
            padding: "8px 16px",
            textDecoration: "none",
            textTransform: "uppercase"
          }}
            variant="contained"
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
        </Container>
        <Footer />
      </Container>
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
      <Container
      sx={{
        flexGrow: 1,
        overflow: "scroll"
      }}
      >
        <Paper
        xs={{
          maxWidth: 400,
        }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
              sx={{
                backgroundColor: "#ef624f",
              }}
              >1</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>Enter your donation amount.</Typography>
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "auto"
                }}
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
      </Container>
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
