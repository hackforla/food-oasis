import React from "react";
import { Button } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

export default function SwitchViewsButton({ isMapView, onClick }) {
  return (
    <Button onClick={onClick} title={`Go to ${isMapView ? "List" : "Map"}`}>
      {isMapView && (
        <>
          <span style={{ fontSize: "1rem", marginRight: ".5rem" }}>List</span>
          <FormatListBulletedIcon />
        </>
      )}
      {!isMapView && (
        <>
          <span style={{ fontSize: "1rem", marginRight: ".5rem" }}>Map</span>
          <MapIcon style={{ color: "#90C146" }} />
        </>
      )}
    </Button>
  );
}
