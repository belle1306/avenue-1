import React from "react";
import "../App.css";
import LayoutOwner from "./Layout/LayoutOwner";
import HelloSign from "hellosign-embedded";
// import OwnerProfile from "../views/OwnerProfile";

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      owners: [],
      ownerId: ""
    };
  }
  propertiesbyOwnerId(e) {
    e.preventDefault();
    this.setState({
      ownerId: e.target.value
    });
    console.log("propertiesbyOwnerId>>>", e.target.value)
    fetch("/propertymgmt/owners/" + e.target.value)
      .then(res => res.json())
      .then(data => {
        console.log(">>>", data);
        this.setState({
          properties: data
        });
      })
      .catch(err => console.log(err));
  }

  signHandler() {
    // console.log("Sign here please...");
    const client = new HelloSign({
      clientId: "cc43fe82df8bf9fbea4ca8d26e0995ad"
    });
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
        <div>
          {/* <OwnerProfile /> */}
          {/* <div>
          {{
            const propertyList = this.props.properties.map(p => {
              let selectedProperty = this.showProperties(p.owner_id, this.props.properties);
              console.log('propertyList>>', propertyList, ' selectedProperty', selectedProperty)
            })
          }}
          </div> */}
        </div>
        <div className="col-auto">
          <input
            className="form-control"
            onChange={e => this.propertiesbyOwnerId(e)}
          />
          <h1>Properties by owner</h1>
          <div >

            {this.state.properties.map((e, i) => (
              <div className="card-group">
                <div className="card">
                  <img className="card-img-top" key={i} src={e.property_photo} />,
                  <div className="card-img-overlay">
                    <h3 className="card-title text-white">{e.property_address}</h3>
                    <span className="text-white">
                      {e.property_postcode}
                    </span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3>Lease details</h3>
                    <div>
                      {e.lease_id}
                    </div>
                    <div>
                      tenant
                    </div>
                  </div>
                </div>
              </div>
            )
            )}


          </div>


        </div>
      </div>
    )
  }
}

export default Owner;