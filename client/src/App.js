import React from "react";
import "./App.css";
import Drop from "./component/Drop";
import Modal from "./component/UI/Modal/Modal";
import Layout from "./component/Layout/Layout";
import List from "./component/List/List";
import NewList from "./component/NewList/NewList";
import EditList from "./component/EditList/EditList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      owners: [],
      propertyUpdate: false,
      adding: false,
      editing: false
    };
    this.addProperty = this.addProperty.bind(this);
    this.addingHandler = this.addingHandler.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.editingHandler = this.editingHandler.bind(this);
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
        property_furnish: newProperty.furnish,
        property_rent: newProperty.rent,
        property_rentWeek: newProperty.rentWeek
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

  updateProperty(updateProperty) {
    console.log("property being updated");
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

  editingHandler(property) {
    console.log("We are trying to edit this property:", property)
    if (this.state.editing) {
      this.setState({editing: false});
    }
    else {
      this.setState({editing: property});
    }
    console.log(this.state.editing)
  }

  render() {

    return (
      <div>
          <Layout 
          logoutbtn={this.logoutHandler}
          newbtn={this.addingHandler}
          >
          </Layout>

          <div className="badge rounded-pill bg-light text-dark">  
              Currently managing 
                <span className="badge rounded-pill bg-warning text-dark">
                  {this.state.properties.length} 
                </span>
              properties
          </div>

          <div>
            <Modal cancel={this.addingHandler} show={this.state.adding}>
              <NewList 
                owners={this.state.owners} 
                cancel={this.addingHandler}
                add={this.addProperty}
              />
            </Modal>
          </div>

          <List 
            properties={this.state.properties}
            delete={this.deleteProperty}
            owner={this.state.owners}
            edit={this.editingHandler}
          />
        <Modal cancel={this.editingHandler} show={this.state.editing}>
          <EditList 
          property={this.state.editing}
          owners={this.state.owners}
          update={this.updateProperty}
          />
        </Modal>

      </div>
    )}
}

export default App;
