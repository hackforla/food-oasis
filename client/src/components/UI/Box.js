import React from "react";
import MaterialBox from "@mui/material/Box";
import PropTypes from "prop-types";

const Box = ({ color = "#313233", bgcolor = "#F9F9F9", children, ...rest }) => {
  return (
    <MaterialBox color={color} bgcolor="#F9F9F9" p={3} {...rest}>
      {children}
    </MaterialBox>
  );
};

Box.propTypes = {
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Box;
