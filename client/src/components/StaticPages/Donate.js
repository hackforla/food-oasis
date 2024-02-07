import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import donationStep1 from "images/donationStep1.png";
import donationStep2 from "images/donationStep2.png";
import donationStep3 from "images/donationStep3.png";
// import donationStep4 from "images/donationStep4.png";
// import donationStep5 from "images/donationStep5.png";
// import donationStep6 from "images/donationStep6.png";
// import donationStep7 from "images/donationStep7.png";
import logo from "images/foodoasis.svg";
import { useState, useEffect } from "react";
import * as analytics from "../../services/analytics";
import Footer from "../Layout/Footer";
import { IconButton } from "../UI/StandardButton";
import { PageWrapper } from "./PageWrapper";
import donatebg from "./assets/donate-bg.webp";

const Donate = () => {
  const [showDonationDialog, setShowDonationDialog] = useState(false);

  useEffect(() => {
    analytics.postEvent("visitDonatePage");
  }, []);

  const handleShowDonationDialog = () => {
    setShowDonationDialog(showDonationDialog ? false : true);
  };
  return (
    <PageWrapper>
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
          textAlign: "center",
          margin: 0,
          padding: "32px 0",
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
          flexWrap: "wrap",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            As of July 2022, about 1 in 4 people in Los Angeles county are food
            insecure, meaning they worry about having enough food for their
            family. We are committed to connecting food seekers to free food
            resources in Los Angeles County.
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
            textTransform: "uppercase",
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
    </PageWrapper>
  );
};

export default Donate;

const DonationDialog = ({ showDonationDialog, setShowDonationDialog }) => {
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
          <CardMedia
            component="img"
            sx={{ height: "50px", width: " auto" }}
            src={logo}
            alt="logo"
          />
          <Grid item>
            <Typography align="center">
              Hack for LA takes donations through Civic Tech Structure.
            </Typography>
            <Typography align="center" color="error" variant="h6">
              This is a 3-step process.
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              icon="close"
              sx={{
                position: "absolute",
                right: "16px",
                top: "16px",
                color: "#9e9e9e",
              }}
              onClick={handleCloseDonationDialog}
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <Container
        sx={{
          flexGrow: 1,
          overflow: "scroll",
          padding: { xs: "8px", md: "8px 32px" },
          margin: { xs: "8px", md: "8px auto" },
        }}
      >
        <Paper
          xs={{
            maxWidth: "400px",
            padding: { xs: "16px", md: "24px" },
            margin: { xs: "16px auto", md: "24px auto" },
          }}
        >
          <Grid
            sx={{
              padding: "5px 16px",
            }}
            container
            wrap="nowrap"
            spacing={2}
          >
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#ef624f",
                  width: { xs: "24px", md: "56px" },
                  height: { xs: "24px", md: "56px" },
                }}
              >
                1
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>Enter your donation amount.</Typography>
              <CardMedia
                component="img"
                sx={{
                  width: "90%",
                  height: "auto",
                }}
                src={donationStep1}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper
          xs={{
            maxWidth: "400px",
            padding: { xs: "16px", md: "24px" },
            margin: { xs: "16px auto", md: "24px auto" },
          }}
        >
          <Grid
            sx={{
              padding: "5px 16px",
            }}
            container
            wrap="nowrap"
            spacing={2}
          >
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#ef624f",
                  width: { xs: "24px", md: "56px" },
                  height: { xs: "24px", md: "56px" },
                }}
              >
                2
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>
                In the "Project" field enter <em>"Food Oasis"</em>.
              </Typography>
              <CardMedia
                component="img"
                sx={{
                  width: "90%",
                  height: "auto",
                }}
                src={donationStep2}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper
          xs={{
            maxWidth: "400px",
            padding: { xs: "16px", md: "24px" },
            margin: { xs: "16px auto", md: "24px auto" },
          }}
        >
          <Grid
            sx={{
              padding: "5px 16px",
            }}
            container
            wrap="nowrap"
            spacing={2}
          >
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#ef624f",
                  width: { xs: "24px", md: "56px" },
                  height: { xs: "24px", md: "56px" },
                }}
              >
                3
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography>
                Fill out the remaining payment information and click{" "}
                <em>Donate</em>.
              </Typography>
              <CardMedia
                component="img"
                sx={{
                  width: "90%",
                  height: "auto",
                }}
                src={donationStep3}
                alt="logo"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Grid
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
        }}
        container
        justifyContent="center"
      >
        <Grid item>
          <Box m={3}>
            <Link
              sx={{
                margin: "30px auto",
                color: "#fff",
                border: "1px solid #336699",
                background: "#336699",
                borderRadius: "6px",
                padding: "8px 16px",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
              variant="contained"
              href="//donate.stripe.com/bIY9Cpcg8dihfIc5kl"
              target="_blank"
              rel="noopener noreferrer"
              component="a"
            >
              Donate
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};
