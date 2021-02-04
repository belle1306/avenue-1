import React from "react";
import "./App.css";
import Nav from './component/Nav';
import Manager from './component/Manager';
import Landing from './component/Landing';
import Owner from './component/Owner';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import classes from "./component/Nav.module.css";
// import ProtectedRoute from "./auth/protected-route";
import bgVideo from "./assets/images/pexels_02.mp4";
import Logo from "./component/Logo/Logo";

function App() {
    return (
      <Router>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/manager" component={Manager}/>
              <Route path="/landing" component={Landing} />
          {/* <ProtectedRoute path="/owner/:id" component={Owner} /> */}
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
        <h3 className="display-6 text-center">Property from Another Perspective</h3>
      </div>
    {/* </div> */}
  </div>
);

export default App;