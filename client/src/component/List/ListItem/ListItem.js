import React from "react";
// import classes from "./ListItem.module.css";

const listItem = (props) => {
    // console.log("this is property id in list item", props.property.id);
    console.log('props>>> ', props);

    return (
        <div className="card-group">
            <div className="card">
                <img className="card-img-top" src={props.property.property_photo} alt="house" />

                <div className="card-img-overlay">
                    <h3 className="card-title text-white">{props.property.property_address}</h3>
                    <span className="text-white">
                        {props.property.property_postcode}
                    </span>
                </div>

                <div className="card-body">
                    <div className="card-text">
                        {props.property.property_bedroom} &nbsp;
                    <i className='fas'>&#xf236;</i> &nbsp; &nbsp;
                    {props.property.property_bathroom} &nbsp;
                    <i className='fa'>&#xf2cc;</i> &nbsp; &nbsp;
                    {props.property.property_carpark} &nbsp;
                    <i className='fas'>&#xf1b9;</i>
                    </div>

                    <div>
                        Furnished {(props.property.property_furnish) ? "✓" : "X"} &nbsp;&nbsp;
                Rented {(props.property.property_rent) ? "✓" : "X"}
                    </div>

                    <div>
                        ${props.property.property_rentWeek} weekly
                    &nbsp;
                    {"•"}
                    &nbsp;
                    ${props.property.property_rentWeek * 4} monthly
                </div>

                    <div>
                        <i className='fas'>&#xf182;</i>&nbsp;
                    {props.owner}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <button onClick={props.edit} className="btn btn-primary">Edit</button>
                    <button onClick={props.delete} className="btn btn-danger">Delete</button>
                </div>

            </div>

        </div>
    )
};

export default listItem;