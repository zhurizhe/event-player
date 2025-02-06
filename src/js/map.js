// src/js/map.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { showModal } from './modal';
let markers = [];  // 存储所有的标记
    // 创建自定义图标
const customIcon = new L.Icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const initializeMap = () => {
  const map = L.map('map').setView([30.5931, 114.3055], 13); // 示例坐标：武汉

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  return map;
};

export const addEventMarkers = (map, events) => {
  events.forEach(event => {
    const marker = L.marker([event.coordinates[1], event.coordinates[0]], {icon:customIcon}).addTo(map);
    marker.bindPopup(`<b>${event.title}</b><br>${event.description}`);

    marker.on('click', () => {
      showModal(event);
    });
    markers.push(marker);  // 将每个标记添加到数组中

  });
  // 使用 fitBounds 自动调整地图范围
  if (markers.length > 0) {
    const bounds = markers.map(marker => marker.getLatLng()); // 获取所有标记的经纬度
    map.fitBounds(bounds); // 让地图自动调整到这些标记的位置
  }
  return markers;
};

export default initializeMap;
