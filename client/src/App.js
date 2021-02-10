
import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from './component/Nav';
// import Nav from './component/NavLoggedIn';
import Manager from './component/Manager';
import Login from './component/Login';
import Owner from './component/Owner';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import classes from "./component/Nav.module.css";
// import ProtectedRoute from "./auth/protected-route";
import bgVideo from "./assets/images/pexels_02.mp4";
import Logo from "./component/Logo/Logo";
import Footer from "./component/Footer";
import FacebookLogin from 'react-facebook-login';
import owner from "../src/assets/owner.json";
require('dotenv').config();
// const env = require("dotenv").config();
// require("dotenv").config();
// const mysql = require("mysql");
console.log(process.env, "ENV<<")

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isManager, setManager] = useState(false);
  const [isOwner, setOwner] = useState(false);
  const MANAGER_EMAIL = "lilliantoh111@hotmail.com";
  const OWNER_EMAIL = "jaseslin@gmail.com";
  // const MANAGER_EMAIL = "jaseslin@gmail.com";
  const OWNER_EMAIL_2 = "prakashnitza@gmail.com";
  const ownerEmail = owner.owners.map(e => e.email);
  const [ownerId, setOwnerId] = useState(null);
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("/propertymgmt/owners")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setState(data)
        console.log(state, "<<< state after set state");
      })
    console.log(ownerEmail, "WE WANT TO COMPARE");
    state.map(owner => {
      console.log(ownerEmail, "ownerEmail JSON in state.map");
      console.log(owner.owner_email, "owner email BACKEND in state.map");
      ownerEmail.map(oe => {
        if (oe === owner.owner_email) {
          console.log(owner.id, "owner id backend AFTER COMPARE");
          console.log(state, "state b4setOwnerId");
          console.log(ownerId, "it should be null before setting owner ID");
          setOwnerId(owner.id);
          console.log(ownerId, "state for ownerId after set. this is the problem");
          console.log(state, "state");
        };
      })
    })
  }, [isOwner])

  const responseFacebook = (response) => {
    // console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      (response.email === MANAGER_EMAIL) ?
        // (response.email === process.env.MANAGER_EMAIL) ?
        setManager(true) : setOwner(true);
    } else {
      setLogin(false);
    }
    console.log(isManager, "Manager<<");
    console.log(isOwner, "Owner<<");
    console.log(process.env.REACT_APP_MANAGER_EMAIL, "EMAIL<<");
  }
  return (
    <div>
      <Router>
        {/* (isLoggedIn) ? <NavLoggedIn /> : <Nav /> */}
        <Nav />
        <div class="container">
          <div style={{ width: '600px' }}>
            <div>
              {!login &&
                <FacebookLogin
                  appId="845362466033294"
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook" />
              }
              {login &&
                <img src={picture} roundedCircle />
              }
            </div>
            {/* {login &&
            <div>
              <div>{data.name}</div>
              <div>
                {data.email}
              </div>
            </div>
          } */}
          </div>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/manager" exact component={isManager ? Manager : Home} />
          <Route path="/login" component={Login} />
          <Route path="/owner" exact component={
            isOwner ? OwnerHome : Home} />
          <Route path={'/owner/:' + ownerId} exact component={Owner} />
        </Switch>
      </Router>
    </div>
  );
}

const Home = () => (
  <div>
    {/* <div className="video-overlay"> */}
    <video autoPlay loop muted id="background-video">
      <source src={bgVideo} type='video/mp4' />
    </video>
    <div className="text-position">
      <h1 className="display-1 text-center"><Logo />Avenue</h1>
      <h3 className="display-6 text-center">A Vision for Property Management</h3>
    </div>
    {/* </div> */}
  </div>
);

const OwnerHome = () => (
  <div>
    <div className="text-position" id="ownerHomeimg">
      <h2 className="display-2 text-end">You're not on Avenue yet, &nbsp;</h2>
      <button id="btn-redirect" className="btn btn-danger btn-lg text-light mt-3" >but you're one step away.</button>
    </div>
    <Footer />
  </div>
);


export default App;

