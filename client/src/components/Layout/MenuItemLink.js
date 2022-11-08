import React, { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  background: {
    backgroundColor: "rgba(144, 194, 70)",
  },
});

const MenuItemLink = ({ to, text, userSection, onClick }) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef((itemProps, ref) => (
        <Link to={to} innerRef={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <span className={userSection && classes.background}>
      <ListItem button component={renderLink} onClick={onClick}>
        <ListItemText primary={text} />
      </ListItem>
    </span>
  );
};

MenuItemLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
  userSection: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MenuItemLink;
