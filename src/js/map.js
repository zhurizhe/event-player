// src/js/map.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { showModal } from './modal';

const initializeMap = () => {
  const map = L.map('map').setView([30.5931, 114.3055], 13); // 示例坐标：武汉

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  return map;
};

export const addEventMarkers = (map, events) => {
  events.forEach(event => {
    const marker = L.marker([event.coordinates[1], event.coordinates[0]]).addTo(map);
    marker.on('click', () => {
      showModal(event);
    });
  });
};

export default initializeMap;
