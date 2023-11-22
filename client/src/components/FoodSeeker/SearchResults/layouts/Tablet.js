import { Box } from "@mui/material";

const TabletLayout = ({ filters, list, map }) => {
  return (
    <>
      {filters}
      <Box sx={{ height: "100%", overflow: "hidden" }}>
        <Box sx={{ height: "50%" }}>{map}</Box>
        <Box sx={{ height: "50%", overflow: "auto" }}>{list}</Box>
      </Box>
    </>
  );
};

export default TabletLayout;
