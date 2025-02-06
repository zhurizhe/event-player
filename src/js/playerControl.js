// src/js/playerControl.js

let isPlaying = false; // 播放状态
let isLooping = false; // 播放模式：循环播放
let currentSpeed = 1;  // 当前播放速度
let currentProgress = 0; // 当前进度
let currentIndex = 0;  // 当前事件的索引
let interval;  // 用于控制播放进度的定时器
let events = [];  // 存储事件数据
let markers = [];  // 存储所有的标记
let map;  // 存储地图实例
let timeline;  // 存储时间轴实例
function init(eventData, mapInstance, timelineInstance, markersInstance) {
    events = eventData;  // 存储事件数据
    map = mapInstance;    // 存储地图实例
    timeline = timelineInstance;  // 存储时间轴实例
    markers = markersInstance;  // 存储所有的标记
      // 获取控制器按钮
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const playModeBtn = document.getElementById('playModeBtn');
    const speedBtns = document.querySelectorAll('.speed-controls button');
    const progressBar = document.getElementById('progressBar');

    // 播放/暂停按钮的点击事件
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playPauseBtn.innerHTML = '⏸️'; // 显示暂停
            playEvent();
        } else {
            playPauseBtn.innerHTML = '▶️'; // 显示播放
            pauseEvent();
        }
    });

    // 停止按钮的点击事件
    stopBtn.addEventListener('click', () => {
        stopEvent();
    });

    // 播放模式按钮的点击事件
    playModeBtn.addEventListener('click', () => {
        isLooping = !isLooping;
        playModeBtn.innerHTML = isLooping ? '🔂 循环播放' : '🔁 单次播放';
    });

    // 速度控制按钮的点击事件
    speedBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentSpeed = parseInt(btn.innerText, 10);
            speedBtns.forEach(b => b.style.backgroundColor = '');
            btn.style.backgroundColor = '#45a049';
            setSpeed(currentSpeed);
        });
    });

    // 进度条更新
    progressBar.addEventListener('input', () => {
        currentProgress = progressBar.value;
        updateEventProgress(currentProgress);
    });

}
// 播放事件
function playEvent() {
    interval = setInterval(() => {
      // 增加当前进度
      currentProgress += currentSpeed * 0.1;  // 根据播放速度调整进度
      progressBar.value = currentProgress;
  
      // 更新时间轴和地图
      updateTimelineAndMap(currentProgress);
  
      if (currentProgress >= 100) {
        stopEvent();
      }
    }, 100); // 每 100ms 更新一次进度
  }

// 暂停事件
function pauseEvent() {
    clearInterval(interval);  // 清除定时器，暂停播放
  }
  
  // 停止事件
  function stopEvent() {
    clearInterval(interval);  // 清除定时器
    currentProgress = 0;
    progressBar.value = currentProgress;
    currentIndex = 0; // 重置为第一个事件
    // 清空地图和时间轴的焦点
    resetMapAndTimeline();
  }

// 设置播放速度
function setSpeed(speed) {
    console.log(`设置播放速度为 ${speed}x`);
    // 调整播放速度的逻辑
    currentSpeed = speed;

}
// 更新时间轴和地图
function updateTimelineAndMap(progress) {
    // 根据进度计算当前应该展示的事件索引
    const eventIndex = Math.floor((progress / 100) * events.length);
  
    if (eventIndex !== currentIndex) {
      currentIndex = eventIndex;
      const event = events[currentIndex];
      
      // 更新地图聚焦
      map.setView([event.coordinates[1], event.coordinates[0]], 13); // 聚焦到当前事件
      const marker = markers[currentIndex]; // 获取当前事件的标记
      marker.openPopup(); // 弹出事件信息
  
      // 更新时间轴
      timeline.setWindow(event.start, event.end);  // 时间轴同步当前事件的时间
    }
  }
// 更新事件进度
function updateEventProgress(progress) {
    console.log(`更新进度为 ${progress}%`);
    // 更新事件的播放进度，联动时间轴或其他元素
}
// 重置地图和时间轴
function resetMapAndTimeline() {
    // 重新设置地图视野和时间轴
    map.setView([30.5931, 114.3055], 13);  // 默认地图位置
    timeline.setWindow(events[0].start, events[0].end);  // 默认设置时间轴到第一个事件
  }
  
export default {
    // playPauseBtn,
    // stopBtn,
    // playModeBtn,
    // speedBtns,
    // progressBar,
    init
};
