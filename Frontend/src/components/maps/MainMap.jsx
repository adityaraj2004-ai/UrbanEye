import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/map.css";
import IncidentMarker from "./IncidentMarker.jsx";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (typeof onMapClick === "function") {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

const MainMap = ({
  incidents = [],
  center,
  zoom = 13,
  onMapClick,
  children,
}) => {
  const mapCenter =
    Array.isArray(center) && center.length === 2 ? center : [20.5937, 78.9629];

  const tileUrl = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution = MAPBOX_TOKEN
    ? '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url={tileUrl} attribution={attribution} tileSize={512} zoomOffset={-1} />

      {onMapClick && <MapClickHandler onMapClick={onMapClick} />}

      {incidents.map((incident) => (
        <IncidentMarker
          key={incident._id || incident.id}
          incident={incident}
        />
      ))}

      {children}
    </MapContainer>
  );
};

export default MainMap;