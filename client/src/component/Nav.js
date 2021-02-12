import React from "react";
import {Link} from'react-router-dom';
// import Logo from "./Logo/Logo";
import NavLogo from "./Logo/NavLogo";
// import Facebook from './Facebook';
// import AuthNav from "./auth-nav";

function Nav(props) {
    console.log(props, " printing the props yo !");
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">            
                <ul className="navbar-nav mr-5">
                    {/* <Logo /> */}
                    <h1 className="text-white">A</h1>
                    <NavLogo />
                    <h1 className="text-white m-4">Avenue</h1>
                    <li className="nav-item active mt-4 px-5"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="nav-item mt-4 px-5"><Link to="/manager" className="nav-link">Manager</Link></li>
                    <li className="nav-item mt-4 px-5"><Link to={`/owner/${props.oId}`} className="nav-link">Owner</Link></li>
                    <li className="nav-item mt-4 px-5"><Link to="/register" className="nav-link">Register</Link></li>
                </ul>
                <ul className="navbar-nav my-2 my-lg-0">
                    {/* <li className="nav-item px-5"><Facebook /></li> */}
                    {/* <li className="nav-item px-5"><AuthNav /></li> */}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;