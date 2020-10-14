import React from "react";
import PropTypes from "prop-types";
import useLocationHook from "hooks/useLocationHook";
import Menu from "./Menu";
// The two tenant logos happen to be the same at this moment
import logo from "images/foodoasis.svg";
import logoCA from "images/foodoasis.svg";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { tenantId } from "../helpers/Configuration";

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
};

const useStyles = makeStyles({
  headerHolder: {
    backgroundColor: (props) => props.headerColor,
    marginBottom: (props) => props.headerMargin,
    boxShadow: (props) => props.headerShadow,
  },
  header: {
    minHeight: "60px",
    padding: "0 1.5em 0 0",
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: "90px",
    height: "60px",
    margin: "0 .5rem",

    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  tagline: {
    color: "#1b1b1b",
    fontStyle: "italic",
    paddingLeft: "9px",
    lineHeight: "1.5",
    fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
  },
});

export default function Header(props) {
  const { user, setUser, setToast } = props;
  const isHomePage = useLocationHook();

  const homePageStyles = {
    headerColor: "transparent",
    headerMargin: "-65px",
    headerShadow: "none",
  };

  const defaultStyles = {
    headerColor: "#FFF",
    headerMargin: "0",
  };

  const styles = isHomePage ? homePageStyles : defaultStyles;
  const classes = useStyles(styles);
  const taglineText = ""; // isHomePage ? "" : "Your free food directory";

  return (
    <>
      <AppBar position="sticky" className={classes.headerHolder}>
        <Toolbar className={classes.header}>
          <div className={classes.content}>
            {!isHomePage &&
              (tenantId === 1 ? (
                <div>
                  <a href="/">
                    <img src={logo} className={classes.logo} alt="logo" />{" "}
                  </a>
                </div>
              ) : (
                <div>
                  <a href="/">
                    <img src={logoCA} className={classes.logo} alt="logo" />{" "}
                  </a>
                </div>
              ))}
            {!isHomePage && user ? (
              <Typography variant="subtitle1" className={classes.tagline}>
                {user.firstName}
              </Typography>
            ) : (
              <Typography variant="subtitle1" className={classes.tagline}>
                {taglineText}
              </Typography>
            )}
          </div>
          <Menu user={user} setUser={setUser} setToast={setToast} />
        </Toolbar>
      </AppBar>
    </>
  );
}
