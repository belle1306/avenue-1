import React from "react";
import ListItem from "./ListItem/ListItem";
import classes from "./List.module.css";

class List extends React.Component {

    showOwner = (owner, id) => {
        const ownerIndex = owner.findIndex(o => {
          return o.id === id;
        });
        let selectedOwner = owner[ownerIndex]
        if(selectedOwner) {
          return selectedOwner.owner_firstName + " " + selectedOwner.owner_lastName;
        }
        else {
         return null;
        }
    }

    render() {
        const propertyList = this.props.properties.map(p => {
            let selectedOwner = this.showOwner(this.props.owner, p.owner_id)
            console.log(selectedOwner)
            return (
                <ListItem key = {p.id}
                property = {p}
                delete = {() => this.props.delete(p.id)}
                owner = {selectedOwner}
                />
            )
        })
        console.log(propertyList)
        return (
            <div className={classes.List}>
            {/* <div className="card"> */}
                {propertyList}
            </div>
        );
    };
}

// const list = (props) => {
//     const propertyList = props.properties.map(p => {
//         return (
//             <ListItem 
//             property = {p}
//             delete = {props.delete}/>
//         )
//     });
//     return (
//         <div>
//             {propertyList}
//         </div>
//     )
// };
    // // ---------------------------------------------------------------------- //
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

export default List;