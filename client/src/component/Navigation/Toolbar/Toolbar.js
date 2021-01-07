import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className="navbar navbar-dark bg-dark">
            <Logo />
            <button className="btn btn-dark" onClick={props.newbtn}>New</button>
            <button className="btn btn-dark" onClick={props.logoutbtn}>Log out</button>
        </nav>
    </header>
);

export default toolbar;