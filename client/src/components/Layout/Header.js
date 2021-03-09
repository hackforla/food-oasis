import React from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";
import logo from "images/foodoasis.svg";
import logoStacked from "images/foodoasisla.svg";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { tenantName } from "../../helpers/Configuration";
import { isMobile } from "../../helpers";

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  headerHolder: {
    backgroundColor: "#FFF",
    marginBottom: 0,
    boxShadow: "none",
    borderBottomColor: theme.palette.primary,
  },
  header: {
    minHeight: "60px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0.5em 0 0",
      minHeight: "45px",
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    alignItems: "center",
    paddingRight: "1em",
  },
  logo: {
    height: "40px",
    margin: "0 .5rem",
    "&:hover": {
      filter: "brightness(1.2)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "45px",
    },
  },
  logoStacked: {
    height: "40px",
    margin: "auto .5rem auto 0.5rem",
    "&:hover": {
      filter: "brightness(1.2)",
    },
    // [theme.breakpoints.down("sm")]: {
    //   height: "50px",
    // },
  },
  tagline: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "1.2",
    textAlign: "center",
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: `Helvetica, Arial, "Lucida Grande", sans- serif`,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  username: {
    color: "#1b1b1b",
    fontStyle: "italic",
    lineHeight: "1.5",
    flexBasis: "1em",
    textAlign: "right",
    flexGrow: 1,
    fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
  },
}));

export default function Header(props) {
  const { user, setUser, setToast } = props;
  const classes = useStyles();
  const taglineText = isMobile()
    ? "Locate Free Food in " + tenantName
    : "Locate Free Food in " + tenantName;

  return (
    <>
      <AppBar position="sticky" className={classes.headerHolder}>
        <Toolbar className={classes.header}>
          <div className={classes.content}>
            <div>
              {isMobile() ? (
                <a href="/">
                  <img src={logoStacked} className={classes.logo} alt="logo" />{" "}
                </a>
              ) : (
                <a href="/">
                  <img src={logo} className={classes.logo} alt="logo" />{" "}
                </a>
              )}
            </div>
            <Typography variant="subtitle1" className={classes.tagline}>
              {taglineText}
            </Typography>
            <Typography variant="subtitle1" className={classes.username}>
              {user?.firstName ? user.firstName : null}
            </Typography>
          </div>
          <Menu user={user} setUser={setUser} setToast={setToast} />
        </Toolbar>
      </AppBar>
    </>
  );
}
