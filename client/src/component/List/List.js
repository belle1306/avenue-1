import React from "react";

const list = (props) => {
    const propertySummary = props.properties.map(p => {
        return (
            <div key={p.id}>
                Address
                <input type="text" defaultValue={p.property_address}/>
                Postcode
                <input type="text" defaultValue={p.property_postcode}/>
                Bedroom
                <input type="text" defaultValue={p.property_bedroom}/>
                Bathroom
                <input type="text" defaultValue={p.property_bathroom}/>
                Carpark
                <input type="text" defaultValue={p.property_carpark}/>
                Furnish
                <input type="text" defaultValue={p.property_furnish}/>
            </div>
        );
    });
    
    return (
        <div>
            <h5>Editing...</h5>
            {propertySummary}
            <button>Save</button>
            <button>Cancel</button>
        </div>
    );
};
//MOVE BUTTON TO APP; WHEN CLICK SAVE, SEND PUT REQ to API
//CANCEL close modal;

export default list;