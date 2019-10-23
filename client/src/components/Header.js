<<<<<<< HEAD
import React from "react";
import Menu from "./Menu";
import logo from "../images/fola.svg";

const styles = {
  header: {
    display: "flex",
    alignItems: "top",
    minHeight: "3rem",
    width: "100%",
    color: "blanchedalmond",
    top: "0",
    position: "sticky",
  },
  logo: {
    width: "4rem",
    height: "2.5rem",
    margin: ".5rem .75rem",
  },
};

export default function Header() {
  return (
    <header style={styles.header}>
      <Menu />
      <img src={logo} style={styles.logo} alt="logo" />
    </header>
  );
}
||||||| merged common ancestors
=======
import React from "react";
import Menu from "./Menu";
import logo from "../images/fola.svg";

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

export default function Header() {
  return (
    <header style={styles.header}>
      <Menu />
      <img src={logo} style={styles.logo} alt="logo" />
    </header>
  );
}
>>>>>>> 323428fc70c1cb9150a85c660951fa3461e5610d
