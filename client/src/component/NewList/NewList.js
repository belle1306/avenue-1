import React from "react";
import Select from "react-select";
import Drop from "../Drop";

class NewList extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            address: "",
            postcode: "",
            bedroom: 0,
            bathroom: 0,
            carpark: 0,
            furnish: 0,
            rent: 0,
            rentWeek: 0,
            owner: null,
        };
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // console.log("input values", this.state.address, this.state.owner);
        this.props.add({
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
    }

    render() {
        let ownerSummary = this.props.owners.map(o => {
            return {value: o.id, label: o.owner_firstName + " " + o.owner_lastName}
        });
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group mb-2"> 
                        <div>
                            <label>Address</label>
                            <input type="text" className="form-control" value={this.state.address} onChange={e => this.setState({ address: e.target.value})}/>
                            <label>Postcode</label>
                            <input type="text" className="form-control" value={this.state.postcode} onChange={e => this.setState({ postcode: e.target.value})}/>
                        </div>
                    </div>
                    
                    <Drop />

                    <div className="form-group mb-2"> 
                        <label>Bedroom</label>
                        <input type="number" className="form-control" value={this.state.bedroom} onChange={e => this.setState({ bedroom: e.target.value})}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Bathroom</label>
                        <input type="number" className="form-control" value={this.state.bathroom} onChange={e => this.setState({ bathroom: e.target.value})}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Carpark</label>
                        <input type="number" className="form-control" value={this.state.carpark} onChange={e => this.setState({ carpark: e.target.value})}/>
                    </div>                      

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" value={this.state.furnish} onChange={e => this.setState({ furnish: e.target.checked ? 1 : 0})}/>
                        <label>Furnished</label>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" value={this.state.rent} onChange={e => this.setState({ rent: e.target.checked ? 1 : 0})}/>
                        <label>Rented</label>
                        <input type="number" value={this.state.rentWeek} onChange={e => this.setState({ rentWeek: e.target.value})}/>
                        <label>weekly</label>
                    </div>
                    
                    <div>
                        <label>Owned by</label>
                        <Select options = {ownerSummary} onChange={e => this.setState({ owner: e.value})}/>
                    </div>

                    <input type="submit" className="btn btn-primary" onClick={e => this.handleFormSubmit(e)}/>
                    <input type="reset" className="btn btn-dark" onClick={this.props.cancel}/>

                </form>
            </div>
        );
    }
}
export default NewList;