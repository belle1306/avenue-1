import React from "react";
import "../App.css";
import LayoutOwner from "./Layout/LayoutOwner";
import HelloSign from "hellosign-embedded";
import Calendar from "./Calendar";
// import OwnerProfile from "../views/OwnerProfile";
import "./List/List.module.css";
// import List from "./List/List";

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      tenants: [],
      leases: [],
      owners: [],
      ownerId: "",
      leaseid: ""
    };
  }
  //mount all properties when page loads
  componentDidMount() {
    // this.propertiesbyOwnerId();
    this.getOwners();
    this.getLeases();
    this.getTenants();
  }
  propertiesbyOwnerId(e) {
    e.preventDefault();
    this.setState({
      ownerId: e.target.value
    });
    // console.log("propertiesbyOwnerId>>>", e.target.value)
    fetch("/propertymgmt/owners/" + e.target.value)
      .then(res => res.json())
      .then(data => {
        // console.log(">>>", data);
        this.setState({
          properties: data
        });
      })
      .catch(err => console.log(err));
  }
  getOwners() {
    fetch("/propertymgmt/owners")
      .then(res => res.json())
      .then(data => {
        // console.log("getOwner()", data);
        this.setState({
          owners: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLeases() {
    fetch("/propertymgmt/leases")
      .then(res => res.json())
      .then(data => {
        console.log("getLeases()", data);
        this.setState({
          leases: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTenants() {
    fetch("/propertymgmt/tenants")
      .then(res => res.json())
      .then(data => {
        // console.log("getTenants() HERE", data);
        this.setState({
          tenants: data
        });
      })
      .catch(error => {
        console.log(error);
      });
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
        </div>

        <div className="col-auto">
          <input
            className="form-control"
            onChange={e => this.propertiesbyOwnerId(e)}
          />
          <h1>Properties by owner</h1>
          <div className="List">

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
                  <div className="card-body">
                    <div className="card-text">
                      {e.property_bedroom} &nbsp;
                    <i className='fas'>&#xf236;</i> &nbsp; &nbsp;
                    {e.property_bathroom} &nbsp;
                    <i className='fa'>&#xf2cc;</i> &nbsp; &nbsp;
                    {e.property_carpark} &nbsp;
                    <i className='fas'>&#xf1b9;</i>
                    </div>

                    <div>
                      Furnished {(e.property_furnish) ? "✓" : "X"} &nbsp;&nbsp;
                Rented {(e.property_rent) ? "✓" : "X"}
                    </div>

                    <div>
                      ${e.property_rentWeek} weekly
                    &nbsp;
                    {"•"}
                    &nbsp;
                    ${e.property_rentWeek * 4} monthly
                </div>

                    <div>
                      <i className='fas'>&#xf182;</i>&nbsp;
                    {e.owner_firstName + " " + e.owner_lastName}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3>Lease details</h3>
                    <div>
                      {"START: " + e.leaseStart}
                    </div>
                    <div>
                      {"END: " + e.leaseEnd}
                    </div>
                    <div>
                      {e.tenant_firstName + " " + e.tenant_lastName}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <Calendar />
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