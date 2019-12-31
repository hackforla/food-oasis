import React, { useState } from "react";
import { UserContext } from "./user-context";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItemLink from "./MenuItemLink";
import LanguageChooser from "./LanguageChooser";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  menuButton: {
    padding: "0.5rem",
    minWidth: "0"
  }
});

export default function Menu(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const MENU_ITEMS = [
    "Stakeholders",
    "Donate",
    "FAQs",
    // "News",
    "Resources",
    // "Organizations",
    "About"
    // "Team"
  ];

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={e => toggleDrawer(e)}
      onKeyDown={e => toggleDrawer(e)}
    >
      <List>
        {MENU_ITEMS.map((text, index) => {
          const route = text.toLowerCase();

          return <MenuItemLink key={index} to={`/${route}`} text={text} />;
        })}
        {props.user ? null : (
          <>
            <MenuItemLink
              key="Register"
              to="/register"
              text="Register"
              userSection={true}
            />
            <MenuItemLink
              key="login"
              to="/login"
              text="Login"
              userSection={true}
            >
              Login
            </MenuItemLink>
          </>
        )}
        <UserContext.Consumer>
          {user =>
            user && user.isAdmin ? (
              <MenuItemLink
                key="stakeholderedit"
                to="/stakeholderedit"
                text="Add New Stakeholder"
              />
            ) : null
          }
        </UserContext.Consumer>
      </List>
      <LanguageChooser />
    </div>
  );

  return (
    <div>
      <Button className={classes.menuButton} onClick={toggleDrawer}>
        <MenuIcon />
      </Button>

      <Drawer open={isOpen} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </div>
  );
}
