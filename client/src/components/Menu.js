import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItemLink from "./MenuItemLink";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  menuButton: {
    padding: "1rem"
  }
});

export default function Menu() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

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
        {[
          "Map",
          "Stakeholders",
          "Donate",
          "FAQs",
          "News",
          "Resources",
          "Organizations",
          "About",
          "Team"
        ].map((text, index) => {
          const route = text.toLowerCase();

          return <MenuItemLink key={index} to={`/${route}`} text={text} />;
        })}
        <MenuItemLink key="Register" to="/register" text="Register" />
        <MenuItemLink key="Login" to="/login" text="Login" />
      </List>
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
