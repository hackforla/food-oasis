import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import { isMobile } from "../../helpers";
import { useSiteContext } from "contexts/siteContext";

const logoPaths = {
  1: require("images/foodoasis.svg"),
  2: require("images/foodoasis.svg"),
  3: require("images/foodoasis.svg"),
  4: require("images/foodoasis.svg"),
  5: require("images/foodoasis.svg"),
  6: require("images/foodoasis.svg"),
};

// const logoStackedPaths = {
//   1: require("images/logo-food-oasis-stacked.svg"),
//   2: require("images/logo-food-oasis-stacked.svg"),
//   3: require("images/logo-food-oasis-stacked.svg"),
//   4: require("images/logo-food-oasis-stacked.svg"),
//   5: require("images/logo-food-oasis-stacked.svg"),
//   6: require("images/logo-food-oasis-stacked.svg"),
// };

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
  const {
    logoPath,
    alt,
    className,
    logoStyle,
    captionText,
    name,
    url,
    maintainers,
    type,
  } = props;
  const classes = useStyles();

  if (type === "maintainer") {
    if (!maintainers?.length) return null;
    return (
      <div className={classes.footerSectionContainer}>
        <div className={classes.footerCaption}>{captionText}</div>
        {maintainers.map((maintainer) => {
          const logoMaintainerPath = maintainer.path?.default;
          const imageType = logoMaintainerPath
            ? logoMaintainerPath.split(".").pop()
            : "unknown";

          return (
            <div style={{ marginLeft: 10 }} key={maintainer.name}>
              {logoMaintainerPath ? (
                <a
                  href={maintainer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoMaintainerPath}
                    className={className || classes.logo}
                    style={
                      imageType === "svg"
                        ? {
                            ...logoStyle,
                            width: "100%",
                            height: "100%",
                            margin: 0,
                          }
                        : { ...logoStyle }
                    }
                    alt={`${maintainer.name} Logo`}
                  />
                </a>
              ) : (
                <a
                  href={maintainer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {maintainer.name}
                </a>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const imageType = logoPath ? logoPath.default.split(".").pop() : "unknown";

  return (
    <div className={classes.footerSectionContainer}>
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

function WidgetFooter() {
  const [mobile, setMobile] = useState(null);
  const { tenantId, tenantDetails } = useSiteContext();
  const { maintainers } = tenantDetails;
  const classes = useStyles();

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  return (
    <div position="sticky" className={classes.container}>
      <WidgetFooterSection
        name="Food Oasis"
        logoPath={logoPaths[tenantId]}
        url={`${window.location.origin}`}
        alt="Food Oasis Logo"
        className={classes.logo}
      />
      <WidgetFooterSection
        type="maintainer"
        maintainers={maintainers}
        captionText="A project by"
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
  type: PropTypes.string,
};

WidgetFooterSection.defaultProps = {
  name: "Food Oasis",
  captionText: "",
  logoPath: undefined,
  alt: undefined,
  url: "",
  className: undefined,
  style: {},
  type: "primary",
};

export default WidgetFooter;
