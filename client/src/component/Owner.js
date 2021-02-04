import React from "react";
import "../App.css";
import LayoutOwner from "./Layout/LayoutOwner";
import HelloSign from "hellosign-embedded";
import OwnerCalendar from "./Calendar";
import "./List/List.module.css";
import moment from 'moment';

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      ownerId: "",
      leaseid: ""
    };
  }
  //mount all properties when page loads
   componentDidMount() {      
    const { match: { params } } = this.props;  
    fetch(`/propertymgmt/owners/${params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          properties: data
        });
      })
      .catch(err => console.log(err));
  }
  
  signHandler() {
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
        <div className="col-auto">
          <div className="List">
            {this.state.properties.map((e, i) => (              
              <div className="card-group">
                <div className="card">
                  <img className="card-img-top" key={i} src={e.property_photo} alt=""/>,

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
                    <i className='fas'>&#xf2cc;</i> &nbsp; &nbsp;
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
                      {moment(e.leaseStart).format('YYYY-MM-DD')}
                    </div>
                    <div>
                      {moment(e.leaseEnd).format('YYYY-MM-DD')}
                    </div>
                    <div>
                      {e.tenant_firstName + " " + e.tenant_lastName}
                    </div>
                    <div>
                      {e.lease_id}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body" key={i}>
                    <OwnerCalendar
                      // startDate={e.}
                      startDate={moment(e.leaseStart).format()}                      
                      endDate={moment(e.leaseEnd).format()}
                    />                       
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Owner;