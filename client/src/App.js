import React from "react";
import "./App.css";
import Nav from './component/Nav';
// import Nav from './component/NavLoggedIn';
import Manager from './component/Manager';
import Login from './component/Login';
import Owner from './component/Owner';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import classes from "./component/Nav.module.css";
// import ProtectedRoute from "./auth/protected-route";
import bgVideo from "./assets/images/pexels_02.mp4";
import Logo from "./component/Logo/Logo";
import notLoggedIn from "./assets/images/notLoggedIn.png";
import Footer from "./component/Footer";

function App() {
    return (
      <Router>
            {/* (isLoggedIn) ? <NavLoggedIn /> : <Nav /> */}
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/owner" exact component={OwnerHome}/>
              <Route path="/manager" component={Manager}/>
              <Route path="/login" component={Login} />
              {/* <ProtectedRoute exact path="/owner/:id" component={Owner} /> */}
              <Route path="/owner/:id" component={Owner} />
            </Switch>
      </Router>
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
        <button id="btn-redirect" className="btn btn-danger btn-lg text-light mt-3">but you're one step away.</button>      
    </div>
    <Footer />
  </div>
);

export default App;