import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className="navbar navbar-dark bg-dark">
            <Logo />
        </nav>
    </header>
);

export default toolbar;