import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import { createCustomMarkerIcon } from "../../utils/mapHelpers.js";
import MarkerPopup from "./MarkerPopup.jsx";

// Fix Vite/Webpack marker icon bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const IncidentMarker = ({ incident }) => {
  const coords = incident?.location?.coordinates;
  if (!Array.isArray(coords) || coords.length !== 2) return null;

  // GeoJSON stores [longitude, latitude] — flip for Leaflet
  const position = [coords[1], coords[0]];
  const icon = createCustomMarkerIcon(incident.severity);

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <MarkerPopup incident={incident} />
      </Popup>
    </Marker>
  );
};

export default IncidentMarker;