import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "../../helpers";

WidgetFooter.propTypes = {
  tenantId: PropTypes.number,
};

const logoPaths = {
  1: require("images/foodoasis.svg"),
  2: require("images/foodoasis.svg"),
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none-no-tag.png"),
  4: require("images/foodoasis.svg"),
  5: require("images/foodoasis.svg"),
  6: require("images/foodoasis.svg"),
};

const logoStackedPaths = {
  1: require("images/logo-food-oasis-stacked.svg"),
  2: require("images/logo-food-oasis-stacked.svg"),
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none-no-tag.png"),
  4: require("images/logo-food-oasis-stacked.svg"),
  5: require("images/logo-food-oasis-stacked.svg"),
  6: require("images/logo-food-oasis-stacked.svg"),
};

const useStyles = makeStyles((theme) => ({
  headerHolder: {
    backgroundColor: "#FFF",
    marginBottom: 0,
    boxShadow: "none",
    borderBottomColor: theme.palette.primary,
  },
  header: {
    minHeight: "40px",
    display: "flex",
    justifyContent: "space-between",
    padding: "2px 1em",
  },
  logo: {
    maxWidth: "175px",
    maxHeight: "28px",
    margin: "0",

    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  logoStacked: {
    maxHeight: "40px",
    margin: "2px 1rem",
    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  content: {
    display: "flex",
    flexGrow: 0,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 24px",
  },
  tagline: {
    color: theme.palette.primary.dark,
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "1.2",
    flexGrow: 0,
    flexShrink: 1,
    fontFamily: `Helvetica, Arial, "Lucida Grande", sans- serif`,
    // [theme.breakpoints.up("sm")]: {
    //   display: "none",
    // },
  },
}));

function WidgetFooter(props) {
  const { tenantId } = props;
  const classes = useStyles();
  const imageType = logoPaths
    ? logoPaths[tenantId].default.split(".").pop()
    : "unknown";

  return (
    <>
      <div position="sticky" className={classes.headerHolder}>
        <div className={classes.header}>
          <div className={classes.content}>
            <Typography
              variant="subtitle1"
              className={classes.tagline}
              align="left"
            >
              Data Provided by&nbsp;
            </Typography>
            <a
              href="https://la.foodoasis.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Food Oasis
            </a>
          </div>
          <div>
            {isMobile() ? (
              <a href="/widget">
                <img
                  src={
                    logoStackedPaths[tenantId]
                      ? logoStackedPaths[tenantId].default
                      : logoStackedPaths[1].default
                  }
                  className={classes.logoStacked}
                  style={
                    imageType === "svg" ? { width: "100%", height: "100%" } : {}
                  }
                  alt="logo"
                />{" "}
              </a>
            ) : (
              <a href="/widget">
                <img
                  src={
                    logoPaths[tenantId]
                      ? logoPaths[tenantId].default
                      : logoPaths[1].default
                  }
                  className={classes.logo}
                  style={
                    imageType === "svg" ? { width: "100%", height: "100%" } : {}
                  }
                  alt="logo"
                />{" "}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(WidgetFooter);
