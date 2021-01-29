import React from "react";
import "../App.css";
import LayoutOwner from "./Layout/LayoutOwner";
import HelloSign from "hellosign-embedded";
import OwnerProfile from "../views/OwnerProfile";

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    };
  }
  componentDidMount() {
    // console.log("start mounting");
    fetch("/propertymgmt/owners/1")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          properties: data
        });
      })
      .catch(err => console.log(err));
    this.getPropertiesByTenant();
  }

  getPropertiesByTenant(id) {
    fetch("/propertymgmt/owners/" + id)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({
          properties: data
        });
      })
      .catch(err => console.log(err));
  };
  signHandler() {
    // console.log("Sign here please...");
    const client = new HelloSign({
      clientId: "cc43fe82df8bf9fbea4ca8d26e0995ad"
    });
    console.log("what's in client: ", client);
    client.open("https://app.hellosign.com/editor/embeddedSign?signature_id=787e76989f2b6e8142aa3ee213e893d4&token=372672df611d7778c566ff1bd4dde79a", {
      // url: "SIGN_URL",
      allowCancel: true,
      skipDomainVerification: true,
      testMode: true
    });
    client.on(HelloSign.events.SIGN, (data) => {
      console.log('The document has been signed!');
    })
  }

  render() {
    return (
      <div>
        <LayoutOwner
          signbtn={this.signHandler}
        >
        </LayoutOwner>
        <h1>Owner Page</h1>
        <OwnerProfile />
        <h1>{console.log(this.state.properties.map(e => e.property_photo))}</h1>

      </div>
    )
  }
}

export default Owner;