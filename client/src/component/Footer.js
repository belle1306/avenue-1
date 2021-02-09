import React from "react";
import classes from "./Footer.css";

const footer = () => (
        <div className={classes.Footer}>
            <blockquote className="blockquote">
                <p className="text-center p-3">This is a student project that was created at CodeOp Techsprint, a full stack development bootcamp in Malaysia.</p>
                <footer className="blockquote-footer">By Team Vision &nbsp; jas4gan@gmail.com &nbsp; lillian.kimleng@gmail.com<cite title="Email"></cite></footer>
            </blockquote>
        </div>
);

export default footer;
