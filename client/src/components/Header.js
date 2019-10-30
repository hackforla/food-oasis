import React from "react";
import Menu from "./Menu";
import logo from "../images/fola.svg";
import { composeInitialProps } from "react-i18next";

const styles = {
  header: {
    display: "flex",
    alignItems: "top",
    minHeight: "3rem",
    width: "100%",
    color: "blanchedalmond",
    top: "0",
    position: "sticky"
  },
  logo: {
    width: "4rem",
    height: "2.5rem",
    margin: ".5rem .75rem"
  }
};

export default function Header(props) {
  return (
    <header style={styles.header}>
      <Menu user={props.user} setUser={props.setUser} />
      <a href="/">
        <img src={logo} style={styles.logo} alt="logo" />{" "}
      </a>
    </header>
  );
}
