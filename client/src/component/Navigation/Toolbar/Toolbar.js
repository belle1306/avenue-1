import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
         
        <nav className="navbar navbar-dark bg-dark">
        <Logo />
        <button className="btn btn-dark" onClick={props.logout}>Log out</button>
        </nav>
    </header>
);

export default toolbar;