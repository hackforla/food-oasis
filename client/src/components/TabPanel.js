import React from "react";
import { Box, Typography } from "@material-ui/core";

export function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tab-${index}`
  };
}

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
