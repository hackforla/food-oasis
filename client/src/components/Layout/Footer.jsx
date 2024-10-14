import { Box, CardMedia } from "@mui/material";
import { MENU_ITEMS } from "helpers/Constants";
import useLocationHook from "hooks/useLocationHook";
import { Link } from "react-router-dom";
import Copyright from "./Copyright";
import { TENANT_LOGO_URL } from "helpers/Constants";

/* 
This file is not used in the application at this time, but left here in 
case the UI/UX team decides to re-instate it.
*/

const Footer = () => {
  const { isHomePage } = useLocationHook();

  if (isHomePage) return null;

  const constantLinks = MENU_ITEMS.map((item, index) => {
    const { text, link } = item;
    return (
      <Link
        style={{
          padding: "0 !important",
          color: "#1b1b1b",
          textDecoration: "none",
          fontSize: "16px",
          textTransform: "uppercase",
          margin: ".4em 0 .4em 1.5em",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        key={index}
        to={link}
      >
        {text}
      </Link>
    );
  });

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        backgroundColor: "#FFF",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "#1b1b1b",
        [theme.breakpoints.down("md")]: {
          alignItems: "flex-end",
          justifyContent: "space-between",
        },
        fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
      })}
    >
      <CardMedia
        component="img"
        alt="logo"
        src={TENANT_LOGO_URL}
        sx={(theme) => ({
          maxWidth: "95px",
          height: "100%",
          width: "100%",
          "&:hover": {
            filter: "brightness(1.2)",
          },
          [theme.breakpoints.up("md")]: {
            paddingTop: "5px",
          },
        })}
      />

      <Box
        sx={(theme) => ({
          alignItems: "flex-end",
          display: "flex",
          flexDirection: "column",
          marginLeft: "2em",
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "4em",
          },
          [theme.breakpoints.down("md")]: {
            alignItems: "flex-end",
            textAlign: "right",
          },
        })}
      >
        {constantLinks}
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
