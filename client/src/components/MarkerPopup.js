import React from "react";
import { Popup } from "react-map-gl";

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
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={false}
      closeOnClick={true}
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
          {website && <div>{website}</div>}
        </div>
      </div>
    </Popup>
  );
}

export default MarkerPopup;
