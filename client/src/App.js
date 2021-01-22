import React from "react";
// import "./App.css";
import Nav from './component/Nav';
import Manager from './component/Manager';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
<<<<<<< HEAD
=======
import classes from "./component/Nav.module.css";
>>>>>>> 255c3fd9a16313692b4a8a66106fd0f9e870ea26

function App() {
    return (
      <Router>
<<<<<<< HEAD
        <div>
=======
>>>>>>> 255c3fd9a16313692b4a8a66106fd0f9e870ea26
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/manager" component={Manager}/>
            </Switch>
<<<<<<< HEAD
        </div>
=======
>>>>>>> 255c3fd9a16313692b4a8a66106fd0f9e870ea26
      </Router>
    );
}

const Home = ()=> (
<<<<<<< HEAD
  <div>
    <h1>Home Page</h1>
=======
  <div className={classes.bg}>
    <h1>Company Announcement</h1>
    <h1>Property News</h1>
>>>>>>> 255c3fd9a16313692b4a8a66106fd0f9e870ea26
  </div>
);

export default App;