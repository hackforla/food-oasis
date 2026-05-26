import { MAPBOX_ACCESS_TOKEN, DEFAULT_VIEWPORT } from "helpers/Constants";
import { useState } from "react";

const { longitude, latitude } = DEFAULT_VIEWPORT.center;
const mapFeedbackHref = `https://apps.mapbox.com/feedback/?owner=mapbox&id=streets-v11&access_token=${MAPBOX_ACCESS_TOKEN}#/${longitude}/${latitude}/11`;

const AttributionInfo = () => {
  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      {toggle ? (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "24px",
              height: "24px",
              border: "none",
            }}
            onClick={handleClick}
          >
            <svg
              style={{ backgroundColor: "white", borderRadius: "12px" }}
              width="24"
              height="24"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
            >
              <path d="M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{
                backgroundColor: "white",
                borderBottomLeftRadius: "12px",
                borderTopLeftRadius: "12px",
                width: "24px",
                height: "24px",
                border: "none",
              }}
              onClick={handleClick}
            >
              <svg
                style={{
                  backgroundColor: "white",
                  borderBottomRightRadius: "12px",
                  borderTopRightRadius: "12px",
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
              style={{
                backgroundColor: "white",
                borderTopRightRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "rgba(0,0,0,.75)",
                  marginTop: "4px",
                  fontSize: "12px",
                  marginLeft: "3px",
                }}
                href="https://www.mapbox.com/about/maps/"
                target="_blank"
                title="Mapbox"
                aria-label="Mapbox"
                rel="noopener nofollow noreferrer"
              >
                © Mapbox
              </a>
              <a
                style={{
                  textDecoration: "none",
                  color: "rgba(0,0,0,.75)",
                  marginTop: "4px",
                  fontSize: "12px",
                  marginLeft: "3px",
                }}
                href="https://www.openstreetmap.org/about/"
                target="_blank"
                title="OpenStreetMap"
                aria-label="OpenStreetMap"
                rel="noopener nofollow noreferrer"
              >
                © OpenStreetMap
              </a>
              <a
                style={{
                  textDecoration: "none",
                  color: "rgba(0,0,0,.75)",
                  marginTop: "4px",
                  fontSize: "12px",
                  marginLeft: "3px",
                  fontWeight: "700",
                  paddingRight: "5px",
                }}
                href={mapFeedbackHref}
                target="_blank"
                aria-label="Map feedback"
                rel="noopener nofollow noreferrer"
              >
                Improve this map
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttributionInfo;
