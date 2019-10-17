import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Map from "./components/Map";
import Stakeholders from "./components/Stakeholders";
import Donate from "./components/Donate";
import News from "./components/News";
import Resources from "./components/Resources";
import About from "./components/About";
import Team from "./components/Team";

const styles = {
  app: {
    color: "black",
    backgroundColor: "#FAEBD7"
  }
};

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/stakeholders">
            <Stakeholders />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
