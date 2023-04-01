import React from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";
import { AppBar, Toolbar, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useUserContext } from "../../contexts/userContext";
import { useSiteContext } from "../../contexts/siteContext";
import useLocationHook from "hooks/useLocationHook";

Header.propTypes = {
  tenantId: PropTypes.number,
};

const logoPaths = {
  1: require("images/foodoasis.svg").default,
  2: require("images/foodoasis.svg").default,
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none.png"),
  4: require("images/foodoasis.svg").default,
  5: require("images/foodoasis.svg").default,
  6: require("images/foodoasis.svg").default,
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
    [theme.breakpoints.down("md")]: {
      padding: "0 0.5em 0 0",
      minHeight: "45px",
    },
  },
  spacedHeader: {
    marginTop: theme.spacing(4),
  },
  logo: {
    maxWidth: "175px",
    maxHeight: "48px",
    margin: "4px 4px 0 4px",
    "&:hover": {
      filter: "brightness(1.2)",
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: "36px",
      margin: "4px 4px 0 8px",
    },
  },
  content: {
    display: "flex",
    flexGrow: 2,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 24px",
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

export default function Header() {
  const { tenantId } = useSiteContext();
  const classes = useStyles();
  const { isAuthPage } = useLocationHook();
  const imageType = logoPaths
    ? logoPaths[tenantId].split(".").pop()
    : "unknown";

  const { user } = useUserContext();

  return (
    <>
      <AppBar
        position="sticky"
        className={`${classes.headerHolder} ${
          isAuthPage && classes.spacedHeader
        } `}
      >
        <Toolbar className={classes.header}>
          <div>
            <a href="/">
              <img
                src={logoPaths[tenantId]}
                className={classes.logo}
                style={
                  imageType === "svg" ? { width: "100%", height: "100%" } : {}
                }
                alt="logo"
              />
            </a>
          </div>
          <div className={classes.content}>
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
          <Menu />
        </Toolbar>
      </AppBar>
    </>
  );
}
