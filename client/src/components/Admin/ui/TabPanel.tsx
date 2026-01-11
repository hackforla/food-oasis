import { Box, Typography } from "@mui/material";
import React from "react";

export function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tab-${index}`,
  };
}

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

export function TabPanel(props: TabPanelProps) {
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
