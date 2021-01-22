import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import Facebook from '../../Facebook';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
            <Logo />
            <h1 className="text-white">Avenue</h1>
            <button className="btn btn-danger text-white m-4" onClick={props.newbtn}>New</button>
            <button className="btn btn-danger text-white" onClick={props.logoutbtn}>Log out</button>
            <Facebook />
            
        </nav>
    </header>
);

export default toolbar;