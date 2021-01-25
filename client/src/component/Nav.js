import React from "react";
// import "./App.css";
import {Link} from'react-router-dom';
import Logo from "./Logo/Logo";
import Facebook from './Facebook';
<<<<<<< HEAD

function Nav(props) {
    return (
    <header>
        <nav className="nav">
            <ul className="nav-links">
                <Logo />
                <Link to="/manager">
                    <li>Manager</li>
                    <h1 className="text-white m-4">Avenue</h1>
                    <button className="btn btn-danger text-white m-4" onClick={props.newbtn}>New</button>
                    <button className="btn btn-danger text-white m-4" onClick={props.calculatebtn}>Rent Calculator</button>
                    <button className="btn btn-danger text-white" onClick={props.logoutbtn}>Log out</button>
                </Link> 
                <Facebook />
            </ul>
        </nav>
    </header>
=======
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
>>>>>>> 255c3fd9a16313692b4a8a66106fd0f9e870ea26
    );
}

export default Nav;