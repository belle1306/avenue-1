import React from "react";
import Select from "react-select";

// const getInputValue = () => {
//     let inputValue = {
//         "property_address" : document.getElementById("property_address"),
//         "property_postcode": document.getElementById("property_postcode")
//     }
    
//     return inputValue
// }

const newlist = (props) => {

    let ownerSummary = props.owners.map(o => {
        return {value: o.id, label: o.owner_firstName}
    });

    return (
        <div>
            <h5>Add Property...</h5>
            <form>
                <label>Address</label>
                <input type="text" id = "property_address" onChange={props.update}/>
                <label>Postcode</label>
                <input type="text" id = "property_postcode" onChange={props.update}/>
                <label>Bedroom</label>
                <input type="number" onChange={props.update}/>
                <label>Bathroom</label>
                <input type="number" onChange={props.update}/>
                <label>Carpark</label>
                <input type="number" onChange={props.update}/>
                <label>Furnish</label>
                <input type="radio" onChange={props.update}/>
                <label>Owned by</label>
                <Select options = {ownerSummary} />
                <button onClick = {props.add}>Add</button>
                <button onClick = {props.cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default newlist;