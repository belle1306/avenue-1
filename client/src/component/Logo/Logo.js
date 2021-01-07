import React from "react";
import houseLogo from "../../assets/houselogo.png";
import classes from "./Logo.css";

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={houseLogo} alt="brand logo"/>
    </div>
);

export default logo;