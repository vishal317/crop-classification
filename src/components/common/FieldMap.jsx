import React, { useEffect, useState } from 'react';
import { MapPin, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './FieldMap.css';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Component to handle auto-zooming and centering
const ChangeView = ({ center, bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [20, 20] });
        } else if (center) {
            map.setView(center, 15);
        }
    }, [center, bounds, map]);
    return null;
};

const FieldMap = ({ coordinates, boundaryPolygon, locationId }) => {
    const [isDataValid, setIsDataValid] = useState(false);

    useEffect(() => {
        if (coordinates && coordinates.lat && coordinates.lng) {
            setIsDataValid(true);
        } else {
            setIsDataValid(false);
        }
    }, [coordinates]);

    const center = coordinates ? [coordinates.lat, coordinates.lng] : [0, 0];
    const bounds = boundaryPolygon && boundaryPolygon.length > 0 ? L.latLngBounds(boundaryPolygon) : null;

    return (
        <div className="field-map-wrapper">
            <div className="map-context-box">
                <div className="gps-status-tab">
                    GPS CONTEXT: {isDataValid ? 'ENABLED' : 'DISABLED'}
                </div>
                {!isDataValid ? (
                    <div className="map-placeholder-box">
                        <div className="instruction-box">
                            <MapPin size={24} className="mb-2" />
                            ENTER LOCATION ID TO PREVIEW FIELD LOCATION
                        </div>
                    </div>
                ) : (
                    <div className="active-map-box">
                        <MapContainer
                            center={center}
                            zoom={13}
                            scrollWheelZoom={false}
                            zoomControl={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            />
                            <ChangeView center={center} bounds={bounds} />
                            <Marker position={center} />
                            {boundaryPolygon && boundaryPolygon.length > 0 && (
                                <Polygon
                                    positions={boundaryPolygon}
                                    pathOptions={{ color: '#000', fillColor: '#000', fillOpacity: 0.2 }}
                                />
                            )}
                        </MapContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FieldMap;
