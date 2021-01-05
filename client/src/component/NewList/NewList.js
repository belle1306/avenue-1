import React from "react";

const newlist = (props) => {
    console.log(props.owners)
    const ownerSummary = props.owners.map(o => {
        return (
            <div key={o.id}>
                <input type="text" defaultValue={o.owner_firstName}/>
            </div>
        );
    });
    
    return (
        <div>
            <h5>Add Property...</h5>
                Address
                <input type="text"/>
                Postcode
                <input type="text"/>
                Bedroom
                <input type="text"/>
                Bathroom
                <input type="text"/>
                Carpark
                <input type="text"/>
                Furnish
                <input type="text"/>
                Owned by
                {ownerSummary}
                <button>Add</button>
                <button>Cancel</button>
        </div>
    );
};

export default newlist;