import React from "react";
import { Popup } from "react-map-gl";
import { Link } from "@material-ui/core";
function MarkerPopup({ entity, handleClose }) {
  const {
    latitude,
    longitude,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
    website,
  } = entity;

  const getGoogleMapsUrl = () => {
    const baseUrl = `https://google.com/maps/place/`;

    const address1urlArray = address1.split(" ");
    const address1url = address1urlArray.reduce(
      (acc, currentWord) => `${acc}+${currentWord}`,
    );

    if (address2) {
      const address2urlArray = address2.split(" ");
      const address2url = address2urlArray.reduce(
        (acc, currentWord) => `${acc}+${currentWord}`,
      );
      return `${baseUrl}${address1url},+${address2url},+${zip}`;
    }

    return `${baseUrl}${address1url},+${zip}`;
  };

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={() => handleClose(false)}
      dynamicPosition={true}
      anchor="bottom"
      offsetTop={-20}
    >
      <div>
        <h4>{name}</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
          }}
        >
          {address1 && <div>{address1}</div>}
          {address2 && <div>{address2}</div>}
          {city && (
            <div>
              {city}
              {state && <span>{`, ${state}`}</span>}
              {zip && <span>{` ${zip}`}</span>}
            </div>
          )}
          {phone && <div>{phone}</div>}
          {website && (
            <Link
              href={website}
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              {website}
            </Link>
          )}
          {address1 && zip && (
            <Link
              href={getGoogleMapsUrl()}
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              {`Get Directions via Google`}
            </Link>
          )}
        </div>
      </div>
    </Popup>
  );
}

export default MarkerPopup;
