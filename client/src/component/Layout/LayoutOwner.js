import React from "react";
import Auxil from "../../hoc/Auxil";
import ToolbarOwner from "../Navigation/Toolbar/ToolbarOwner";

//layout css?

const layout = (props) => (
    <Auxil>
        <ToolbarOwner
        signbtn={props.signbtn}
        />   
        <main>
            {props.children}
        </main>
    </Auxil>
);

export default layout;