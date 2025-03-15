import { Alert, Box } from "@mui/material";
import { useSiteContext } from "contexts/siteContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isMobile } from "helpers";
import { TENANT_LOGO_URL } from "helpers/Constants";

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

  if (type === "maintainer") {
    if (!maintainers?.length) return null;
    return (
      <Box
        sx={(theme) => ({
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
        })}
      >
        <Box
          sx={{
            display: "inline-block",
            fontWeight: "bold",
            fontFamily: `Helvetica, Arial, "Lucida Grande", sans- serif`,
          }}
        >
          {captionText}
        </Box>

        {maintainers.map((maintainer) => {
          const logoMaintainerPath = maintainer.path;
          const imageType = logoMaintainerPath
            ? logoMaintainerPath.split(".").pop()
            : "unknown";

          return (
            <Box style={{ marginLeft: 10 }} key={maintainer.name}>
              {logoMaintainerPath ? (
                <a
                  href={maintainer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoMaintainerPath}
                    className={className}
                    style={
                      imageType === "svg"
                        ? {
                            ...logoStyle,
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            maxWidth: "175px",
                            maxHeight: "38px",
                            "&:hover": {
                              filter: "brightness(1.2)",
                            },
                          }
                        : {
                            ...logoStyle,
                            maxWidth: "175px",
                            maxHeight: "38px",
                            "&:hover": {
                              filter: "brightness(1.2)",
                            },
                          }
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
            </Box>
          );
        })}
      </Box>
    );
  }

  const imageType = logoPath ? logoPath.split(".").pop() : "unknown";

  return (
    <Box
      sx={(theme) => ({
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
      })}
    >
      {logoPath ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={logoPath}
            className={className}
            style={
              imageType === "svg"
                ? {
                    ...logoStyle,
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    maxWidth: "175px",
                    maxHeight: "38px",
                    "&:hover": {
                      filter: "brightness(1.2)",
                    },
                  }
                : {
                    ...logoStyle,
                    maxWidth: "175px",
                    maxHeight: "38px",
                    "&:hover": {
                      filter: "brightness(1.2)",
                    },
                  }
            }
            alt={alt}
          />
        </a>
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      )}
    </Box>
  );
}

function WidgetFooter() {
  const [mobile, setMobile] = useState(null);
  const { tenantDetails } = useSiteContext();
  const { maintainers } = tenantDetails;

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  return (
    <Box
      id="widgetFooter"
      position="sticky"
      sx={(theme) => ({
        backgroundColor: "#FFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "50px",
        marginBottom: 0,
        padding: "2px 0.5em",
        boxShadow: "none",
      })}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <WidgetFooterSection
          name="Food Oasis"
          logoPath={TENANT_LOGO_URL}
          url={`${window.location.origin}`}
          alt="Food Oasis Logo"
        />
        <Alert severity="warning">
          Due to the LA Fires (Jan 2025), some information may be out-of-date.
        </Alert>
      </div>
      <WidgetFooterSection
        type="maintainer"
        maintainers={maintainers}
        captionText="A project by"
        logoStyle={mobile && { maxWidth: "65px" }}
      />
    </Box>
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
