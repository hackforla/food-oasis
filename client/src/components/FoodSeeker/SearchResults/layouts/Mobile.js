import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";

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
        {list && <Box sx={overlay}>{list}</Box>}
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
