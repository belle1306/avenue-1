import React from "react";
import Select from "react-select";
import Drop from "../Drop";

class EditList extends React.Component {
    constructor(props) {
        super(props);
        const [address , postcode] = this.props.property;
        this.state = {
            address: address.property_address,
            postcode: postcode.property_postcode
            // bedroom: this.props.property.property_bedroom,
            // bathroom: this.props.property.property_bathroom,
            // carpark: this.props.property.property_carpark,
            // furnish: this.props.property.property_furnish,
            // rent: this.props.property.property_rent,
            // rentWeek: this.props.property.property_rentWeek,
            // owner: this.props.property.owner_id
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFormSave = this.handleFormSave.bind(this);
        console.log("constructor", this.props.property);
    }


    handleFieldChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleFormSave(e) {
        e.preventDefault();
        this.props.update({
            // id: this.state.id,
            address: this.state.address,
            postcode: this.state.postcode,
            bedroom: this.state.bedroom,
            bathroom: this.state.bathroom,
            carpark: this.state.carpark,
            furnish: this.state.furnish,
            rent: this.state.rent,
            rentWeek: this.state.rentWeek,
            owner: this.state.owner
        })
        console.log("THIS IS WHAT WE ARE SENDING AFTER SAVING",this.state)
    }

    render() {
        // let ownerSummary = this.props.owners.map(o => {
        //     return {value: o.id, label: o.owner_firstName + " " + o.owner_lastName}
        // });
    
        console.log("we are finding this list!!!", this.props);

        // const editProperty = this.props.property.map(e => {
        //     return (
        //         <ListItem key = {e.id}
        //         property = {e}
        //         // owners = {e.owner}
        //         update = {() => this.props.update(e.id)}
        //         />
        //     )
        // })

        console.log("render", this.props);
        return (
            
            <div>
                {/* {editProperty} */}
                <form className="form-inline" onSubmit={this.handleFormSave}>
                    <div className="form-group mb-2"> 
                        <div>
                            <label>Address</label>
                            <input type="text" name="address" className="form-control" value={this.state.address} defaultValue={this.props.property.property_address} onChange={this.handleFieldChange}
                            />
                            <label>Postcode</label>
                            <input type="text" name="postcode" className="form-control" value={this.state.postcode} onChange={this.handleFieldChange}/>
                        </div>
                    </div>
{/*                     
                    <Drop />

                    <div className="form-group mb-2"> 
                        <label>Bedroom</label>
                        <input type="number" name="bedroom" className="form-control" value={this.state.bedroom} onChange={e => this.setState({ bedroom: e.target.value})}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Bathroom</label>
                        <input type="number" name="bathroom" className="form-control" value={this.state.bathroom} onChange={e => this.setState({ bathroom: e.target.value})}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Carpark</label>
                        <input type="number" name="carpark" className="form-control" value={this.state.carpark} onChange={e => this.setState({ carpark: e.target.value})}/>
                    </div>                      
                    <div className="form-check">
                        <input type="checkbox" name="furnish" className="form-check-input" value={this.state.furnish} onChange={e => this.setState({ furnish: e.target.checked ? 1 : 0})}/>
                        <label>Furnished</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="rent" className="form-check-input" value={this.state.property_rent} onChange={e => this.setState({ rent: e.target.checked ? 1 : 0})}/>
                        <label>Rented</label>
                        <input type="number" name="rentWeek" value={this.state.property_rentWeek} onChange={e => this.setState({ rentWeek: e.target.value})}/>
                        <label>weekly</label>
                    </div>                 
                    <div>
                        <label>Owned by</label>
                        <Select 
                            options = {ownerSummary} 
                            name="owner"
                            value = {ownerSummary.filter((e) => e.value === this.props.property.owner_id)}
                            onChange={e => this.setState({ owner: e.value})}/>
                    </div> */}
                    <input type="submit" className="btn btn-primary" onClick={e => this.handleFormSave(e)}/>
                    <input type="reset" className="btn btn-dark" onClick={this.props.cancel}/>
                </form>
            </div>
        );
    }
}

export default EditList;