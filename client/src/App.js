import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Toast from "./components/Toast";
import Header from "./components/Header";
import Main from "./components/Main";
import Map from "./components/Map";
import StakeholdersContainer from "./components/StakeholdersContainer";
import Donate from "./components/Donate";
import News from "./components/News";
import Resources from "./components/Resources";
import About from "./components/About";
import Team from "./components/Team";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Organizations from "./components/Organizations";

const styles = {
  app: {
    color: "black",
    backgroundColor: "#FAEBD7",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  mainContent: {
    margin: "0",
    paddingBottom: "50px",
    backgroundColor: "green",
    overflowY: "scroll",
    flexGrow: 1
  }
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedJson = localStorage.getItem("user");
    const userJson = JSON.stringify(user);
    if (!userJson && !storedJson) {
      return;
    } else if (userJson === storedJson) {
      return;
    } else {
      setUser(JSON.parse(storedJson));
    }
  }, [user, setUser]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onLogin = user => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUser(user);
  };

  return (
    <Router>
      <div style={styles.app}>
        <Header user={user} setUser={onLogin} />
        <Switch style={styles.mainContent}>
          <Route exact path="/">
            <StakeholdersContainer />
          </Route>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/stakeholders">
            <StakeholdersContainer />
          </Route>
          <Route path="/donate">
            <Donate />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/organizations">
            <Organizations />
          </Route>
          <Route path="/login">
            <Login
              key={JSON.stringify(user)}
              user={user}
              setUser={onLogin}
              setToastOpen={setToastOpen}
              setToastMessage={setToastMessage}
            />
          </Route>
        </Switch>
        <Footer />
        <Toast
          snackbarOpen={toastOpen}
          setSnackbarOpen={setToastOpen}
          snackbarMessage={toastMessage}
        />
      </div>
    </Router>
  );
}

export default App;
