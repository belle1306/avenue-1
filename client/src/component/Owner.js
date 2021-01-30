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
      tenants: [],
      ownerId: "",
      leaseid: ""
    };
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
  detailbyLeaseId(e) {
    // e.preventDefault();
    // this.setState({
    //   leaseId: e
    // });
    // console.log("propertiesbyOwnerId>>>", e.target.value)
    fetch("/propertymgmt/tenants/" + e)
      .then(res => res.json())
      .then(data => {
        console.log(">>>", data);
        this.setState({
          tenants: data
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
    let id = "";
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
          <div >

            {this.state.properties.map((e, i) => (
              id = e.lease_id,
              <div className="card-group">
                <div className="card">
                  <img className="card-img-top" key={i} src={e.property_photo} />
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
                    {e.owner}
                    </div>
                  </div>
                </div>

                {/*  */}
              </div>
            )
            )}
          </div>
          <input
            className="form-control"
            onChange={e => this.detailbyLeaseId(id)}
          />
          {this.state.tenants.map(e => (
            <div className="card-group">
              <div className="card">
                <div className="card-body">
                  <h3>Lease details</h3>
                  <div>
                    {e.leaseStart}
                  </div>
                  <div>
                    {e.leaseEnd}
                  </div>
                  <div>
                    {e.tenant_firstName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

    )
  }
}

export default Owner;