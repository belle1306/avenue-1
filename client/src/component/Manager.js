import React from "react";
import "../App.css";
// import Drop from "./component/Drop";
import Modal from "./UI/Modal/Modal";
import Layout from "./Layout/Layout";
import List from "./List/List";
import NewList from "./NewList/NewList";
import EditList from "./EditList/EditList";
import RentCalculator from "./RentCalculator";
// import { MapContainer, TileLayer } from "react-leaflet";
// import { geosearch } from "esri-leaflet-geocoder";
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet/dist/leaflet.css';
// import data from '../assets/data';
// import Markers from './VenueMarkers';
import BedroomPie from './UI/Charts/BedroomPie';
// import LeaseGraph from './UI/Charts/LeaseGraph';
import { AutoSizer } from 'react-virtualized';
import MyMap from './MyMap';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      owners: [],
      leases: [],
      tenants: [],
      adding: false,
      calculate: false,
      editing: {
        property: null,
        isEditable: false
      },
      // currentLocation: { lat: 0, lng: 0 },
      // zoom: 1
    };
    this.addProperty = this.addProperty.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.addingHandler = this.addingHandler.bind(this);
    this.calculateHandler = this.calculateHandler.bind(this);
    this.editingHandler = this.editingHandler.bind(this);
  }

  //mount all properties when page loads
  componentDidMount() {
    // console.log("start mounting");
    fetch("/propertymgmt/properties")
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          properties: json
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.getOwners();
    this.getLeases();
    this.getTenants();
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
        // console.log("getLeases()", data);
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

  getBedroomData() {
    let tempBedroomData = [];
    let dataIndex = null;
    this.state.properties.map(type => {
      dataIndex = tempBedroomData.findIndex(x => x.id === type.property_bedroom + " Bed " + type.property_bathroom + " Bath")
      // console.log("data Index", dataIndex);
      if(dataIndex >= 0){
        tempBedroomData[dataIndex].value += 1
      } else {
        tempBedroomData = [...tempBedroomData, {"id": type.property_bedroom + " Bed "  + type.property_bathroom + " Bath", "value": 1}]
      }
    })
    return tempBedroomData;
  }

  // getLeaseData() {
  //   // [ {"id": "leaseStart", "data": [{"x": 2018,"y": leaseStart}], {"id": "leaseEnd", "data": [{"x": "2025","y": x.leaseEnd}] } ]
  //   let tempLeaseData = [];
  //   this.state.leases.map(d => {
  //     console.log(d.leaseStart);
  //   })
  // }

  addProperty(newProperty) {
    console.log("new prop address", newProperty.address);
    console.log("properties object", newProperty);
    fetch("/propertymgmt/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        property_address: newProperty.address,
        owner_id: newProperty.owner,
        property_postcode: newProperty.postcode,
        property_photo: newProperty.photo,
        property_bedroom: newProperty.bedroom,
        property_bathroom: newProperty.bathroom,
        property_carpark: newProperty.carpark,
        property_furnish: newProperty.furnish,
        property_rent: newProperty.rent,
        property_rentWeek: newProperty.rentWeek
      })
    })
      .then(res => {
        // console.log("submit btn clicked and called POST");
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ adding: false });
  }

  updateProperty(newVal) {
    console.log("updatedProperty in App", newVal, newVal.id);
    fetch("/propertymgmt/properties/" + newVal.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        property_address: newVal.address,
        owner_id: newVal.owner,
        property_postcode: newVal.postcode,
        property_photo: newVal.photo,
        property_bedroom: newVal.bedroom,
        property_bathroom: newVal.bathroom,
        property_carpark: newVal.carpark,
        property_furnish: newVal.furnish,
        property_rent: newVal.rent,
        property_rentWeek: newVal.rentWeek
      })
    })
      .then(res => {
        res.json();
        this.setState({
          editing: {
            property: null,
            isEditable: false
          }
        });
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProperty(id) {
    // console.log("taken id", id);
    fetch("/propertymgmt/properties/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        res.json();
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
    // console.log("This property id was deleted", id);
  }
  
  addingHandler() {
    // console.log("adding", this.state.adding);
    if (this.state.adding) {
      this.setState({ adding: false });
    }
    else {
      this.getOwners();
      this.setState({ adding: true });
    }
  }

  calculateHandler() {
    if (this.state.calculate) {
      this.setState({ calculate: false });
      // window.location.reload();
    }
    else {
      this.setState({ calculate: true });
    }
  }

  editingHandler(property) {
    // console.log("edit handler", this.state.editing.isEditable);
    if (this.state.editing.isEditable) {
      this.setState({
        editing: {
          property: null,
          isEditable: false
        }
      });
    }
    else {
      this.setState({
        editing: {
          property: property,
          isEditable: true
        }
      });
    }
  }

  getProperty(id) {
    return this.state.properties.filter(eachProperty => eachProperty.id === id);
  }

    
  render() {
    const numProperties = this.state.properties.length;
    const vacancy = this.state.properties.filter(e =>
      e.property_rent === 0
    ).length;
    const totalRentMonth = this.state.properties.filter(e => e.property_rent === 1).reduce((prev, curr) => prev + curr.property_rentWeek, 0) * 4;
    const vacancyRate = (vacancy / numProperties * 100).toFixed(2);
    const bedroomData = this.getBedroomData();
 
    // useEffect(() => {
    //   const { current = {} } = mapRef;
    //   const { leafletElement: map = current;

    //   if ( !map ) return;
    //   const control = geosearch();
    //   control.addTo(map);
    //   }
    // }, []);

    // const marker = L.marker([0,0]).addTo(mymap);
    // console.log(bedroomData, "WHAT IS THIS");
    // const leaseData = this.getLeaseData();
  

    return (
      <div>
        <Layout
          // logoutbtn={this.logoutHandler}
          newbtn={this.addingHandler}
          calculatebtn={this.calculateHandler}
          // signbtn={this.signHandler}
        >
        </Layout>

          <div className="row m-5">
            <div className="col-2">
                <div className="card-body text-light text-center bg-primary mb-3 rounded">
                  <h1 className="card-title">{numProperties}</h1>
                  <p className="card-text">properties under management</p>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="card-body text-light text-center bg-danger mb-3 rounded">
                      <h1 className="card-title">{vacancy}</h1>
                      <p className="card-text">vacant properties</p>
                    </div>
                  </div>
                </div>

            <div className="row">
              <div className="col">
                <div className="card-body text-light text-center bg-primary mb-3 rounded">
                  <h1 className="card-title">${totalRentMonth}</h1>
                  <p className="card-text">monthly rent collection</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="card-body text-light text-center bg-danger mb-3 rounded">
                  <h1 className="card-title">{vacancyRate}%</h1>
                  <p className="card-text">vacancy rate</p>
                </div>
              </div>
            </div>
 
          </div>

          <div className="col">
          <AutoSizer style={{ height: "400px", width:"400px" }}>
              {({ height, width }) => (
                  <BedroomPie 
                    bedroomData={bedroomData}
                    height={height}
                    width={width}
                  />
              )}
          </AutoSizer>

          {/* <AutoSizer style={{ height: "400px", width:"800px" }}>
              {({ height, width }) => (
                  <LeaseGraph
                    leaseData={leaseData}
                    height={height}
                    width={width}
                  />
              )}
          </AutoSizer> */}

          </div>

          {/* <div className="col">
            <MapContainer ref={mapRef} center={currentLocation} zoom={zoom}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />        
              <Markers venues={data.venues}/>
            </MapContainer>
          </div> */}

          <div className="col">
            <MyMap />
          </div>

          <div className="row">
            <List
              properties={this.state.properties}
              delete={this.deleteProperty}
              owner={this.state.owners}
              edit={this.editingHandler}
              lease={this.state.leases}
              tenants={this.state.tenants}
            />
          </div>

        </div>

        <div>
          <Modal cancel={this.addingHandler} show={this.state.adding}>
            <NewList
              owners={this.state.owners}
              cancel={this.addingHandler}
              add={this.addProperty}
            />
          </Modal>
        </div>

        { (this.state.editing.isEditable) ?
          <Modal cancel={this.editingHandler} show={this.state.editing.isEditable}>
            <EditList
              property={this.state.editing.property}
              owners={this.state.owners}
              update={this.updateProperty}
              cancel={this.editingHandler}
            />
          </Modal> : <div></div>}

        <div>
          <Modal cancel={this.calculateHandler} show={this.state.calculate}>
              <RentCalculator
                cancel={this.calculateHandler}
              />
            </Modal>  
        </div>

      </div>
    )
  };
}

export default Manager;