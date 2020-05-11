import React from "react";
import logo from "../images/fola.svg";
const styles = {
  logo: {
    height: "10vmin"
  },
  main: {
    minHeight: "95vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    textAlign: "center"
  },
  title: {
    fontSize: "2rem"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "300px"
  },
  description: {
    width: "100%",
    fontSize: "1.2rem"
  }
};
export default function Main() {
  return (
    <main style={styles.main}>
      <img src={logo} style={styles.logo} alt="logo" />
      <h3 style={styles.title}>Food Oasis Los Angeles</h3>
      <section style={styles.container}>
        <article style={styles.description}>
          Food Oasis LALA (FOLA) shows you places to find healthy food in Los
          Angeles - whether you are looking to buy, grow, or need access to free
          food.
        </article>
      </section>
    </main>
  );
}
