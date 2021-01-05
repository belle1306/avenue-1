import React from "react";
import "./App.css";
import Drop from "./component/Drop";
import Modal from "./component/Modal/Modal";
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

  logoutHandler() {
    alert("work saved! logged out");
  }

  editingHandler() {
    this.setState({
      editing: true
    });
  }

  addingHandler() {
    this.getOwners();
    this.setState({
      adding: true
    });
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
              <NewList owners={this.state.owners} />
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
                    <li> Photo:</li>
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
