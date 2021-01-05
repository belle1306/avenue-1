import React from "react";
import Select from "react-select";

const newlist = (props) => {
    console.log(props.owners)
    let ownerSummary = props.owners.map(o => {
        return {value: o.id, label: o.owner_firstName}
    });
    
    return (
        <div>
            <h5>Add Property...</h5>
                Address
                <input type="text" onChange={props.update}/>
                Postcode
                <input type="text" onChange={props.update}/>
                Bedroom
                <input type="number" onChange={props.update}/>
                Bathroom
                <input type="number" onChange={props.update}/>
                Carpark
                <input type="number" onChange={props.update}/>
                Furnish
                <input type="radio" onChange={props.update}/>
                Owned by
                <Select options = {ownerSummary} />
                <button onClick = {props.add}>Add</button>
                <button onClick = {props.cancel}>Cancel</button>
        </div>
    );
};

export default newlist;