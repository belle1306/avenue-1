import React from "react";
import Select from "react-select";
import Drop from "../Drop";

class EditList extends React.Component {
    constructor(props) {
        super(props);
        // const [address , postcode] = this.props.property;
        // console.log("constructor owners", props.owners);
        this.state = {
            id: this.props.property.id,
            address: this.props.property.property_address,
            postcode: this.props.property.property_postcode,
            bedroom: this.props.property.property_bedroom,
            bathroom: this.props.property.property_bathroom,
            carpark: this.props.property.property_carpark,
            furnish: this.props.property.property_furnish,
            rent: this.props.property.property_rent,
            rentWeek: this.props.property.property_rentWeek,
            owner: this.props.property.owner_id
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFormSave = this.handleFormSave.bind(this);
        // console.log("checkbox", this.state.furnish);
    }

    handleFieldChange(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name
        this.setState({
            [name] : value 
        });
    }

    handleFormSave(e) {
        e.preventDefault();
        console.log("handleFormSave FURNISH", this.state.furnish);
        this.props.update({
            id: this.state.id,
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
        // console.log("handleFormSave sends this",this.state);
    }

    render() {
        let ownerSummary = this.props.owners.map(o => {
            return {value: o.id, label: o.owner_firstName + " " + o.owner_lastName}
        });
        
        console.log("render owner id", this.state.owner);

        return (
            
            <div>
                {console.log("return",this.props.property)}

                <form className="form-inline" onSubmit={this.handleFormSave}>
                    <div className="form-group mb-2"> 
                        <div>
                            <label>Address</label>
                            <input type="text" name="address" className="form-control" value={this.state.address} onChange={this.handleFieldChange}
                            />
                            <label>Postcode</label>
                            <input type="text" name="postcode" className="form-control" value={this.state.postcode} onChange={this.handleFieldChange}/>
                        </div>
                    </div>
                    
                    <Drop />

                    <div className="form-group mb-2"> 
                        <label>Bedroom</label>
                        <input type="number" name="bedroom" className="form-control" value={this.state.bedroom} onChange={this.handleFieldChange}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Bathroom</label>
                        <input type="number" name="bathroom" className="form-control" value={this.state.bathroom} onChange={this.handleFieldChange}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Carpark</label>
                        <input type="number" name="carpark" className="form-control" value={this.state.carpark} onChange={this.handleFieldChange}/>
                    </div>                      
                    <div className="form-check">
                        <input type="checkbox" name="furnish" className="form-check-input" checked={this.state.furnish} onChange={this.handleFieldChange}/>
                        <label>Furnished</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="rent" className="form-check-input" checked={this.state.rent} onChange={this.handleFieldChange}/>
                        <label>Rented</label>
                        <input type="number" name="rentWeek" value={this.state.rentWeek} onChange={this.handleFieldChange}/>
                        <label>weekly</label>
                    </div>                 
                    <div>
                        <label>Owned by</label>
                        <Select 
                            options = {ownerSummary} 
                            name="owner"
                            value = {ownerSummary.filter((e) => e.value === this.state.owner)}
                            onChange={e => this.setState({ owner: e.value})}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={e => this.handleFormSave(e)}>Save</button>
                    <input type="reset" className="btn btn-dark" onClick={this.props.cancel}/>
                </form>
            </div>
        );
    }
}

export default EditList;