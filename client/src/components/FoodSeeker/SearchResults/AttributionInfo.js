import React, { useState } from "react";

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
                href="https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=streets-v11&amp;access_token=pk.eyJ1IjoibHVjYXNob21lciIsImEiOiJjazFqcnRjcm0wNmZ1M2JwZXg2eDFzMXd3In0.yYpkKLrFCxF-qyBfZH1a8w#/-118.2439/34.0355/11"
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
