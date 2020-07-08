import React from "react";
import PropTypes from "prop-types";
import useLocationHook from "hooks/useLocationHook";
import Menu from "./Menu";
import logo from "images/fola.svg";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogoutButton from "./Logout";

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
    width: "3.5rem",
    height: "2.5rem",
    margin: ".5rem .75rem",

    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  userLoggedIn: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: "1",
    minHeight: "3rem",
  },
  username: {
    color: "black",
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
  const taglineText = isHomePage ? "" : "Your free food directory";

  return (
    <>
      <AppBar position="sticky" className={classes.headerHolder}>
        <Toolbar className={classes.header}>
          <div className={classes.content}>
            {!isHomePage && (
              <div>
                <a href="/">
                  <img src={logo} className={classes.logo} alt="logo" />{" "}
                </a>
              </div>
            )}
            {!isHomePage && user ? (
              <div className={classes.userLoggedIn}>
                <Typography
                  variant="h6"
                  component="h1"
                  className={classes.username}
                >
                  {user.firstName}
                </Typography>
                <LogoutButton setUser={setUser} setToast={setToast} />
              </div>
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
