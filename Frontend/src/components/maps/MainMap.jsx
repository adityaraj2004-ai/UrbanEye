import { useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/map.css";
import IncidentMarker from "./IncidentMarker.jsx";

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

function InvalidateMapSize() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
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

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url={tileUrl} attribution={attribution} />
      <InvalidateMapSize />

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