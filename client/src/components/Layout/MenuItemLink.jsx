import { ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useMemo } from "react";
import { Link } from "react-router-dom";

const MenuItemLink = ({ to, text, userSection, onClick }) => {
  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to]
  );

  return (
    <span className={userSection}>
      <ListItem component={renderLink} onClick={onClick}>
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
