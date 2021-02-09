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
      // helloUrl: "",
      properties: [],
      ownerId: "",
      leaseid: "",
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
        // this.getUrl();
      })
      .catch(err => console.log(err));
  }

  // getUrl() {
  //   fetch(`/owner/callback`, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'no-cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     // body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   }
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data, "hellosign data");
  //       this.setState({
  //         helloUrl: data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }
   
  signHandler() {
    const client = new HelloSign({
      clientId: "0ce014a59e087c76d07bb63819c363e9"
    });
    client.open("https://app.hellosign.com/editor/embeddedSign?signature_id=d44b0c9aff271198c15ded43b559b9f1&token=20a7f7c6ae7dd169330d1a6145a092c1", {
      // url: "SIGN_URL",
      allowCancel: true,
      skipDomainVerification: true,
      testMode: true,
      debug: true
    });
    // client.on(HelloSign.events.SIGN, (data) => {
    client.on(HelloSign.events, (data) => {
      console.log('The document has been signed!');
      console.log('data', data.json());
      // console.log("HelloSign.events",HelloSign.events.REASSIGN)
      client.on(HelloSign.events.REASSIGN, (data) => {
        console.log(data,"reassign")
        console.log(`The signature request was reassigned to ${data.email}`);
      });
    });
    
  }

  render() {
    return (
      <div id="owner">        
        <LayoutOwner
          signbtn={this.signHandler}
        >
        </LayoutOwner>
        <div className="col-auto">
          <div className="List">
            {this.state.properties.map((e, i) => (              
              <div className="card-group">
                <div className="card">
                  <img className="card-img-top" key={i} src={e.property_photo} alt="house image"/>
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
                      {moment(e.leaseStart).format('MMMM Do YYYY')} to {moment(e.leaseEnd).format('MMMM Do YYYY')}
                    </div>
                    <div>
                      Tenant: {e.tenant_firstName + " " + e.tenant_lastName}
                    </div>                    
                    <div>
                    <OwnerCalendar
                      startDate={e.leaseStart}
                      endDate={e.leaseEnd}
                      /> 
                      
                    </div>
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