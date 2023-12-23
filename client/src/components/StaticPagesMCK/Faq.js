import {
  Box,
  CardMedia,
  Container,
  Link,
  SvgIcon,
  Typography,
} from "@mui/material";
import Footer from "components/Layout/Footer";
import { PageWrapper } from "components/StaticPages/PageWrapper";
import { Link as RouterLink } from "react-router-dom";
import IconSpacerSVG from "./assets/IconSpacerSVG";
import faqbg from "./assets/faq-bg.webp";

const About = () => {
  return (
    <PageWrapper>
      <CardMedia
        component="img"
        alt="FAQ"
        src={faqbg}
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
        FAQ
      </Typography>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#f0f0f0",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <CardMedia
          component="svg"
          sx={{
            margin: "auto",
            marginBottom: "20px",
            height: "40px",
            width: "90px",
          }}
        >
          <SvgIcon component={IconSpacerSVG} titleAccess="Glossary" />
        </CardMedia>
        <Typography
          variant="h2"
          sx={{
            flexBasis: "100%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          Glossary
        </Typography>
        <Container maxWidth="sm">
          <Box
            component="dl"
            sx={{
              marginTop: "10px",
              marginBottom: "0",
              "& dd": {
                marginLeft: "0",
                marginBottom: "24px",
              },
              "& dd:last-child": {
                marginBottom: "0",
              },
            }}
          >
            <Typography variant="subtitle1" component="dt">
              Food Seeker
            </Typography>
            <Typography variant="body1" component="dd">
              A person in need of free groceries or meals.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              Food Pantry
            </Typography>
            <Typography variant="body1" component="dd">
              A place that gives away free groceries—not cooked meals—to the
              community.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              Food Bank
            </Typography>
            <Typography variant="body1" component="dd">
              A nonprofit that collects donated food and distributes it to food
              pantries.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              Meal Program or Soup Kitchen
            </Typography>
            <Typography variant="body1" component="dd">
              A place that gives away free cooked meals—not grocery and pantry
              items—to the community.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              Food Donation
            </Typography>
            <Typography variant="body1" component="dd">
              Donated food includes pantry items, produce, and prepared meals.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              Food Rescue Organization
            </Typography>
            <Typography variant="body1" component="dd">
              Collects food donations from farmers, grocery stores, restaurants,
              corporations, and caterers. Their goal is to give food to people
              who need it and not have it go to waste.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#B6D8FB",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <CardMedia
          component="svg"
          sx={{
            margin: "auto",
            marginBottom: "20px",
            height: "40px",
            width: "90px",
          }}
        >
          <SvgIcon component={IconSpacerSVG} titleAccess="Glossary" />
        </CardMedia>
        <Typography
          variant="h2"
          sx={{
            flexBasis: "100%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          For Volunteers
        </Typography>
        <Container maxWidth="sm">
          <Box
            component="dl"
            sx={{
              marginTop: "10px",
              marginBottom: "0",
              "& dd": {
                marginLeft: "0",
                marginBottom: "24px",
              },
              "& dd:last-child": {
                marginBottom: "0",
              },
            }}
          >
            <Typography variant="subtitle1" component="dt">
              How can I sign up to volunteer?
            </Typography>
            <Typography variant="body1" component="dd">
              <Link
                variant="primary"
                href="https://volunteer.laworks.com/opportunity/a0C3l00000r3wLvEAI"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Attend a training session
              </Link>{" "}
              to get an assignment, or reach out to{" "}
              <Link variant="primary" href="mailto:foodoasisinfo@hackforla.org">
                foodoasisinfo@hackforla.org
              </Link>
              .
            </Typography>
            <Typography variant="subtitle1" component="dt">
              When can I volunteer?
            </Typography>
            <Typography variant="body1" component="dd">
              Anytime. After you attend a training session, you can update the
              details whenever you have time. That may mean calling in the
              mornings or researching online in the evenings.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              How do I set up an account to start my assignment?
            </Typography>
            <Typography variant="body1" component="dd">
              <Link variant="primary" to={"/register"} component={RouterLink}>
                Attend a training session
              </Link>
              , and look out for a confirmation email from{" "}
              <Link
                variant="primary"
                href="mailto:foodoasis+noreply@hackforla.org"
              >
                foodoasis+noreply@hackforla.org
              </Link>
              . Follow the instructions on the email.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#f0f0f0",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <CardMedia
          component="svg"
          sx={{
            margin: "auto",
            marginBottom: "20px",
            height: "40px",
            width: "90px",
          }}
        >
          <SvgIcon component={IconSpacerSVG} titleAccess="Glossary" />
        </CardMedia>
        <Typography
          variant="h2"
          sx={{
            flexBasis: "100%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          For Donors
        </Typography>
        <Container maxWidth="sm">
          <Box
            component="dl"
            sx={{
              marginTop: "10px",
              marginBottom: "0",
              "& dd": {
                marginLeft: "0",
                marginBottom: "24px",
              },
              "& dd:last-child": {
                marginBottom: "0",
              },
            }}
          >
            <Typography variant="subtitle1" component="dt">
              What is food insecurity?
            </Typography>
            <Typography variant="body1" component="dd">
              Unable to consistently access or afford adequate food to live a
              healthy life.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              How is Food Oasis helping to diminish food insecurity?
            </Typography>
            <Typography variant="body1" component="dd">
              Food Oasis is creating a directory of updated food resources.
              There are countless groups helping to feed hungry Angelenos. But
              it’s difficult for those in need to find them because there’s no
              one source of updated info. We’re working to change that.
            </Typography>
            <Typography variant="subtitle1" component="dt">
              What will my donation go toward?
            </Typography>
            <Typography variant="body1" component="dd">
              Your donations help us cover the human costs required to update
              the food resources in Los Angeles.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </PageWrapper>
  );
};

export default About;
