import React from "react";

const toolbarOwner = (props) => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-danger bg-danger ml-auto">
            <button className="btn btn-danger text-white m-4" onClick={props.signbtn}>Add Signature</button>
        </nav>
    </header>
);

export default toolbarOwner;