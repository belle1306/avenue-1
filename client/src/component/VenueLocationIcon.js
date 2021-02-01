import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import leafIcon from "../assets/images/leaf-red.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// })

export const VenueLocationIcon = L.icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png", 
    // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),  
    // iconAnchor: null,
    // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    // shadowSize: null,  
    // shadowAnchor: null,
    iconSize: [35, 35]
    // className: 'leaflet-venue-icon'
  });