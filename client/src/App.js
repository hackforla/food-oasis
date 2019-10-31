import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import { OutlinedFlagOutlined } from "@material-ui/icons";

const styles = {
  app: {
    color: "black",
    backgroundColor: "#FAEBD7"
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
  });

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
        <Switch>
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
          <Route path="/login">
            <Login key={JSON.stringify(user)} user={user} setUser={onLogin} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
