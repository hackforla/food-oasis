import React from "react";
import { Button } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

export default function SwitchViewsButton({
  isListView,
  onClick,
  color = "primary",
  style,
}) {
  return (
    <Button onClick={onClick} style={{ color, ...style }}>
      {!isListView && (
        <>
          <FormatListBulletedIcon />
          <span style={{ fontSize: "1rem", marginRight: ".5rem" }}>List</span>
        </>
      )}
      {isListView && (
        <>
          <MapIcon />
          <span style={{ fontSize: "1rem", marginRight: ".5rem" }}>Map</span>
        </>
      )}
    </Button>
  );
}
