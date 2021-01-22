import React from "react";
// import "./App.css";
import {Link} from'react-router-dom';
function Nav() {
    
    return (
        <nav className="nav">
            <ul className="nav-links">
                <Link to="/manager">
                    <li>Manager</li>
                </Link>  
            </ul>
        </nav>
    );
}

export default Nav;