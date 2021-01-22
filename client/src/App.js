import React from "react";
// import "./App.css";
import Nav from './component/Nav';
import Manager from './component/Manager';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import classes from "./component/Nav.module.css";

function App() {
    return (
      <Router>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/manager" component={Manager}/>
            </Switch>
      </Router>
    );
}

const Home = ()=> (
  <div className={classes.bg}>
    <h1>Company Announcement</h1>
    <h1>Property News</h1>
  </div>
);

export default App;