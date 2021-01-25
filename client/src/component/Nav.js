import React from "react";
// import "./App.css";
import {Link} from'react-router-dom';
import Logo from "./Logo/Logo";
import Facebook from './Facebook';
// import classes from "./Nav.module.css";

function Nav() {
    return (
        // <div className={classes.bg}>
            <nav className="navbar navbar-expand-lg navbar-danger bg-danger ml-auto">
                <ul className="nav-links">
                    <Logo />
                    <h1 className="text-white m-4">Avenue</h1>
                    <Link to="/">
                        <li>Home</li>
                    </Link> 
                    <Link to="/manager">
                        <li>Manager</li>
                    </Link> 
                    <Facebook />
                    <Link to="/landing">
                        <li>Landing for testing</li>
                    </Link>  
                </ul>
            </nav>
        // </div>
    );
}

export default Nav;