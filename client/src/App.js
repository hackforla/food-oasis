import React, { useState } from "react";
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
  const [user, setUser] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: ""
  });

  return (
    <Router>
      <div style={styles.app}>
        <Header user={user} setUser={setUser} />
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
            <Login key={user.email} setUser={setUser} />
          </Route>
        </Switch>
        <Footer user={user} setUser={setUser} />
      </div>
    </Router>
  );
}

export default App;
