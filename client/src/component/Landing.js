import React from "react";
import "../App.css";
import classes from "./Landing.module.css";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={classes.bg}>
        <h1>This is where i left off</h1>
      </div>
    )
  };
}
export default Landing;