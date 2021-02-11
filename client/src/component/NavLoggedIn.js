import React from "react";
import { Link } from'react-router-dom';
import Logo from "./Logo/Logo";

function NavLoggedIn() {
    return (
        <nav className="navbar navbar-expand-lg navbar-danger ml-auto">
            <ul className="nav-links">
                <Logo />
                <h1 className="text-white m-4">Avenue</h1>
                <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link></li>
                <li><Link to="/manager" style={{ textDecoration: 'none', color: 'black' }}>Manager</Link></li>
                <li><Link to="/owner/stuff"  style={{ textDecoration: 'none', color: 'black' }} >Owner</Link></li>
            </ul>
        </nav>
    );
}

export default NavLoggedIn;