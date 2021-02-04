import React from "react";
// import Logo from "../../Logo/Logo";
// import Facebook from '../../Facebook';


const toolbar = (props) => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-danger bg-danger ml-auto float-none">
            {/* <Logo />
            <h1 className="text-white m-4">Avenue</h1> */}
            <button className="btn btn-danger text-white m-4" onClick={props.newbtn}>New</button>
            <button className="btn btn-danger text-white m-4" onClick={props.calculatebtn}>Rent Calculator</button>          
            {/* <input type="text" value={props.searchTerm} onChange={props.editSearchTerm}/> */}
            {/* <button className="btn btn-danger text-white m-4" onClick={props.signbtn}>Add Signature</button> */}
            {/* <button className="btn btn-danger text-white" onClick={props.logoutbtn}>Log out</button> */}
            {/* <Facebook /> */}
        </nav>
    </header>
);

export default toolbar;