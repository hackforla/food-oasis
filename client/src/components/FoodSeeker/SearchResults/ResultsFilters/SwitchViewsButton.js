import React from "react";
import { Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

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
