import { MAPBOX_ACCESS_TOKEN, DEFAULT_VIEWPORT } from "helpers/Constants";
import { useId, useState } from "react";

const { longitude, latitude } = DEFAULT_VIEWPORT.center;
const mapFeedbackHref = `https://apps.mapbox.com/feedback/?owner=mapbox&id=streets-v11&access_token=${MAPBOX_ACCESS_TOKEN}#/${longitude}/${latitude}/11`;

const linkStyle = {
  textDecoration: "none",
  color: "rgba(0,0,0,.75)",
  marginTop: "4px",
  fontSize: "12px",
  marginLeft: "3px",
};

const AttributionInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const linksId = useId();

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  // A single button stays mounted in both states so keyboard focus is kept
  // and screen readers announce the aria-expanded change.
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isExpanded ? "flex-end" : "flex-start",
      }}
    >
      <button
        type="button"
        aria-label="Map attribution"
        aria-expanded={isExpanded}
        aria-controls={linksId}
        style={{
          backgroundColor: "white",
          width: "24px",
          height: "24px",
          border: "none",
          ...(isExpanded
            ? { borderBottomLeftRadius: "12px", borderTopLeftRadius: "12px" }
            : { borderRadius: "12px" }),
        }}
        onClick={handleClick}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          style={{
            backgroundColor: "white",
            ...(isExpanded
              ? {
                  borderBottomRightRadius: "12px",
                  borderTopRightRadius: "12px",
                }
              : { borderRadius: "12px" }),
          }}
          width="24"
          height="24"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
        >
          <path d="M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0" />
        </svg>
      </button>
      <div
        id={linksId}
        hidden={!isExpanded}
        style={{
          backgroundColor: "white",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <a
          style={linkStyle}
          href="https://www.mapbox.com/about/maps/"
          target="_blank"
          title="Mapbox"
          aria-label="Mapbox"
          rel="noopener nofollow noreferrer"
        >
          © Mapbox
        </a>
        <a
          style={linkStyle}
          href="https://www.openstreetmap.org/about/"
          target="_blank"
          title="OpenStreetMap"
          aria-label="OpenStreetMap"
          rel="noopener nofollow noreferrer"
        >
          © OpenStreetMap
        </a>
        <a
          style={{ ...linkStyle, fontWeight: "700", paddingRight: "5px" }}
          href={mapFeedbackHref}
          target="_blank"
          aria-label="Map feedback"
          rel="noopener nofollow noreferrer"
        >
          Improve this map
        </a>
      </div>
    </div>
  );
};

export default AttributionInfo;
