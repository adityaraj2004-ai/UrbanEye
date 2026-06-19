import L from 'leaflet';
import { getSeverityColor } from './severityColor.js';

const DEFAULT_CENTER = [20.5937, 78.9629];

export function getMapCenter(incidents) {
  if (!incidents || incidents.length === 0) return DEFAULT_CENTER;
  let lat = 0;
  let lng = 0;
  let count = 0;
  for (const inc of incidents) {
    const c = inc?.location?.coordinates;
    if (Array.isArray(c) && c.length === 2) {
      lng += c[0];
      lat += c[1];
      count++;
    } else if (typeof inc?.latitude === 'number' && typeof inc?.longitude === 'number') {
      lat += inc.latitude;
      lng += inc.longitude;
      count++;
    }
  }
  if (count === 0) return DEFAULT_CENTER;
  return [lat / count, lng / count];
}

export function formatCoordinates(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return '';
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export function createCustomMarkerIcon(severity) {
  const color = getSeverityColor(severity);
  const html = `
    <div style="position:relative;width:28px;height:28px;">
      <div style="position:absolute;inset:0;background:${color};opacity:0.25;border-radius:9999px;animation:ueping 1.6s ease-out infinite;"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid #0B0B0B;box-shadow:0 0 0 1px rgba(255,255,255,0.2);"></div>
    </div>
    <style>@keyframes ueping{0%{transform:scale(0.6);opacity:0.6}100%{transform:scale(1.8);opacity:0}}</style>
  `;
  return L.divIcon({
    html,
    className: 'urbaneye-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}