import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from './component/Nav';
// import Nav from './component/NavLoggedIn';
import Manager from './component/Manager';
import Login from './component/Login';
import Owner from './component/Owner';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from "./hoc/ProtectedRoute";
// import classes from "./component/Nav.module.css";
// import ProtectedRoute from "./auth/protected-route";
import bgVideo from "./assets/images/pexels_02.mp4";
import Logo from "./component/Logo/Logo";
import Footer from "./component/Footer";
import FacebookLogin from 'react-facebook-login';

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState(null);
  const [isManager, setManager] = useState(false);
  const [isOwner, setOwner] = useState(false);
  const [oId, setId] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const MANAGER_EMAIL = "lilliantoh111@hotmail.com";

  useEffect(() => {
    console.log(isOwner, "isOwner at start");
    fetch("/propertymgmt/owners")  // should only happen for data.email
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.email = "";
        setCurrentData(data)
        console.log(currentData, "<<< state after set state");
      })
    currentData.map(d => {
      console.log(data.email, " from fb is compared with ", d.owner_email);
      if (d.owner_email === data.email) {
        setId(d.id);
      } else {
        console.log("NOT FOUND");
      }
    });
  }, [isOwner])

  const logoutFacebook = (response) => {
    setData(response);
    if (response.accessToken) {
      setLogin(false);
      setManager(false);
      setOwner(false);
      setId(null);
    }
  };

  const responseFacebook = (response) => {
    console.log(response, "r u here");
    if (response.status !== 'unknown') {
      setData(response);
      if (response.accessToken) {
        setLogin(true);
        (response.email === MANAGER_EMAIL) ?
          setManager(true) : setOwner(true);
      } else {
        setLogin(false);
      }
    };
  };

  return (
    <div>
      <Router>
        <Nav oId={oId} />
        <div className="text-end m-3">
          {!login &&
            <FacebookLogin
              appId="845362466033294"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              cssClass="kep-login-facebook kep-login-facebook-small"
              textButton=" Login"
              icon="fa-facebook" />
          }
          {login &&
            <FacebookLogin
              appId=""
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={logoutFacebook}
              cssClass="kep-login-facebook kep-login-facebook-small"
              textButton=" Logout"
              icon="fa-facebook" />
          }
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/manager" component={isManager ? Manager : Home} />
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/owner/:id" component={isOwner ? Owner : OwnerHome} />
        </Switch>
      </Router>
    </div>
  );
};

const Home = () => (
  <div>
    <video autoPlay loop muted id="background-video">
      <source src={bgVideo} type='video/mp4' />
    </video>
    <div className="text-position">
      <h1 className="display-1 text-center"><Logo />Avenue</h1>
      <h3 className="display-6 text-center">A Vision for Property Management</h3>
    </div>
  </div>
);

const OwnerHome = () => (
  <div>
    <div className="text-position" id="ownerHomeimg">
      <h2 className="display-2 text-end">You're not on Avenue yet, &nbsp;</h2>
      <div className="text-end m-3">
        <a className="btn btn-danger btn-lg text-light" href="/">but you're one step away.</a>
      </div>
    </div>
    <Footer />
  </div>
);

export default App;