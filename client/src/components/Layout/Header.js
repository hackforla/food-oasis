import React from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";
import logo from "images/foodoasis.svg";
import logoStacked from "images/logo-food-oasis-stacked.svg";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "../../helpers";

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
};

const logoPaths = {
  1: require("images/foodoasis.svg"),
  2: require("images/foodoasis.svg"),
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none-no-tag.png"),
};

const logoStackedPaths = {
  1: require("images/logo-food-oasis-stacked.svg"),
  2: require("images/logo-food-oasis-stacked.svg"),
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none-no-tag.png"),
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
    padding: ".5",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0.5em 0 0",
      minHeight: "45px",
    },
  },
  logo: {
    maxWidth: "175px",
    maxHeight: "48px",
    margin: "4px 4px 0 4px",
    "&:hover": {
      filter: "brightness(1.2)",
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: "36px",
      margin: "4px 4px 0 8px",
    },
  },
  logoStacked: {
    height: "40px",
    margin: "auto .5rem auto 0.5rem",
    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  content: {
    display: "flex",
    flexGrow: 2,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 24px",
  },
  tagline: {
    color: theme.palette.primary.dark,
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "1.2",
    flexGrow: 2,
    flexShrink: 1,
    fontFamily: `Helvetica, Arial, "Lucida Grande", sans- serif`,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  username: {
    color: theme.palette.primary.dark,
    display: "inline-block",
    fontStyle: "italic",
    lineHeight: "1.5",
    flexGrow: 1,
    fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans- serif`,
  },
}));

export default function Header(props) {
  const { user, setUser, tenantId, setToast, taglineText } = props;
  const classes = useStyles();
  const imageType = logoPaths
    ? logoPaths[tenantId].default.split(".").pop()
    : "unknown";

  return (
    <>
      <AppBar position="sticky" className={classes.headerHolder}>
        <Toolbar className={classes.header}>
          <div>
            {isMobile() ? (
              <a href="/">
                <img
                  src={
                    logoStackedPaths[tenantId]
                      ? logoStackedPaths[tenantId].default
                      : logoStacked
                  }
                  className={classes.logo}
                  style={
                    imageType === "svg" ? { width: "100%", height: "100%" } : {}
                  }
                  alt="logo"
                />{" "}
              </a>
            ) : (
              <a href="/">
                <img
                  src={logoPaths[tenantId] ? logoPaths[tenantId].default : logo}
                  className={classes.logo}
                  style={
                    imageType === "svg" ? { width: "100%", height: "100%" } : {}
                  }
                  alt="logo"
                />{" "}
              </a>
            )}
          </div>
          <div className={classes.content}>
            {taglineText && (
              <Typography
                variant="subtitle1"
                className={classes.tagline}
                align="left"
              >
                {taglineText}
              </Typography>
            )}
            {user && user.firstName && (
              <Typography
                variant="subtitle1"
                className={classes.username}
                align="right"
              >
                {user.firstName}
              </Typography>
            )}
          </div>
          <Menu user={user} setUser={setUser} setToast={setToast} />
        </Toolbar>
      </AppBar>
    </>
  );
}
