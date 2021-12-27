import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "../../helpers";

const logoPaths = {
  1: require("images/foodoasis.svg"),
  2: require("images/foodoasis.svg"),
  3: require("images/foodoasis.svg"),
  4: require("images/foodoasis.svg"),
  5: require("images/foodoasis.svg"),
  6: require("images/foodoasis.svg"),
};

const logoStackedPaths = {
  1: require("images/logo-food-oasis-stacked.svg"),
  2: require("images/logo-food-oasis-stacked.svg"),
  3: require("images/logo-food-oasis-stacked.svg"),
  4: require("images/logo-food-oasis-stacked.svg"),
  5: require("images/logo-food-oasis-stacked.svg"),
  6: require("images/logo-food-oasis-stacked.svg"),
};

const logoMaintainerPaths = {
  1: require("images/hackforla.svg"),
  2: require("images/hackforla.svg"),
  3: require("../StaticPagesHI/assets/cfh-logo-black-crop.png"),
  4: require("images/hackforla.svg"),
  5: require("images/hackforla.svg"),
  6: require("images/hackforla.svg"),
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "50px",
    marginBottom: 0,
    padding: "2px 0.5em",
    boxShadow: "none",
    borderBottomColor: theme.palette.primary,
  },
  logo: {
    maxWidth: "175px",
    maxHeight: "38px",
    "&:hover": {
      filter: "brightness(1.2)",
    },
  },
  footerSectionContainer: {
    color: theme.palette.primary.dark,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.2",
    padding: 0,
    margin: 0,
    fontSize: 12,
    "& a,h6": {
      whiteSpace: "nowrap",
      fontSize: 14,
      textDecoration: "none",
      color: theme.palette.primary.light,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
    },
  },
  footerCaption: {
    display: "inline-block",
    fontWeight: "bold",
    fontFamily: `Helvetica, Arial, "Lucida Grande", sans- serif`,
  },
}));

function WidgetFooterSection(props) {
  const { logoPath, alt, className, logoStyle, captionText, name, url } = props;
  const classes = useStyles();
  const imageType = logoPath ? logoPath.default.split(".").pop() : "unknown";

  return (
    <div className={classes.footerSectionContainer}>
      <div className={classes.footerCaption}>{captionText}&nbsp;</div>
      {logoPath ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={logoPath ? logoPath.default : logoPath[1].default}
            className={className || classes.logo}
            style={
              imageType === "svg"
                ? { ...logoStyle, width: "100%", height: "100%", margin: 0 }
                : { ...logoStyle }
            }
            alt={alt}
          />
        </a>
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      )}
    </div>
  );
}

function WidgetFooter(props) {
  const [mobile, setMobile] = useState(null);
  const { tenantId, tenantDetails } = props;
  const { maintainer } = tenantDetails;
  const classes = useStyles();

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  return (
    <div position="sticky" className={classes.container}>
      <WidgetFooterSection
        name="Food Oasis"
        logoPath={
          mobile
            ? logoStackedPaths[tenantId] || logoPaths[tenantId]
            : logoPaths[tenantId]
        }
        url={`${window.location.origin}`}
        alt="Food Oasis Logo"
        className={classes.logo}
      />
      <WidgetFooterSection
        name={maintainer.name}
        captionText="A project by"
        logoPath={logoMaintainerPaths[tenantId]}
        alt={`${maintainer.name} Logo`}
        url={maintainer.website}
        className={classes.logo}
        logoStyle={mobile && { maxWidth: "65px" }}
      />
    </div>
  );
}

WidgetFooterSection.propTypes = {
  name: PropTypes.string,
  captionText: PropTypes.string,
  logoPath: PropTypes.shape(),
  alt: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WidgetFooterSection.defaultProps = {
  name: "Food Oasis",
  captionText: "",
  logoPath: undefined,
  alt: undefined,
  url: "",
  className: undefined,
  style: {},
};

WidgetFooter.propTypes = {
  tenantId: PropTypes.number.isRequired,
  tenantDetails: PropTypes.shape().isRequired,
};

export default withRouter(WidgetFooter);
