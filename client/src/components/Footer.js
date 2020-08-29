import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useLocationHook from "hooks/useLocationHook";
import { MENU_ITEMS } from "helpers/Constants";
import { Link } from "react-router-dom";
import logo from "images/fola.svg";
import logoCA from "images/hackforla.svg";
import { TenantContext } from "./tenant-context";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    backgroundColor: "#FFF",
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "#1b1b1b",
    fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
  },
  logo: {
    position: "absolute",
    left: "1rem",
    top: ".5rem",
    height: "60px",

    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  textHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  linkStyle: {
    padding: "0 !important",
    color: "#1b1b1b",
    textDecoration: "none",
    fontSize: "16px",
    textTransform: "uppercase",
    margin: ".4em 0 .4em 1.5em",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Footer = () => {
  const isHomePage = useLocationHook();
  const classes = useStyles();

  const initialFooterSwitch = window.innerWidth >= 1000 ? true : false;
  const [fullSizeFooterVisible, changeFooterSize] = useState(
    initialFooterSwitch
  );

  useEffect(() => {
    const checkWindowSize = () => {
      window.innerWidth >= 1000
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

  const constantStyles = fullSizeFooterVisible
    ? {
        justifyContent: "center",
      }
    : {
        justifyContent: "flex-end",
        height: "135px",
        flexDirection: "column-reverse",
        alignItems: "flex-end",
      };

  const constantLinks = MENU_ITEMS.map((item, index) => {
    const { text, link } = item;
    return (
      <Link className={classes.linkStyle} key={index} to={link}>
        {text}
      </Link>
    );
  });

  return (
    <Box className={classes.footer} style={holderStyle}>
      <TenantContext.Consumer>
        {(tenantId) =>
          tenantId === 2 ? (
            <img src={logoCA} className={classes.logo} alt="logo" />
          ) : (
            <img src={logo} className={classes.logo} alt="logo" />
          )
        }
      </TenantContext.Consumer>

      <div className={classes.textHolder} style={constantStyles}>
        {constantLinks}
      </div>
      {/* <Copyright /> */}
    </Box>
  );
};

export default Footer;
