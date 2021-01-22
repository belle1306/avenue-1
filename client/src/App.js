import React from "react";
// import "./App.css";
import Nav from './component/Nav';
import Home from './component/Home';
import Manager from './component/Manager';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
      <Router>
        <div>
            <Nav />
            <Route path="/" />
            <Route path="/manager" component={Manager}/>
        </div>
      </Router>
    );
}

// const Home = ()=>

export default App;