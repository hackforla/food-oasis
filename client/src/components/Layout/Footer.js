import { Box, CardMedia } from "@mui/material";
import { MENU_ITEMS } from "helpers/Constants";
import useLocationHook from "hooks/useLocationHook";
import { Link } from "react-router-dom";
import { tenantId } from "../../helpers/Configuration";

/* 
This file is not used in the application at this time, but left here in 
case the UI/UX team decides to re-instate it.
*/

const logoPaths = {
  1: require("images/foodoasis.svg").default,
  2: require("images/foodoasis.svg").default,
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none.png"),
  4: require("images/foodoasis.svg").default,
  5: require("images/foodoasis.svg").default,
  6: require("images/foodoasis.svg").default,
};

const Footer = () => {
  const { isHomePage } = useLocationHook();

  if (isHomePage) return null;

  const constantLinks = MENU_ITEMS.map((item, index) => {
    const { text, link } = item;
    return (
      <Link
        style={{
          "padding": "0 !important",
          "color": "#1b1b1b",
          "textDecoration": "none",
          "fontSize": "16px",
          "textTransform": "uppercase",
          "margin": ".4em 0 .4em 1.5em",
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
        justifyContent: "space-between",
        color: "#1b1b1b",
        [theme.breakpoints.up("md")]: {
          alignItems: "flex-start",
        },
        [theme.breakpoints.down("md")]: {
          alignItems: "flex-end",
        },
        fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
      })}
    >
      <CardMedia
        component="img"
        alt="logo"
        src={logoPaths[tenantId]}
        sx={(theme) => ({
          "maxWidth": "95px",
          "height": "100%",
          "width": "100%",
          "marginTop": "0",

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
          justifyContent: "center",
          alignItems: "flex-end",
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "4em",
          },
          [theme.breakpoints.down("md")]: {
            height: "180px",
          },
        })}
      >
        {constantLinks}
      </Box>
      {/* <Copyright /> */}
    </Box>
  );
};

export default Footer;
