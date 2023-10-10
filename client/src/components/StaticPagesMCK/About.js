import React from "react";

import aboutbg from "./assets/about-bg.webp";
import foodCycle from "./assets/food-cycle.png";
import foodForward from "./assets/food-forward.png";
import farm2people from "./assets/farm2people.png";
import foodBank from "./assets/food-bank.png";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PageWrapper } from "components/StaticPages/PageWrapper";
import { Link as RouterLink } from "react-router-dom";
import { Box, CardMedia, Link, SvgIcon } from "@mui/material";
import IconSpacerSVG from "components/StaticPages/assets/IconSpacerSVG";
import Footer from "../Layout/Footer";

const About = () => {
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
          <span>About</span> Food Oasis McKinney
        </Typography>
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
            Access to enough food should be a basic right. Unfortunately, this
            is not the reality for millions of people in the McKinney area.
          </Typography>
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            Food pantries in the area are experiencing unprecedented demand. The
            demand for food assistance has almost doubled since the beginning of
            2020. To compound matters, it is the hard work of volunteers that
            keeps pantries and meal programs open. The number of volunteers
            available to distribute food has diminished.
          </Typography>
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            The primary goal of Food Oasis is to provide up-to-date information
            to the people of McKinney who are experiencing food insecurity. We
            built a directory that connects anyone with hundreds of free food
            resources. Food Oasis presents reliable information on a
            user-friendly platform. This will reduce stress and uncertainty for
            food seekers. It will also demonstrate to our community the growing
            need of food donations in McKinney.
          </Typography>
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            Food Oasis is creating a directory of updated food resources. There
            are countless groups helping to feed hungry people. But it’s
            difficult for those in need to find them because there’s no one
            source of updated info. We’re working to change that.
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
            Food Oasis started in 2015 under{" "}
            <Link
              variant="primary"
              href="https://hackforla.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hack for LA
            </Link>
            , a brigade under the non-profit{" "}
            <Link
              variant="primary"
              href="https://codeforamerica.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code for America
            </Link>
            . The goal was to create a site of free and subsidized food
            resources. The team gave the project to a nonprofit to manage its
            day-to-day operations. The upkeep turned out to be much more work
            than any single nonprofit could handle.
          </Typography>
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            In August 2019, our current Hack for LA team assembled to build new
            digital pieces of this puzzle. One goal was to relaunch the site
            with hundreds of new food resources. We learned from the past how
            difficult it is to keep resources updated. Now, we are training
            volunteers to update the resources in the directory. The final piece
            we added is a new second database that connects pantry directors
            with food donation organizations.
          </Typography>
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            Our web-based solution is sparking collaboration, community
            building, and team building. The result of this community-building
            gives the food seeker updated information to find the free food
            resources they need.
          </Typography>
          <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1"
          >
            We are 100% volunteer-run project. We look forward to sharing our
            updated directory with Los Angeles.
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
