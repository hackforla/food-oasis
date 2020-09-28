import React, { useState } from "react";
import useLocationHook from "hooks/useLocationHook";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { UserContext } from "./user-context";
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
import { logout } from "./Logout";

Menu.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
};

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuButton: {
    transform: "scale(1.6,1.5)",
    backgroundColor: "#FFF",
    padding: "0.5rem",
    minWidth: "0",
    "&:hover": {
      backgroundColor: "#FFF",
    },
  },
  blueMenu: {
    fill: "#19334D",
  },
});

export default function Menu(props) {
  const isHomePage = useLocationHook();
  const homePageStyles = {
    buttonColor: "#F1F1F1",
  };

  const defaultStyles = {
    headerColor: "#FFF",
  };
  const styles = isHomePage ? homePageStyles : defaultStyles;
  const classes = useStyles(styles);
  const { user, setUser, setToast } = props;
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

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
        onClick={() => logout(setUser, setToast, history)}
      >
        Logout
      </MenuItemLink>
    </>
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
          {(user) => (
            <>
              {user && (user.isAdmin || user.isCoordinator) ? (
                <>
                  <MenuItemLink
                    key="organizationedit"
                    to="/organizationedit"
                    text="Add New Organization"
                  />
                  <MenuItemLink
                    key="verificationadmin"
                    to="/verificationadmin"
                    text="Verification Admin"
                  />
                  <Divider />
                </>
              ) : null}
              {user && user.isDataEntry ? (
                <>
                  <MenuItemLink
                    key="verificationdashboard"
                    to="/verificationdashboard"
                    text="My Dashboard"
                  />
                  <Divider />
                </>
              ) : null}
              {user && user.isSecurityAdmin ? (
                <>
                  <MenuItemLink
                    key="securityadmindashboard"
                    to="/securityadmindashboard"
                    text="Security Admin Dashboard"
                  />
                  <Divider />
                </>
              ) : null}
            </>
          )}
        </UserContext.Consumer>

        {MENU_ITEMS.map((item, index) => {
          const { text, link } = item;
          return <MenuItemLink key={index} to={link} text={text} />;
        })}

        {user ? authedLinks : unAuthLinks}
      </List>
      {/* <LanguageChooser /> */}
    </div>
  );

  return (
    <div>
      <Button className={classes.menuButton} onClick={toggleDrawer}>
        <MenuIcon className={classes.blueMenu} />
      </Button>

      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </div>
  );
}
