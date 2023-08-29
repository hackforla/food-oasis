import React, { useState, useEffect } from "react";
import { Box, CardMedia } from "@mui/material";
import useLocationHook from "hooks/useLocationHook";
import { MENU_ITEMS } from "helpers/Constants";
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

  const initialFooterSwitch = window.innerWidth >= 960 ? true : false;
  const [fullSizeFooterVisible, changeFooterSize] =
    useState(initialFooterSwitch);

  useEffect(() => {
    const checkWindowSize = () => {
      window.innerWidth >= 960
        ? changeFooterSize(true)
        : changeFooterSize(false);
    };
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  if (isHomePage) return null;

  const holderStyle = fullSizeFooterVisible
    ? {
        alignItems: "center",
      }
    : {
        alignItems: "flex-end",
      };

  const constantLinks = MENU_ITEMS.map((item, index) => {
    const { text, link } = item;
    return (
      <Link style={{
        padding: "0 !important",
        color: "#1b1b1b",
        textDecoration: "none",
        fontSize: "16px",
        textTransform: "uppercase",
        margin: ".4em 0 .4em 1.5em",
        "&:hover": {
          textDecoration: "underline",
    },
      }} key={index} to={link}>
        {text}
      </Link>
    );
  });

  return (
    <Box
    sx={{
      position: "relative",
      backgroundColor: "#FFF",
      padding: "1.5rem 1rem",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      color: "#1b1b1b",
      fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
    }}
    style={holderStyle}>
      <CardMedia
      component='img'
      alt='logo'
      src={logoPaths[tenantId]}
      sx={{
        maxWidth: "95px",
        height: "100%",
        width: "100%",
        marginTop: "0",
        "&:hover": {
          filter: "brightness(1.2)",
        },
      }}
      />

      <Box 
      sx={(theme) => ({
      justifyContent: 'center',
      alignItems: 'flex-end',
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "4em",
        height: ''
      },
      [theme.breakpoints.down("md")]: {
        height: '135px',
      }
    })}>
      {constantLinks}
      </Box>
      {/* <Copyright /> */}
    </Box>
  );
};

export default Footer;
