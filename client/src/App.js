import React from "react";
import "./App.css";
import Drop from "./component/Drop";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      properties: []
    };
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div>
          <span>Hello, user 1</span>
          <button>Log out</button>
          <h1>Property</h1>
          <button>New</button>
          <button>Edit</button>
          <button>x</button>
          <Drop />
      </div>
    )}
}

export default App;
