import React, { useState } from "react";
import useLocationHook from "hooks/useLocationHook";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MENU_ITEMS } from "helpers/Constants";
import MenuItemLink from "./MenuItemLink";
import { IconButton } from "../UI/StandardButton";
import { useUserContext } from "../../contexts/userContext";
import { isMobile } from "helpers";

export default function Menu() {
  const { isHomePage } = useLocationHook();
  const [isOpen, setIsOpen] = useState(false);
  const { user, onLogout } = useUserContext();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const unAuthLinks = (
    <>
      <Divider />
      <MenuItemLink key="login" to="/login" text="Volunteer Login">
        Login
      </MenuItemLink>
    </>
  );

  const authedLinks = (
    <>
      <Divider />
      <MenuItemLink
        to="/"
        key="logout"
        text="Logout"
        onClick={() => onLogout()}
      >
        Logout
      </MenuItemLink>
    </>
  );

  const sideList = () => (
    <div
      role="presentation"
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={(e) => toggleDrawer(e)}
    >
      <List>
        {user && (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.firstName} />
          </ListItem>
        )}
        <Divider />
        {
          <>
            {user && (user.isAdmin || user.isCoordinator) && (
              <>
                <MenuItemLink
                  key="organizationedit"
                  to="/organizationedit"
                  text="Add New Organization"
                />
                <MenuItemLink
                  key="organizationimport"
                  to="/organizationimport"
                  text="Import Organizations"
                />
                <MenuItemLink
                  key="verificationadmin"
                  to="/verificationadmin"
                  text="Verification Admin"
                />
                <Divider />
              </>
            )}
            {user && user.isAdmin && (
              <>
                <MenuItemLink key="tags" to="/tags" text="Tags" />
                <MenuItemLink
                  key="parentorganizations"
                  to="/parentorganizations"
                  text="Parent Organizations"
                />
                <MenuItemLink
                  key="suggestions"
                  to="/suggestions"
                  text="Suggestions"
                />
                <MenuItemLink key="logins" to="/logins" text="User Logins" />
                <Divider />
              </>
            )}

            {user && user.isDataEntry && (
              <>
                <MenuItemLink
                  key="verificationdashboard"
                  to="/verificationdashboard"
                  text="My Dashboard"
                />
                <Divider />
              </>
            )}

            {user && (user.isSecurityAdmin || user.isGlobalAdmin) && (
              <MenuItemLink
                key="securityadmindashboard"
                to="/securityadmindashboard"
                text="Security Admin Dashboard"
              />
            )}
          </>
        }
        {MENU_ITEMS.map((item, index) => {
          const { text, link } = item;
          return <MenuItemLink key={index} to={link} text={text} />;
        })}

        {user ? authedLinks : unAuthLinks}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        size={!isHomePage && isMobile ? "small" : "large"}
        icon="menu"
        onClick={toggleDrawer}
        sx={{
          transform: "scale(1.2,1.2)", 
          minWidth: "0",
          backgroundColor: "#FFF",
          '&:hover': {
            backgroundColor: "#FFF",
            opacity: 0.8,
          },
        }}
        // classes={{
        //   root: classes.menuButton,
        // }}
      />
      <Drawer 
        anchor={"right"} 
        open={isOpen} 
        onClose={toggleDrawer}
        PaperProps={{sx: {width: '250px'}}}
      >
        {sideList()}
      </Drawer>
    </div>
  );
}
