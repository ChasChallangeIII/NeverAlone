import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css";

const MapComponent = () => {

    const markerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],  
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
        shadowSize: [41, 41]   
    });

    return (
        <div className="map-container">
        <MapContainer
            center={[63.8258, 20.2630]}  
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
            position={[63.8258, 20.2630]}  
            icon={markerIcon}
            >
            <Popup>Här är Umeå, Västerbotten!</Popup>
            </Marker>
        </MapContainer>
        </div>
    );
    };

export default MapComponent;
