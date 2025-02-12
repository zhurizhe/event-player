// src/js/main.js
import "leaflet/dist/leaflet.css";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import initializeMap, { addEventMarkers } from "./map";
import initializeTimeline from "./timeline";
import playerControl from "./playerControl";

// 默认控制器配置
const defaultConfig = {
  container: "event-player-container", // 容器ID
  events: [], // 事件数据
  controls: {
    playPause: true,    // 播放/暂停按钮
    stop: true,         // 停止按钮
    playMode: true,     // 播放模式按钮
    speedControls: true, // 速度控制按钮
    progressBar: true   // 进度条
  },
  styles: {
    controlBtn: "control-btn", // 控制按钮样式
    playerControlsContainer: "player-controls", // 控制器容器样式
    progressBar: "progress-bar"  // 进度条样式
  }
};

window.EventPlayer = {
  init: function (config) {
    // 合并默认配置与用户传入的配置
    const finalConfig = { ...defaultConfig, ...config };

    const { container, events, controls, styles } = finalConfig;

    // 校验容器和事件数据是否存在
    if (!container || !events) {
      console.error("EventPlayer 初始化失败：缺少容器或事件数据。");
      return;
    }

    // 创建地图和时间轴的容器
    const containerElement = document.getElementById(container);
    if (!containerElement) {
      console.error(`EventPlayer 初始化失败：未找到容器 "${container}"。`);
      return;
    }

    // 根据配置动态插入控制器HTML
    containerElement.innerHTML = `
      <div id="map"></div>
      <div id="timeline"></div>
      <!-- 控制器容器 -->
      <div id="${styles.playerControlsContainer}">
        ${controls.playPause ? `<button id="playPauseBtn" class="${styles.controlBtn}">▶️</button>` : ''}
        ${controls.stop ? `<button id="stopBtn" class="${styles.controlBtn}">🛑</button>` : ''}
        ${controls.playMode ? `<button id="playModeBtn" class="${styles.controlBtn}">🔁</button>` : ''}
        ${controls.speedControls ? `
          <div class="speed-controls">
            <button id="speedBtn1" class="${styles.controlBtn}">1x</button>
            <button id="speedBtn2" class="${styles.controlBtn}">2x</button>
            <button id="speedBtn3" class="${styles.controlBtn}">3x</button>
          </div>` : ''}
        ${controls.progressBar ? `<input type="range" id="progressBar" min="0" max="100" value="0" class="${styles.progressBar}">` : ''}
      </div>
    `;

    // 初始化地图
    const map = initializeMap();
    const markers = addEventMarkers(map, events);

    // 初始化时间轴
    const timeline = initializeTimeline(events);
    playerControl.init(events, map, timeline, markers);
  },
};

// 监听自定义事件（如果使用）
document.addEventListener("initializeEventPlayer", (e) => {
  const { container, events } = e.detail;
  window.EventPlayer.init({ container, events });
});
