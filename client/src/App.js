import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Map from "./components/Map";
import Stakeholders from "./components/Stakeholders";

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
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/stakeholders">
            <Stakeholders />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
