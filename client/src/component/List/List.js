import React from "react";

const List = (props) => {
    const propertySummary = props.properties.map(p => {
        return (
            <ul key={p.id}>
                <li> Address: {p.property_address} </li>
                <li> Postcode: {p.property_postcode} </li>
                <li> Bedroom: {p.property_bedroom} </li>
                <li> Bathroom: {p.property_bathroom} </li>
                <li> Carpark: {p.property_carpark} </li>
                <li> Furnishing: {p.property_furnish} </li>
                <li> Photo:</li>
            </ul>
        );
    });
    
    return (
        <div>
             <h3>Summary</h3>
             <div>
                 {propertySummary}
             </div>
             <p>Submit</p>
        </div>
    );
};

export default List;