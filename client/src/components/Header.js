import React from "react";
import Menu from "./Menu";
import logo from "../images/fola.svg";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Logout from "./Logout";

const styles = {
  homeLink: {
    flexGrow: 1
  },
  logo: {
    width: "3.5rem",
    height: "2.5rem",
    margin: ".5rem .75rem"
  },
  userLoggedIn: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: "1",
    minHewight: "3rem"
  },
  username: {
    color: "black"
  }
};

export default function Header(props) {
  return (
    <React.Fragment>
      <AppBar position="sticky" style={styles.header} color="inherit">
        <Toolbar>
          <Menu user={props.user} setUser={props.setUser} />
          <div style={styles.homeLink}>
            <a href="/home">
              <img src={logo} style={styles.logo} alt="logo" />{" "}
            </a>
          </div>
          {props.user ? (
            <div style={styles.userLoggedIn}>
              <Typography variant="h6" component="h1" style={styles.username}>
                {props.user.firstName}
              </Typography>
              <Logout user={props.user} setUser={props.setUser} />
            </div>
          ) : (
            <p>
              <em>Healthy Food for All Angelenos</em>
            </p>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
