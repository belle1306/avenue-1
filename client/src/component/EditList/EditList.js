import React from "react";
import Select from "react-select";
import Drop from "../Drop";

class EditList extends React.Component {
    constructor(props) {
        super(props);
        console.log("THIS IS THE EDIT LIST PROPS", props)
        this.state = {
            // address:props.property.property_address,
            // postcode: "",
            // bedroom: 0,
            // bathroom: 0,
            // carpark: 0,
            // furnish: 0,
            // rent: 0,
            // rentWeek: 0,
            // owner: null,
        };
    }
    // state = {
    //     address: this.props.property.property_address
    // }
    handleSave(e) {
        e.preventDefault();
        // this.props.update({
        //     id: this.state.id,
        //     address: this.state.address,
        //     postcode: this.state.postcode,
        //     bedroom: this.state.bedroom,
        //     bathroom: this.state.bathroom,
        //     carpark: this.state.carpark,
        //     furnish: this.state.furnish,
        //     owner: this.state.owner
        // })
        console.log("this is what we are sending",this.state)
    }

    // updateList(e) {
    //     console.log("this is what im trying to bind", e.target.value)
    //     let updatedAddress = Object.assign({}, this.state.property.property_address);
    //     updatedAddress[e.target.value] = e.target.value;
    //     this.setState({
    //         address: e.target.value
    //     })
    // }

    render() {
        // console.log("THIS IS THE OWNER ID STATE", this.state.address)
        let ownerSummary = this.props.owners.map(o => {
            return {value: o.id, label: o.owner_firstName + " " + o.owner_lastName}
        });
            return (
        <div>
            <form className="form-inline">
                <div className="form-group mb-2"> 
                    <div>
                        <label>Address</label>
                        <input type="text" className="form-control" 
                        defaultValue={this.props.property.property_address} 
                        onChange={e => this.setState({ address: e.target.value})}
                        // onChange={(e) => this.updateList(e) }
                        />
                        <label>Postcode</label>
                        <input type="text" className="form-control" defaultValue={this.props.property.property_postcode} onChange={e => this.setState({ postcode: e.target.value})}/>
                    </div>
                </div>
                
                <Drop />

                <div className="form-group mb-2"> 
                    <label>Bedroom</label>
                    <input type="number" className="form-control" defaultValue={this.props.property.property_bedroom} onChange={e => this.setState({ bedroom: e.target.value})}/>
                </div>
                <div className="form-group mb-2">
                    <label>Bathroom</label>
                    <input type="number" className="form-control" defaultValue={this.props.property.property_bathroom} onChange={e => this.setState({ bathroom: e.target.value})}/>
                </div>
                <div className="form-group mb-2">
                    <label>Carpark</label>
                    <input type="number" className="form-control" defaultValue={this.props.property.property_carpark} onChange={e => this.setState({ carpark: e.target.value})}/>
                </div>                      

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" defaultChecked={this.props.property.property_furnish} onChange={e => this.setState({ furnish: e.target.checked ? 1 : 0})}/>
                    <label>Furnished</label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" defaultChecked={this.props.property.property_rent} onChange={e => this.setState({ rent: e.target.checked ? 1 : 0})}/>
                    <label>Rented</label>
                    <input type="number" defaultValue={this.props.property.property_rentWeek} onChange={e => this.setState({ rentWeek: e.target.value})}/>
                    <label>weekly</label>
                </div>
                
                <div>
                    <label>Owned by</label>
                    <Select 
                        options = {ownerSummary} 
                        value = {ownerSummary.filter((e) => e.value === this.props.property.owner_id)}
                        onChange={e => this.setState({ owner: e.value})}/>
                </div>

                <input type="submit" className="btn btn-primary" onClick={e => this.handleSave(e)}/>
                <input type="reset" className="btn btn-dark" onClick={this.props.cancel}/>
            </form>
        </div>
    );
    
    }
}

export default EditList;