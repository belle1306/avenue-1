import React from "react";
import classes from "./ListItem.module.css";

const listItem = (props) => {
    console.log("this is property id in list item", props.property.id)
        
    return(
    <div className = {classes.ListItem}>
        <h3>{props.property.property_address}</h3>
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
        <button onClick={props.edit} className="btn btn-primary">Edit</button>
        <button onClick={props.delete} className="btn btn-danger">Delete</button>
    </div>
    )
};

export default listItem;