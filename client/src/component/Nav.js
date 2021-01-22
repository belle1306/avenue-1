import React from "react";
// import "./App.css";
import {Link} from'react-router-dom';
import Logo from "./Logo/Logo";
import Facebook from './Facebook';

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
    );
}

export default Nav;