import React from "react";
import Menu from "./Menu";
import logo from "../images/fola.svg";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const styles = {
  header: {
    display: "flex",
    alignItems: "top",
    minHeight: "3rem",
    width: "100%",
    backgroundColor: "blanchedalmond"
  },
  logo: {
    width: "3.5rem",
    height: "2.5rem",
    margin: ".5rem .75rem"
  },
  username: {
    color: "black"
  }
};

export default function Header(props) {
  return (
    <React.Fragment>
      <AppBar position="sticky" style={styles.header}>
        <Toolbar>
          <Menu user={props.user} setUser={props.setUser} />
          <a href="/home">
            <img src={logo} style={styles.logo} alt="logo" />{" "}
          </a>
          {props.user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: "1",
                minHewight: "3rem"
              }}
            >
              <Typography variant="h6" component="h1" style={styles.username}>
                {props.user.firstName}
              </Typography>
              <Logout user={props.user} setUser={props.setUser} />
            </div>
          ) : (
            <Link
              key="Login"
              to="/login"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: "1",
                textDecoration: "none"
              }}
            >
              LOGIN
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar style={{ minHeight: "16px", maxHeight: "16px" }} />
    </React.Fragment>
  );
}
