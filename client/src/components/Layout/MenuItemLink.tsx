import { ListItem, ListItemText } from "@mui/material";
import React, { forwardRef, useMemo } from "react";
import { Link } from "react-router-dom";

interface MenuItemLinkProps {
  to: string;
  text: string;
  userSection?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const MenuItemLink: React.FC<MenuItemLinkProps> = ({
  to,
  text,
  userSection,
  onClick,
  children
}) => {
  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef<HTMLAnchorElement, any>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <span className={userSection ? "user-section" : ""}>
      <ListItem component={renderLink} onClick={onClick}>
        <ListItemText primary={text} />
        {children}
      </ListItem>
    </span>
  );
};

export default MenuItemLink;
