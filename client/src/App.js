import React from "react";
// import "./App.css";
import Nav from './component/Nav';
import Manager from './component/Manager';
import Landing from './component/Landing';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import classes from "./component/Nav.module.css";

function App() {
    return (
      <Router>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/manager" component={Manager}/>
              <Route path="/landing" component={Landing}/>
            </Switch>
      </Router>
    );
}

const Home = ()=> (
  <div className={classes.bg}>
    <h1>What PM sees when first logged in</h1>
    <h1>Welcome Property Manager!</h1>
    <h1>Property News</h1>
    <h1>Company announcement</h1>
  </div>
);

export default App;