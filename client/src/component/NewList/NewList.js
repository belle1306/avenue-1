import React from "react";
import Select from "react-select";
import Drop from "../Drop";

class NewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            postcode: "",
            photo: "",
            bedroom: 0,
            bathroom: 0,
            carpark: 0,
            furnish: 0,
            rent: 0,
            rentWeek: 0,
            owner: null,
        };
        this.resetInputNew = this.resetInputNew.bind(this);
        this.close = this.close.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    resetInputNew() {
        this.setState({
            address: "",
            postcode: "",
            photo: "",
            bedroom: 0,
            bathroom: 0,
            carpark: 0,
            furnish: 0,
            rent: 0,
            rentWeek: 0,
            owner: null,
        });
    };

    close() {
        this.resetInputNew();
        this.props.cancel();
    };

    handleFormSubmit(e) {
        e.preventDefault();
        // console.log("input values", this.state.address, this.state.owner);
        this.props.add({
            address: this.state.address,
            postcode: this.state.postcode,
            photo: this.state.photo,
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
                <form id="new-form" autoComplete='off' className="form-inline" onSubmit={this.handleFormSubmit}>
                    <div className="form-group mb-2"> 
                        <div>
                            <label>Address</label>
                            <input required type="text" className="form-control" value={this.state.address} onChange={e => this.setState({ address: e.target.value})}/>
                            <label>Postcode</label>
                            <input required type="text" className="form-control" value={this.state.postcode} onChange={e => this.setState({ postcode: e.target.value })} />
                            <label>URL</label>
                            <input type="text" className="form-control" value={this.state.photo} onChange={e => this.setState({ photo: e.target.value })} />
                        </div>
                    </div>
                    
                    <Drop />

                    <div className="form-group mb-2"> 
                        <label>Bedroom</label>
                        <input required type="number" min="1" className="form-control" value={this.state.bedroom} onChange={e => this.setState({ bedroom: e.target.value})}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Bathroom</label>
                        <input required type="number" min="1" className="form-control" value={this.state.bathroom} onChange={e => this.setState({ bathroom: e.target.value})}/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Carpark</label>
                        <input required type="number" min="0" className="form-control" value={this.state.carpark} onChange={e => this.setState({ carpark: e.target.value})}/>
                    </div>                      

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" value={this.state.furnish} onChange={e => this.setState({ furnish: e.target.checked ? 1 : 0})}/>
                        <label>Furnished</label>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" value={this.state.rent} onChange={e => this.setState({ rent: e.target.checked ? 1 : 0})}/>
                        <label>Rented</label>
                        <input required type="number" min="0" value={this.state.rentWeek} onChange={e => this.setState({ rentWeek: e.target.value})}/>
                        <label>weekly</label>
                    </div>
                    
                    <div>
                        <label>Owned by</label>
                        <Select validate={required} options = {ownerSummary} onChange={e => this.setState({ owner: e.value})}/>
                    </div>

                    <input type="submit" className="btn btn-primary" />
                    <button className='btn btn-danger' onClick={this.resetInputNew}>Reset</button>
                    {/* <button className='btn btn-secondary' onClick={this.props.cancel}>Close</button> */}
                    <button className='btn btn-secondary' onClick={this.close}>Close</button>
                </form>
            </div>
        );
    }
}
export default NewList;