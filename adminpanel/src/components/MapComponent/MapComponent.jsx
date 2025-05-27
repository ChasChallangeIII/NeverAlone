import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

const MapComponent = () => {
    const reports = useSelector((state) => state.reports.items);

    const markerIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <div className="map-container">
            <MapContainer
                center={[63.8258, 20.2630]}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {reports
                    .filter(report => report.location && report.location.latitude && report.location.longitude)
                    .map((report) => (
                        <Marker
                            key={report.id}
                            position={[report.location.latitude, report.location.longitude]}
                            icon={markerIcon}
                        >
                            <Popup>
                                <strong>{report.time}</strong><br />
                                {report.city}
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
