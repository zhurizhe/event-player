// src/js/main.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import initializeMap, { addEventMarkers } from './map';
import initializeTimeline from './timeline';
import { showModal } from './modal';
import playerControl from './playerControl';

// 全局命名空间
window.EventPlayer = {
  init: function(config) {
    const { container, events } = config;
    if (!container || !events) {
      console.error('EventPlayer 初始化失败：缺少容器或事件数据。');
      return;
    }

    // 创建地图和时间轴的容器
    const containerElement = document.getElementById(container);
    if (!containerElement) {
      console.error(`EventPlayer 初始化失败：未找到容器 "${container}"。`);
      return;
    }

    containerElement.innerHTML = `
      <div id="map"></div>
      <div id="timeline"></div>
      <!-- 控制器容器 -->
      <div class="player-controls">
        <button id="playPauseBtn" class="control-btn">
          ▶️
        </button>
        <button id="stopBtn" class="control-btn">
          🛑
        </button>
        <button id="playModeBtn" class="control-btn">
          🔁 单次播放
        </button>
        <div class="speed-controls">
          <button id="speedBtn1" class="control-btn">
            1x
          </button>
          <button id="speedBtn2" class="control-btn">
            2x
          </button>
          <button id="speedBtn3" class="control-btn">
            3x
          </button>
        </div>
        <input type="range" id="progressBar" min="0" max="100" value="0" class="progress-bar" />
      </div>
    `;

    // 初始化地图
    const map = initializeMap();
    addEventMarkers(map, events);

    // 初始化时间轴
    initializeTimeline(events, showModal);
    playerControl.init();
  }
};

// 监听自定义事件（如果使用）
document.addEventListener('initializeEventPlayer', (e) => {
  const { container, events } = e.detail;
  window.EventPlayer.init({ container, events });
});
