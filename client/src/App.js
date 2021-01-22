import React from "react";
// import "./App.css";
import Nav from './component/Nav';
import Manager from './component/Manager';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
      <Router>
        <div>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/manager" component={Manager}/>
            </Switch>
        </div>
      </Router>
    );
}

const Home = ()=> (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;