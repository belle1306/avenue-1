import React from "react";
import "./App.css";
import Nav from './component/Nav';
import Manager from './component/Manager';
import Landing from './component/Landing';
import Owner from './component/Owner';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import classes from "./component/Nav.module.css";
import ProtectedRoute from "./auth/protected-route";
import bgVideo from "./assets/images/pexels_02.mp4";

function App() {
    return (
      <Router>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/manager" component={Manager}/>
              <Route path="/landing" component={Landing} />
              <ProtectedRoute path="/owner" component={Owner}/>
            </Switch>
      </Router>
    );
}

const Home = () => (
  <div>
    <video autoPlay loop muted id="background-video">
      <source src={bgVideo} type='video/mp4' />
    </video>
  </div>
);


export default App;