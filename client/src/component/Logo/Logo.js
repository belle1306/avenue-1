import React from "react";
import houseLogo from "../../assets/houselogo.png";
import classes from "./Logo.css";

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={houseLogo} alt="brand logo" width="70" height="70"/>
    </div>
);

export default logo;