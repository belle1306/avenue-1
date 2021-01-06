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
    this.addProperty = this.addProperty.bind(this);
    this.addingHandler = this.addingHandler.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
  }

  //mount all properties when page loads
  componentDidMount() {
    console.log("starting mounting")
    fetch("/propertymgmt/properties")
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          properties: json
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.getOwners();
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

  // update(newVal) {
  //   console.log("new val address", newVal.address);
  //   let newProperty = {
  //     address: newVal.address,
  //     postcode: newVal.postcode,
  //     bedroom: newVal.bedroom,
  //     bathroom: newVal.bathroom,
  //     carpark: newVal.carpark,
  //     furnish: newVal.furnish
  //   }
  //   let existingProperties = newProperty.properties;
  //   existingProperties.push(newProperty);
  //   this.setState({
  //     properties: existingProperties
  //   })
  //   this.addProperty(newProperty);
  // }

  addProperty(newProperty) {
    console.log("new prop address", newProperty.address);
    console.log("properties object",newProperty);
    fetch("/propertymgmt/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        property_address: newProperty.address,
        owner_id: newProperty.owner,
        property_postcode: newProperty.postcode,
        property_bedroom: newProperty.bedroom,
        property_bathroom: newProperty.bathroom,
        property_carpark: newProperty.carpark,
        property_furnish: newProperty.furnish
      })
    })
      .then(res => {
        // console.log("submit btn clicked and called POST");
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
    
    this.setState({adding: false});
  }

  deleteProperty(id) {
    console.log("taken id", id);
    fetch("/propertymgmt/properties/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
    
    console.log("This property id was deleted", id)
  }

  logoutHandler() {
    alert("work saved! logged out");
  }

  addingHandler() {
    console.log("adding", this.state.adding);
    if (this.state.adding) {
      this.setState({adding: false});
    }
    else {
      this.getOwners();
      this.setState({adding: true});
    }
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
            
            <button onClick={() => this.addingHandler()}>New</button>
            <Modal cancel={this.addingHandler} show={this.state.adding}>
              <NewList 
                owners={this.state.owners} 
                cancel={this.addingHandler}
                add={this.addProperty}
              />
            </Modal>
              <div>
                Total Properties: {this.state.properties.length}
              </div>
          </div>
{/* 
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
                    <li> Owned by: {this.showOwnerHandler(p.owner_id)} </li>
                    <button onClick={() => this.deleteProperty(p.id)}>Delete</button>
                </ul>
              )
            })}
          </div> */}

          <List 
          properties={this.state.properties}
          delete={this.deleteProperty}
          owner={this.state.owners}
          />

        {/* 
          <button onClick={() => this.editingHandler()}>Edit</button>
          <Modal show={this.state.editing}>
            <List properties={this.state.properties} />
          </Modal> */}

          <Drop />

      </div>
    )}
}

export default App;
