import React from "react";
import "./App.css";
import Drop from "./component/Drop";
import Modal from "./component/UI/Modal/Modal";
import List from "./component/List/List";
import NewList from "./component/NewList/NewList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      owners: [],
      editing: false,
      adding: false
    };
    this.update = this.update.bind(this);
  }

  //mount all properties when page loads
  componentDidMount() {
    fetch("/propertymgmt/properties")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          properties: json
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getOwners() {
    fetch("/propertymgmt/owners")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          owners: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // addPropertyInput() {
  //   this.addProperty();
  // }

  update(newVal) {
    console.log("new val address", newVal.address);
    let newProperty = {
      address: newVal.address,
      postcode: newVal.postcode,
      bedroom: newVal.bedroom,
      bathroom: newVal.bathroom,
      carpark: newVal.carpark,
      furnish: newVal.furnish
    }
    let existingProperties = this.state.properties;
    existingProperties.push(newProperty);
    this.setState({
      properties: existingProperties
    })
  }

  addProperty() {
    fetch("/propertymgmt/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        property_address: this.state.address,
        owner_id: this.state.ownerid,
        property_postcode: this.state.postcode,
        property_bedroom: this.state.bedroom,
        property_bathroom: this.state.property_bathroom,
        property_carpark: this.state.carpark,
        property_furnish: this.state.furnish
      })
    })
      .then(res => {
        console.log("submit btn clicked and called POST", res.json());
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  }

  logoutHandler() {
    alert("work saved! logged out");
  }

  addingHandler() {
    this.getOwners();
    this.state.adding ? this.setState({adding: false}) : this.setState({adding: true});
  }

  editingHandler() {
    this.state.editing ? this.setState({editing: false}) : this.setState({editing: true})
  }

  render() {
    return (
      <div>
          <span>Hello, user 1</span>
          <button onClick={() => this.logoutHandler()}>Log out</button>
          <h1>Property</h1>
          <div>
            For Testing: {this.state.properties.length}
            <button onClick={() => this.addingHandler()}>New</button>
            <Modal show={this.state.adding}>
              <NewList 
                owners={this.state.owners} 
                cancel={this.addingHandler}
                add={this.update}
              />
            </Modal>
          </div>

          <div>
            {this.state.properties.map(p => {
              return (
                <ul key={p.id}>
                    <li> Address: {p.property_address} </li>
                    <li> Postcode: {p.property_postcode} </li>
                    <li> Bedroom: {p.property_bedroom} </li>
                    <li> Bathroom: {p.property_bathroom} </li>
                    <li> Carpark: {p.property_carpark} </li>
                    <li> Furnishing: {p.property_furnish} </li>
                </ul>
              )
            })}
          </div>

          <button onClick={() => this.editingHandler()}>Edit</button>
          <Modal show={this.state.editing}>
            <List properties={this.state.properties} />
          </Modal>
          <Drop />
          <button>Delete</button>
      </div>
    )}
}

export default App;
