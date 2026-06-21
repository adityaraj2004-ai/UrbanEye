import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userLocationIcon = L.divIcon({
  className: "user-location-marker",
  html: `
    <div style="position:relative;width:22px;height:22px;">
      <div style="position:absolute;inset:0;border-radius:9999px;background:rgba(59,130,246,0.35);animation:userPulse 1.8s ease-out infinite;"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:9999px;background:#3B82F6;border:2px solid #ffffff;box-shadow:0 0 0 1px rgba(0,0,0,0.4);"></div>
    </div>
    <style>
      @keyframes userPulse {
        0% { transform: scale(0.6); opacity: 0.7; }
        100% { transform: scale(2.2); opacity: 0; }
      }
    </style>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -11],
});

const UserLocation = ({ latitude, longitude }) => {
  if (typeof latitude !== "number" || typeof longitude !== "number") return null;

  return (
    <Marker position={[latitude, longitude]} icon={userLocationIcon}>
      <Popup>
        <span className="text-xs text-neutral-100">You are here</span>
      </Popup>
    </Marker>
  );
};

export default UserLocation;