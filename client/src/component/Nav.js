import React from "react";
// import "./App.css";
import {Link} from'react-router-dom';
import Logo from "./Logo/Logo";
import Facebook from './Facebook';
import AuthNav from "./auth-nav";
// import classes from "./Nav.module.css";

function Nav() {
    return (
        // <div className={classes.bg}>
            <nav className="navbar navbar-expand-lg navbar-danger ml-auto">
                <ul className="nav-links">
                    <Logo />
                    <h1 className="text-white m-4">Avenue</h1>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link></li>
                    <li><Link to="/manager" style={{ textDecoration: 'none', color: 'black' }}>Manager</Link></li>
                    <li><Link to="/owner" style={{ textDecoration: 'none', color: 'black' }} >Owner</Link></li>
                </ul>
                <ul className="nav-links">
                    <li className="float-right"><Facebook /></li>
                    <li className="float-right"><AuthNav /></li>
                </ul>
            </nav>
        // </div>
    );
}

export default Nav;