import React from "react";
<<<<<<< HEAD
import Logo from "../../Logo/Logo";
import Facebook from '../../Facebook';
=======
// import Logo from "../../Logo/Logo";
// import Facebook from '../../Facebook';

>>>>>>> 255c3fd9a16313692b4a8a66106fd0f9e870ea26

const toolbar = (props) => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-danger bg-danger ml-auto">
            {/* <Logo />
            <h1 className="text-white m-4">Avenue</h1> */}
            <button className="btn btn-danger text-white m-4" onClick={props.newbtn}>New</button>
            <button className="btn btn-danger text-white m-4" onClick={props.calculatebtn}>Rent Calculator</button>
            {/* <button className="btn btn-danger text-white" onClick={props.logoutbtn}>Log out</button> */}
            {/* <Facebook /> */}
        </nav>
    </header>
);

export default toolbar;