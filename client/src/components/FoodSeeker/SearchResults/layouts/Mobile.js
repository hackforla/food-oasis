import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import Draggable from "react-draggable";

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  zIndex: 1000,
};

const MobileLayout = ({ filters, map, list, preview, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!details) setShowDetails(false);
  }, [details]);

  const show = useCallback(() => setShowDetails(true), []);

  // Define the bounds for vertical dragging
  const minY = 50; // Minimum Y position (30% of viewport height)
  const maxY = 800; // Maximum Y position (35% of viewport height)


  return (
    <>
      {filters}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1 }}>{map}</Box>
        {list && (
          <Draggable
          bounds={{ top: minY, bottom: window.innerHeight  - 300 }}
          defaultPosition={{ x: 0, y: minY * (window.innerHeight / 100) }}
          axis="y">
            <Box sx={overlay}>{list}</Box>
          </Draggable>
        )}
        {preview && (
          <Box sx={{ margin: "0 1em", flex: 0 }} onClick={show}>
            {preview}
          </Box>
        )}
        {details && showDetails && <Box sx={overlay}>{details}</Box>}
      </Box>
    </>
  );
};

export default MobileLayout;
