import React from "react";
import Auxil from "../../hoc/Auxil";
import Toolbar from "../Navigation/Toolbar/Toolbar";
//layout css?

const layout = (props) => (
    <Auxil>
        <Toolbar />   
        <main>
            {props.children}
        </main>
    </Auxil>
);
  
export default layout;