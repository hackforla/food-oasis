import React, { useState } from 'react';
import { UserContext } from './user-context';
import useLocationHook from 'hooks/useLocationHook';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import { MENU_ITEMS } from 'helpers/Constants'
import MenuItemLink from './MenuItemLink';
import LanguageChooser from './LanguageChooser';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuButton: {
    padding: '0.5rem',
    minWidth: '0',
  },
  whiteMenu: {
    fill: '#F1F1F1',
  },
  blueMenu: {
    fill: '#336699',
  },
});

export default function Menu(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = useLocationHook();
  const menuFill = isHomePage ? classes.whiteMenu : classes.blueMenu;

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={(e) => toggleDrawer(e)}
    >
      <List>
        {MENU_ITEMS.map((item, index) => {
          const { text, link } = item;
          return <MenuItemLink key={index} to={link} text={text} />;
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
