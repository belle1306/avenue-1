import React from "react";
import Select from "react-select";

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
            owner: null,
            // ownerList: ownerSummary
        };
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log("input values", this.state.address, this.state.owner);
        this.props.add({
            address: this.state.address,
            postcode: this.state.postcode,
            bedroom: this.state.bedroom,
            bathroom: this.state.bathroom,
            carpark: this.state.carpark,
            furnish: this.state.furnish,
            owner: this.state.owner
        })
    }

    render() {
        let ownerSummary = this.props.owners.map(o => {
            return {value: o.id, label: o.owner_firstName}
        });
        return (
            <div>
                <h5>Add Property...</h5>
                <form>
                    <label>Address</label>
                    <input type="text" value={this.state.address} onChange={e => this.setState({ address: e.target.value})}/>
                    <label>Postcode</label>
                    <input type="text" value={this.state.postcode} onChange={e => this.setState({ postcode: e.target.value})}/>
                    <label>Bedroom</label>
                    <input type="number" value={this.state.bedroom} onChange={e => this.setState({ bedroom: e.target.value})}/>
                    <label>Bathroom</label>
                    <input type="number" value={this.state.bathroom} onChange={e => this.setState({ bathroom: e.target.value})}/>
                    <label>Carpark</label>
                    <input type="number" value={this.state.carpark} onChange={e => this.setState({ carpark: e.target.value})}/>
                    <label>Furnish</label>
                    <input type="checkbox" value={this.state.furnish} onChange={e => this.setState({ furnish: e.target.checked ? 1 : 0})}/>
                    <label>Owned by</label>
                    <Select options = {ownerSummary} onChange={e => this.setState({ owner: e.value})}/>

                    <input type="submit" onClick={e => this.handleFormSubmit(e)}/>
                    {/* <button onClick = {props.cancel}>Cancel</button> */}
                </form>
            </div>
        );
    }
}
export default NewList;