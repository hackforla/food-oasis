import {
  Box,
  CardMedia,
  Container,
  Link,
  SvgIcon,
  Typography,
  Theme,
  SxProps,
} from "@mui/material";
import { useEffect, ReactElement, FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as analytics from "../../services/analytics";
import Footer from "../Layout/Footer";
import { PageWrapper } from "./PageWrapper";
import IconSpacerSVG from "./assets/IconSpacerSVG";
import faqbg from "./assets/faq-bg.webp";
import SEO from "../SEO";

type AnalyticsEvent = "visitFaqPage" | "visitHomePage" | string;

const styles: Record<string, SxProps<Theme>> = {
  headerText: {
    textTransform: "uppercase",
    textAlign: "center",
    margin: 0,
    padding: "32px 0",
  },
  sectionBox: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#f0f0f0",
    display: "flex",
    flexWrap: "wrap",
  },
  iconMedia: {
    margin: "auto",
    marginBottom: "20px",
    height: "40px",
    width: "90px",
  },
  sectionTitle: {
    flexBasis: "100%",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "20px",
  },
  definitionList: {
    marginTop: "10px",
    marginBottom: "0",
    "& dd": {
      marginLeft: "0",
      marginBottom: "24px",
    },
    "& dd:last-child": {
      marginBottom: "0",
    },
  },
  listContainer: {
    paddingLeft: "26px",
    margin: "5px",
    lineHeight: "26.55px",
  },
  providerBox: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#B6D8FB",
    display: "flex",
    flexDirection: "column",
  },
};

const About: FC = (): ReactElement => {
  useEffect((): void => {
    analytics.postEvent("visitFaqPage" as AnalyticsEvent);
  }, []);

  return (
    <>
      <SEO
        title="FAQs | Food Oasis"
        description="How do I use Food Oasis to locate free food resources in Los Angeles?"
        url="https://www.foodoasis.la/faqs"
      />
      <PageWrapper>
        <CardMedia
          component="img"
          alt="FAQ"
          src={faqbg}
          style={{ width: "100%" }}
        />
        <Typography
          variant="h1"
          sx={styles.headerText}
        >
          FAQ
        </Typography>
        <Box sx={styles.sectionBox}>
          <CardMedia
            component="svg"
            sx={styles.iconMedia}
          >
            <SvgIcon component={IconSpacerSVG} titleAccess="Glossary" />
          </CardMedia>
          <Typography
            variant="h2"
            sx={styles.sectionTitle}
          >
            Food Seekers
          </Typography>
          <Container maxWidth="sm">
            <Box
              component="dl"
              sx={styles.definitionList}
            >
              <Typography variant="subtitle1" component="dt">
                {" "}
                How do I use this directory?
              </Typography>
              <Box
                sx={styles.listContainer}
                component="ul"
              >
                <Typography variant="body1" component="li">
                  From the “Find Food” page, type in your zip code or address
                  and click “Enter.”
                </Typography>
                <Typography variant="body1" component="li">
                  A list of nearby options, sorted from nearest to farthest,
                  will pop up on the left side of the screen.
                </Typography>
                <Typography variant="body1" component="li">
                  Choose “PANTRIES” or “MEALS” if you would like to filter by
                  type of food resource.
                </Typography>
                <Typography variant="body1" component="li">
                  The “Details” button on an entry provides information like
                  Directions, Hours of Operation and Contact Information for the
                  service.
                </Typography>
              </Box>
              <br />
              <Typography variant="subtitle1" component="dt">
                Does this web-based directory include every resource where I can
                get free food in Los Angeles County?
              </Typography>
              <Box
                sx={styles.listContainer}
                component="ul"
              >
                <Typography variant="body1" component="li">
                  No. While our directory is not an exhaustive list of every
                  food resource open to the public in Los Angeles, our
                  volunteers work hard to ensure the information listed is
                  updated. To suggest a listing missing from our directory,{" "}
                  <Link
                    variant="body1"
                    to={"/suggestion"}
                    component={RouterLink}
                  >
                    use this link
                  </Link>
                  .
                </Typography>
              </Box>
              <br />
              <Typography variant="subtitle1" component="dt">
                What is the difference between a food bank, food pantry and meal
                program?
              </Typography>
              <Box
                sx={styles.listContainer}
                component="ul"
              >
                <Typography variant="body1" component="li">
                  Generally, food banks collect donated food and distribute
                  items to food pantries. Food pantries provide free groceries
                  to food seekers. Meal programs provide free cooked meals to
                  food seekers. Many locations provide multiple services. Our
                  updated directory indicates which services are available at
                  each location.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box
          sx={styles.providerBox}
        >
          <CardMedia
            component="svg"
            sx={styles.iconMedia}
          >
            <SvgIcon component={IconSpacerSVG} titleAccess="Glossary" />
          </CardMedia>
          <Typography
            variant="h2"
            sx={styles.sectionTitle}
          >
            Food Providers
          </Typography>
          <Container maxWidth="sm">
            <Box component="dl" sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" component="dt">
                How can I add our food resource to your directory?
              </Typography>
              <Typography component="dd">
                Please visit our “
                <Link
                  variant="body1"
                  to={"/suggestion"}
                  component={RouterLink}
                >
                  Suggest New Listing
                </Link>
                ” page.
              </Typography>
            </Box>
          </Container>
        </Box>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default About;
