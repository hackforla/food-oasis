import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import Draggable from "react-draggable";

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  zIndex: 1000,
  borderRadius: '10px'
};

const MobileLayout = ({ filters, map, list, preview, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!details) setShowDetails(false);
  }, [details]);

  const show = useCallback(() => setShowDetails(true), []);

  // Define the bounds for vertical dragging
  const minY = 50; 
  const maxY = 800; 


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
          handle=".handle"
          bounds={{ top: minY, bottom: window.innerHeight  - 200 }}
          defaultPosition={{ x: 0, y: minY * (window.innerHeight / 100) }}
          axis="y">
            <Box sx={overlay}>
              <Box
              className="handle"
              sx={{
                height: 42,
                width: '90vw',
                paddingTop: '8px',
                marginX: 'auto',
                borderBottom: '1px solid #000',
              }}
              >
                <Box
                sx={{
                  width: 120,
                  height: 5,
                  margin: '0 auto',
                  background: '#D9D9D9',
                  borderRadius: '20px'
                }}
                >

                </Box>
              </Box>
              {list}
              </Box>
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
