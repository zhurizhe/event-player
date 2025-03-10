// src/js/map.js
import L from 'leaflet';
import icon from '../images/icon.png';
let markers = [];  // 存储所有的标记
    // 创建自定义图标

const accessToken = 'pk.eyJ1Ijoic3Rld2FydDc5NzEiLCJhIjoiY202dzdmbzh0MDdsazJzb2hzdDU2bWsyciJ9.p536KOpuLcph6nhzEY4A_w'; 
const initializeMap = () => {
  const map = L.map('map').setView([30.5931, 114.3055], 13); // 示例坐标：武汉
 
  L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: '© Mapbox © OpenStreetMap contributors',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);

  return map;
};

export const addEventMarkers = (map, events, icon) => {

  events.forEach(event => {
    const marker = L.marker([event.coordinates[1], event.coordinates[0]], icon?{icon:new L.Icon({
      iconUrl: icon,
      iconSize: [41, 41],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })}:{}).addTo(map);
    marker.bindPopup(`<b>${event.title}</b><br>${event.description}`);

    marker.on('click', () => {
      // showModal(event);
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
