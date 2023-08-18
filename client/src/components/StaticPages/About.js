import React, { useEffect } from "react";
import aboutbg from "./assets/about-bg.webp";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farm2people from "./assets/farm2people.png";
import foodBank from "./assets/food-bank.png";
import Typography from "@mui/material/Typography";
import * as analytics from "../../services/analytics";
import { Link as RouterLink } from "react-router-dom";
import { Link, Container, CardMedia, Box, SvgIcon } from "@mui/material";
import Footer from "../Layout/Footer";
import IconSpacerSVG from "./assets/IconSpacerSVG";
import { PageWrapper } from "./PageWrapper";

const About = () => {
  useEffect(() => {
    analytics.postEvent("visitAboutPage");
  }, []);

  return (
    <PageWrapper>
      <CardMedia
        component="img"
        alt="About"
        src={aboutbg}
        style={{ width: "100%" }}
      ></CardMedia>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
            padding: "32px 0",
          }}
        >
          <span>About</span> Food Oasis / LA
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: "20px", md: "24px" },
            padding: { xs: "5px 32px 10px", md: "5px 120px 20px" },
          }}
        >
          There are numerous free food resources in Los Angeles County. With an
          updated directory of over 1000 listings, our website helps connect you
          to these resources.
        </Typography>{" "}
      </Container>

      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
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
          sx={{
            flexBasis: "100",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          variant="h2"
        >
          Our Mission
        </Typography>
        <Container maxWidth="sm">
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            Food Oasis is a web-based directory that connects people to free
            food resources in Los Angeles. Our team is dedicated to maintaining
            an updated directory of hundreds of free food resources in the area
            such as food pantries and meal programs. Our volunteers frequently
            verify each listing for the most comprehensive and up-to-date
            information. 
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0 0 0",
          borderRadius: "24px",
          background: "#B6D8FB",
          display: "flex",
          flexDirection: "column",
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
          sx={{
            flexBasis: "100",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          variant="h2"
        >
          Our Team
        </Typography>
        <Container maxWidth="sm">
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            We are a 100% volunteer-run project. We are part of{" "}
            <Link
              variant="primary"
              href="https://hackforla.org/"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              Hack for LA
            </Link>
            . Our team includes product managers, researchers, designers,
            developers, writers and data validators who maintain this web-based
            directory. We verify each listing in our directory regularly to
            ensure the contact information, hours of operation, and services
            provided are accurate.
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0 0 0",
          borderRadius: "24px",
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
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
          sx={{
            flexBasis: "100",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          variant="h2"
        >
          Questions
        </Typography>
        <Typography
          sx={{
            marginBottom: "16px",
          }}
          variant="body1"
        >
          For more information, please visit our{" "}
          <Link variant="primary" to={"/faqs"} component={RouterLink}>
            FAQ page
          </Link>
          .
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0 0 0",
          borderRadius: "24px",
          background: "#B6D8FB",
          display: "flex",
          flexDirection: "column",
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
          sx={{
            flexBasis: "100",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          variant="h2"
        >
          Contact Us
        </Typography>
        <Container maxWidth="sm">
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
            align="center"
          >
            Questions about our project?
            <br />
            Updates to the listings?
            <br />
            General inquiries?
            <br />
          </Typography>
          <Typography align="center">
            Please contact our Support Team
            <br />
            <Link variant="primary" href="mailto:foodoasisinfo@hackforla.org">
              foodoasisinfo@hackforla.org
            </Link>
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          background: "#fff",
          padding: "48px 32px",
          borderRadius: "24px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography
          sx={{
            width: "100%",
            flexBasis: "100",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "32px",
            marginTop: "10px",
            marginBottom: "60px",
          }}
          variant="h2"
        >
          Our Partners
        </Typography>
        <Link
          component="a"
          href="https://www.foodcyclela.org/"
          target={"_blank"}
          rel="noopener noreferrer"
          variant="icon"
        >
          <CardMedia
            component="img"
            alt="Food Cycle LA"
            src={foodCycle}
            sx={{
              maxWidth: "100%",
              height: "100%",
              marginBottom: { xs: "40px", md: "0" },
            }}
          />
        </Link>
        <Link
          component="a"
          href="https://foodforward.org/"
          target={"_blank"}
          rel="noopener noreferrer"
          variant="icon"
        >
          <CardMedia
            component="img"
            alt="Food Forward"
            src={foodForward}
            sx={{
              maxWidth: "100%",
              height: "100%",
              marginBottom: { xs: "40px", md: "0" },
            }}
          />
        </Link>
        <Link
          component="a"
          href="https://www.farm2people.org/"
          target={"_blank"}
          rel="noopener noreferrer"
          variant="icon"
        >
          <CardMedia
            component="img"
            alt="Farm People"
            src={farm2people}
            sx={{
              maxWidth: "100%",
              height: "100%",
              marginBottom: { xs: "40px", md: "0" },
            }}
          />
        </Link>
        <Link
          component="a"
          href="https://www.lafoodbank.org/"
          target={"_blank"}
          rel="noopener noreferrer"
          variant="icon"
        >
          <CardMedia
            component="img"
            alt="Food Bank"
            src={foodBank}
            sx={{
              maxWidth: "100%",
              height: "100%",
              marginBottom: { xs: "40px", md: "0" },
            }}
          />
        </Link>
      </Box>
      <Footer />
    </PageWrapper>
  );
};

export default About;
