import React from "react";

import donatebg from "./assets/donate-bg.webp";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PageWrapper } from "components/StaticPages/PageWrapper";
import { Box, CardMedia, Link, SvgIcon } from "@mui/material";
import IconSpacerSVG from "components/StaticPages/assets/IconSpacerSVG";

const Donate = () => {
  // const { t } = useTranslation("donate");
  return (
    <PageWrapper>
      <CardMedia
         component="img"
         alt="Donate"
         src={donatebg}
         style={{ width: "100%" }}
       ></CardMedia>
        <Typography variant="h1"
         sx={{
             textTransform: "uppercase",
             textAlign: "center",
             margin: 0,
             padding: "32px 0",
           }}
        >
          Donate
        </Typography>
        <Box
        sx={{
          padding: "32px",
          margin: "32px 0 0 0",
          borderRadius: "24px",
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap"
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
            flexBasis: "100%",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "32px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
          variant="h2" component="h2">
            Why Donate?
          </Typography>
          <Container maxWidth="sm">
            <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1">
              We’ve done so much already as a 100% volunteer-run
              organization—but we need your help to finish what we set out to
              do. The admin, development, and marketing costs to expand our
              directory are extensive. Your tax-deductible donation would help
              us offset some of those costs.
            </Typography>
            <Typography
            sx={{
              marginBottom: "16px",
            }}
            variant="body1">
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
            variant=""
            href="//www.codeforamerica.org/donate"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              "&:hover": {
                backgroundColor: "#0A3865",
              },
              margin: "20px auto 0 auto",
              color: "#fff",
              border: "1px solid #336699",
              background: "#336699",
              borderRadius: "6px",
              padding: "8px 16px",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Donate
          </Link>
        </Box>
        <Box
        sx={{
          padding: "32px",
          margin: "32px 0 0 0",
          borderRadius: "24px",
          background: "#B6D8FB",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          "& $btnOutline": {
            color: "#fff",
            margin: "20px auto 16px auto",
          },
          "& $p": {
            marginTop: "15px",
          }
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
            flexBasis: "100%",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "32px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          variant="h2" component="h2">
            Want to give your time instead?
          </Typography>
          <Container maxWidth="sm">
            <Typography
            sx={{
              marginTop: "15px",
            }}
            variant="body1">
              Virtual volunteer opportunity! Help us validate our database.
              Correct, up-to-date information is vital for someone seeking food.
            </Typography>
            <Typography
            sx={{
              marginTop: "15px",
            }}
            variant="body1">
              To volunteer as a data validator, please join us on Zoom for
              online training. We meet{" "}
              <strong>Saturday mornings from 10 AM - 12 PM PST.</strong> Sign up
              at this address:
            </Typography>
          </Container>
          <Link
            variant=''
            href="//volunteer.laworks.com/opportunity/a0C3l00000r3wLvEAI"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              "&:hover": {
                backgroundColor: "#0A3865",
              },
              margin: "20px auto 0 auto",
              color: "#fff",
              border: "1px solid #336699",
              background: "#336699",
              borderRadius: "6px",
              padding: "8px 16px",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Volunteer
          </Link>
          <Container maxWidth="sm">
            <Typography
            sx={{
              marginTop: "15px",
            }}
            variant="body1">
              Developers, designers, data specialists, or researchers - If you
              have tech skills, please inquire about joining our team as a
              developer, designer, or data specialist via email,{" "}
              <Link href="mailto:foodoasisinfo@hackforla.org">
                foodoasisinfo@hackforla.org
              </Link>
              .
            </Typography>
          </Container>
        </Box>
      </PageWrapper>
  );
};

export default Donate;
