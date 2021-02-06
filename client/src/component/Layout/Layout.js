import React from "react";
import Auxil from "../../hoc/Auxil";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
    <Auxil>
        <Toolbar
        logoutbtn={props.logoutbtn} 
        newbtn={props.newbtn}
        calculatebtn={props.calculatebtn}
        // signbtn={props.signbtn}
        />   
        <main>
            {props.children}
        </main>
    </Auxil>
);

export default layout;