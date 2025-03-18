import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { isMobile } from "helpers";
import { MENU_ITEMS } from "helpers/Constants";
import useLocationHook from "hooks/useLocationHook";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { IconButton } from "../UI/StandardButton";
import MenuItemLink from "./MenuItemLink";
//import LocalNotifications from "../Admin/LocalNotifications";

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
      <MenuItemLink key="login" to="/admin/login" text="Volunteer Login">
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
                  to="/admin/organizationedit"
                  text="Add New Organization"
                />
                <MenuItemLink
                  key="organizationimport"
                  to="/admin/organizationimport"
                  text="Import Organizations"
                />
                <MenuItemLink
                  key="verificationadmin"
                  to="/admin/verificationadmin"
                  text="Verification Admin"
                />
                <Divider />
              </>
            )}
            {user && user.isAdmin && (
              <>
                <MenuItemLink key="tags" to="/admin/tags" text="Tags" />
                <MenuItemLink
                  key="parentorganizations"
                  to="/admin/parentorganizations"
                  text="Parent Organizations"
                />
                <MenuItemLink
                  key="suggestions"
                  to="/admin/suggestions"
                  text="Suggestions"
                />
                <MenuItemLink
                  key="logins"
                  to="/admin/logins"
                  text="User Logins"
                />
                <MenuItemLink
                  key="localNotifications"
                  to="/admin/LocalNotifications"
                  text="LocalNotifications"
                />
                <Divider />
              </>
            )}

            {user && user.isDataEntry && (
              <>
                <MenuItemLink
                  key="verificationdashboard"
                  to="/admin/verificationdashboard"
                  text="My Dashboard"
                />
                <Divider />
              </>
            )}

            {user && (user.isSecurityAdmin || user.isGlobalAdmin) && (
              <MenuItemLink
                key="securityadmindashboard"
                to="/admin/securityadmindashboard"
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
          color: (theme) => theme.palette.common.black,
          backgroundColor: "#FFF",
          "&:hover": {
            backgroundColor: "#FFF",
            opacity: 0.8,
          },
        }}
      />
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: "250px" } }}
      >
        {sideList()}
      </Drawer>
    </div>
  );
}
