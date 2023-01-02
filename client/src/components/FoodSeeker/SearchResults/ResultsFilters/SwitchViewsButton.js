import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import MapIcon from "@mui/icons-material/Map";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { styled } from "@mui/material/styles";

// Override standard button hover behavior
const SwitchButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    color: "inherit",
    backgroundColor: "inherit",
  },
}));

export default function SwitchViewsButton({ isListView, onClick, style }) {
  return (
    <SwitchButton onClick={onClick} sx={style}>
      {!isListView && (
        <>
          <FormatListBulletedIcon />
          <Typography variant="button">List</Typography>
        </>
      )}
      {isListView && (
        <>
          <MapIcon />
          <Typography variant="button">Map</Typography>
        </>
      )}
    </SwitchButton>
  );
}
