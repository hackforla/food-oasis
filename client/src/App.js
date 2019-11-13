import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/materialUI";
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
import ConfirmEmail from "./components/ConfirmEmail";

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

  const [toast, setToast] = useState({ message: "" });

  const onLogin = user => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
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
              <Register setToast={setToast} />
            </Route>
            <Route path="/confirm/:token">
              <ConfirmEmail setToast={setToast} />
            </Route>
            <Route path="/login/:email?">
              <Login user={user} setUser={onLogin} setToast={setToast} />
            </Route>
          </Switch>
          <Footer />
          <Toast toast={toast} setToast={setToast} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
