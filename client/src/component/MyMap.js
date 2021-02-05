import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import L from 'leaflet';
import Markers from './VenueMarkers';
import data from '../assets/data';
import 'leaflet/dist/leaflet.css';
import "../App.css";
class myMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 0, lng: 0 },
            zoom: 1,
            venues: [{
                description: "",
                name: ""
            }],
        };
    }

    componentDidMount() {
        // console.log("start mounting");
        fetch("/propertymgmt/properties")
          .then(res => res.json())
          .then(json => {
            // console.log(json);
            this.setState({
              venues: json
            });
          })
          .catch(error => {
            console.log(error);
          });
    }

    render() {
        // console.log(this.state.venues, "venue in render")
        
        let description = this.state.venues.map(e => {
            return e.property_postcode;  
        })
        console.log(description, "description");

        let name = this.state.venues.map(e => {
            return e.property_address;  
        })
        console.log(name, "name");

        return (
            <div className="col">
                <MapContainer center={this.state.currentLocation} zoom={this.state.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />        
                {/* <Markers venues={this.state.venues}/> */}
                </MapContainer>
            </div>
        )
    }
}

export default myMap;