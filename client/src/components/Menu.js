import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./user-context";
import useLocationHook from "hooks/useLocationHook";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { MENU_ITEMS } from "helpers/Constants";
import MenuItemLink from "./MenuItemLink";
import LanguageChooser from "./LanguageChooser";
import { logout } from "./Logout";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuButton: {
    padding: "0.5rem",
    minWidth: "0",
  },
  whiteMenu: {
    fill: "#F1F1F1",
  },
  blueMenu: {
    fill: "#336699",
  },
});

export default function Menu(props) {
  const { user } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = useLocationHook();
  const history = useHistory();
  const menuFill = isHomePage ? classes.whiteMenu : classes.blueMenu;

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
      <MenuItemLink key="Register" to="/register" text="Register" />
      <MenuItemLink key="login" to="/login" text="Login">
        Login
      </MenuItemLink>
    </>
  );

  const authedLinks = (
    <MenuItemLink
      key="logout"
      text="Logout"
      onClick={() => logout(props, history)}
    >
      Logout
    </MenuItemLink>
  );

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={(e) => toggleDrawer(e)}
    >
      <List>
        {user && (
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.firstName} />
            </ListItem>
            <Divider />
          </>
        )}
        <UserContext.Consumer>
          {(user) =>
            user && user.isAdmin ? (
              <MenuItemLink
                key="stakeholderedit"
                to="/stakeholderedit"
                text="Add New Stakeholder"
              />
            ) : null
          }
        </UserContext.Consumer>

        {MENU_ITEMS.map((item, index) => {
          const { text, link } = item;
          return <MenuItemLink key={index} to={link} text={text} />;
        })}

        {user ? authedLinks : unAuthLinks}
      </List>
      <LanguageChooser />
    </div>
  );

  return (
    <div>
      <Button className={classes.menuButton} onClick={toggleDrawer}>
        <MenuIcon className={menuFill} />
      </Button>

      <Drawer open={isOpen} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </div>
  );
}
