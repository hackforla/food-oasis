import React from "react";
import { Box } from "@mui/material";

const DesktopLayout = ({ filters, list, map }) => {

  return (
    <>
      {filters}
      <Box 
        sx={{ 
          flex: "auto",
          overflowY: "hidden",
          display: "flex",
        }}>
        <Box 
          sx={{
            width: "35%",
            overflow: "auto",            
          }}>
          {list}
        </Box>
        <Box 
          sx={{
            height: "100%",
            flex: 1,
          }}>
          {map}
        </Box>
      </Box>
    </>
  );
};

export default DesktopLayout;
