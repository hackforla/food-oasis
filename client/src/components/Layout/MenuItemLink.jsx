import { ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItemLink = ({ to, text, userSection, onClick }) => {
  const location = useLocation();
  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
