import React from "react";
import "./App.css";
import Drop from "./component/Drop";
import Modal from "./component/Modal/Modal";
import List from "./component/List/List";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      editing: false
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

  editingHandler() {
    this.setState({
      editing: true
    });
  }

  render() {
    return (
      <div>
          <span>Hello, user 1</span>
          <button>Log out</button>
          <h1>Property</h1>
          <div>
            For Testing: {this.state.properties.length}
            <button>New</button>
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
          <button>x</button>
          <Drop />
      </div>
    )}
}

export default App;
