import { Box } from "@mui/material";
import { useSiteContext } from "contexts/siteContext";
import React, { useEffect, useState } from "react";
import { isMobile } from "helpers";
import { TENANT_LOGO_URL } from "helpers/Constants";

interface Maintainer {
  name: string;
  path?: string;
  website: string;
}

interface WidgetFooterSectionProps {
  logoPath?: string;
  alt?: string;
  className?: string;
  logoStyle?: React.CSSProperties;
  captionText?: string;
  name?: string;
  url?: string;
  maintainers?: Maintainer[];
  type?: string;
}

interface TenantDetails {
  maintainers?: Maintainer[];
}

function WidgetFooterSection(props: WidgetFooterSectionProps): React.ReactElement | null {
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
                          }
                        : {
                            ...logoStyle,
                            maxWidth: "175px",
                            maxHeight: "38px",
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
                  }
                : {
                    ...logoStyle,
                    maxWidth: "175px",
                    maxHeight: "38px",
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

function WidgetFooter(): React.ReactElement {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const { tenantDetails } = useSiteContext();
  const { maintainers } = tenantDetails;

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  return (
    <Box
      id="widgetFooter"
      component="div"
      sx={(theme) => ({
        position: "sticky",
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
      </div>
      <WidgetFooterSection
        type="maintainer"
        maintainers={maintainers}
        captionText="A project by"
        logoStyle={mobile ? { maxWidth: "65px" } : undefined}
      />
    </Box>
  );
}

export default WidgetFooter;
