import React from "react";
import classes from "./ListItem.module.css";

const listItem = (props) => {
    console.log("this is property id in list item", props.property.id)
        
    return(
    <div className = {classes.ListItem}>
        <h3>{props.property.property_address}</h3>
        {/* <input type="text" defaultValue={props.property.property_address} /> */}
        <div>
            Postcode: {props.property.property_postcode}
        </div>
        <div>
            Bedroom: {props.property.property_bedroom}
        </div>
        <div>
            Bathroom: {props.property.property_bathroom}
        </div>
        <div>
            Carpark: {props.property.property_carpark}
        </div>
        <div>
            Furnish: {(props.property.property_furnish) ? "yes" : "no"}
        </div>
        <div>
            Rented: {(props.property.property_rent) ? "yes" : "no"}
        </div>
        <div>
            ${props.property.property_rentWeek} weekly
            ${props.property.property_rentWeek * 52} monthly
        </div>
        <div>
            Owned by: {props.owner}
        </div>
        <button className="btn btn-primary">Edit</button>
        <button onClick={props.delete} className="btn btn-dark">Delete</button>
    </div>
    )
};
    // // ------------------------------------------------ //
    // const propertySummary = props.properties.map(p => {
    //     return (
    //         <div key={p.id}>
    //             Address
    //             <input type="text" defaultValue={p.property_address}/>
    //             Postcode
    //             <input type="text" defaultValue={p.property_postcode}/>
    //             Bedroom
    //             <input type="text" defaultValue={p.property_bedroom}/>
    //             Bathroom
    //             <input type="text" defaultValue={p.property_bathroom}/>
    //             Carpark
    //             <input type="text" defaultValue={p.property_carpark}/>
    //             Furnish
    //             <input type="text" defaultValue={p.property_furnish}/>
    //         </div>
    //     );
    // });
    
    // return (
    //     <div>
    //         <h5>Editing...</h5>
    //         {propertySummary}
    //         <button>Save Changes</button>
    //         <button>Cancel</button>
    //     </div>
    // );


//MOVE BUTTON TO APP; WHEN CLICK SAVE, SEND PUT REQ to API
//CANCEL close modal;

export default listItem;