import React from "react";
import navLogo from "../../assets/images/navLogo.png";
import classes from "./Logo.css";

const NavLogo = (props) => (
    <div className={classes.Logo}>
        <img src={navLogo} alt="brand logo" width="70" height="70"/>
    </div>
); 

export default NavLogo;