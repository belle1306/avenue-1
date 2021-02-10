import { MapContainer, TileLayer } from "react-leaflet";
import Markers from './VenueMarkers';
import data from '../assets/data';
import 'leaflet/dist/leaflet.css';
import "../App.css";

function MyMap() {
    const currentLocation = { lat: 3.139003, lng: 101.686852 };
    const zoom = 2;
    return (
        <div className="col">
        <MapContainer center={currentLocation} zoom={zoom}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />        
        <Markers venues={data.venues}/>
        </MapContainer>
    </div>
    )
}

export default MyMap;