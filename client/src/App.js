import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/materialUI";
import { UserContext } from "./components/user-context";
import Toast from "./components/Toast";
import Header from "./components/Header";
// import Map from './components/Map';
import StakeholdersContainer from "./components/StakeholdersContainer";
import VerificationAdmin from "./components/Verification/VerificationAdmin";
import StakeholderEdit from "./components/StakeholderEdit";
import Donate from "./components/Donate";
import Resources from "./components/Resources";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Footer from "./components/Footer";
import ConfirmEmail from "./components/ConfirmEmail";
import Faq from "./components/Faq";
import FaqEdit from "./components/FaqEdit";
import FaqAdd from "./components/FaqAdd";
import Home from "./containers/Home";
import ResultsContainer from "components/ResultsContainer";
// Temporarily unused components
// import Main from 'components/Main';
// import News from "components/News";
// import Team from "components/Team";
// import Organizations from "components/Organizations";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  app: (props) => ({
    color: "black",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: "100%",
    overflowY: "scroll",
    // backgroundColor: "rgb(144, 194, 70)"
  }),
  mainContent: {
    margin: "0",
    paddingBottom: "50px",
    overflowY: "scroll",
    flexGrow: 1,
  },
  stakeholderEditWrapper: {
    flexBasis: "90%",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  homeWrapper: {
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  verificationAdminWrapper: {
    flexBasis: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState({});
  const [toast, setToast] = useState({ message: "" });
  const [bgImg, setBgImg] = useState("");

  useEffect(() => {
    const imgNum = Math.floor(Math.random() * (21 - 1)) + 1;
    const backgroundImage = `url("/landing-page/${imgNum}.jpg")`;
    setBgImg(backgroundImage);
  }, []);

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
  }, [user, userCoordinates]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const onLogin = (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUser(user);
  };

  const fetchLocation = () => {
    let userCoordinates = { latitude: null, longitude: null };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            const userCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setUserCoordinates(userCoordinates);
          }
        },
        (error) => {
          console.log(`Getting browser location failed: ${error.message}`);
        }
      );
    } else {
      // If browser location permission is denied, the request is
      // "successful", but the result is null coordinates.
      console.log(`Enable location permission to use location-based features.`);
    }
    return userCoordinates;
  };

  const classes = useStyles();

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.app}>
            <Header user={user} setUser={onLogin} />
            <Switch className={classes.mainContent}>
              <Route exact path="/">
                <div
                  className={classes.homeWrapper}
                  style={{ backgroundImage: bgImg }}
                >
                  <Home userCoordinates={userCoordinates} />
                </div>
              </Route>
              <Route path="/map">
                <ResultsContainer userCoordinates={userCoordinates} />
                <Route path="/organizations">
                  <ResultsContainer />
                </Route>
                <Route path="/stakeholders">
                  <StakeholdersContainer
                    user={user}
                    userCoordinates={userCoordinates}
                  />
                </Route>
                <Route path="/organizationedit/:id?">
                  <div className={classes.stakeholderEditWrapper}>
                    <StakeholderEdit setToast={setToast} user={user} />
                  </div>
                </Route>
                <Route path="/verificationdashboard">
                  <div className={classes.verificationAdminWrapper}>
                    <VerificationAdmin
                      user={user}
                      userCoordinates={userCoordinates}
                      asAdmin={false}
                    />
                  </div>
                </Route>
                <Route path="/verificationadmin">
                  <div className={classes.verificationAdminWrapper}>
                    <VerificationAdmin
                      user={user}
                      userCoordinates={userCoordinates}
                      asAdmin={true}
                    />
                  </div>
                </Route>
                <Route path="/donate">
                  <Donate />
                </Route>
                {/* <Route path="/news">
                <News />
              </Route> */}
                <Route path="/resources">
                  <Resources />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                {/* <Route path="/team">
                <Team />
              </Route> */}
                <Route exact path="/faqs">
                  <Faq />
                </Route>
                <Route path="/faqs/add">
                  <FaqAdd />
                </Route>
                <Route path="/faqs/:identifier">
                  <FaqEdit setToast={setToast} />
                </Route>
                {/* <Route path="/organizations">
                <Organizations />
              </Route> */}
                <Route path="/register">
                  <Register setToast={setToast} />
                </Route>
                <Route path="/confirm/:token">
                  <ConfirmEmail setToast={setToast} />
                </Route>
                <Route path="/login/:email?">
                  <Login user={user} setUser={onLogin} setToast={setToast} />
                </Route>
                <Route path="/forgotpassword/:email?">
                  <ForgotPassword setToast={setToast} />
                </Route>
                <Route path="/resetPassword/:token">
                  <ResetPassword setToast={setToast} />
                </Route>
            </Switch>
              <Footer userCoordinates={userCoordinates} />
              <Toast toast={toast} setToast={setToast} />
          </div>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
