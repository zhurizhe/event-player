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
  events = eventData;
  map = mapInstance;
  timeline = timelineInstance;
  markers = markersInstance;

  // 获取控制器按钮
  const playPauseBtn = document.getElementById('playPauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const playModeBtn = document.getElementById('playModeBtn');
  const speedBtns = document.querySelectorAll('.speed-controls button');
  const progressBar = document.getElementById('progressBar');

  // 播放/暂停按钮的点击事件
  playPauseBtn.addEventListener('click', togglePlayPause);
  // 停止按钮的点击事件
  stopBtn.addEventListener('click', stopEvent);
  // 播放模式按钮的点击事件
  playModeBtn?.addEventListener('click', togglePlayMode);
  // 速度控制按钮的点击事件
  speedBtns.forEach(btn => btn.addEventListener('click', handleSpeedChange));
  // 监听时间轴的选择事件
  timeline.on('select', handleTimelineSelect);
  // 进度条更新
  progressBar.addEventListener('input', handleProgressBarInput);
  // 监听地图标记的点击事件
  markers.forEach(marker => marker.on('click', () => handleMarkerClick(marker)));

  // 播放/暂停按钮点击事件
  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playPauseBtn.innerHTML = '⏸️'; // 显示暂停
      playEvent();
    } else {
      playPauseBtn.innerHTML = '▶️'; // 显示播放
      pauseEvent();
    }
  }

  // 停止按钮点击事件
  function stopEvent() {
    clearInterval(interval);
    currentProgress = 0;
    progressBar.value = currentProgress;
    currentIndex = 0;
    resetMapAndTimeline();
    isPlaying = false;
    playPauseBtn.innerHTML = '▶️'; // 显示播放
  }

  // 播放模式按钮点击事件
  function togglePlayMode() {
    isLooping = !isLooping;
    playModeBtn.innerHTML = isLooping ? '🔂' : '🔁';
  }

  // 速度控制按钮点击事件
  function handleSpeedChange(event) {
    currentSpeed = parseInt(event.target.innerText, 10);
    speedBtns.forEach(b => b.style.backgroundColor = '');
    event.target.style.backgroundColor = '#45a049';
    setSpeed(currentSpeed);
  }

  // 时间轴选择事件
  function handleTimelineSelect(properties) {
    if (properties.items.length > 0) {
      const selectedEvent = events.find(e => e.id === properties.items[0]);
      if (selectedEvent) {
        handleTimelineClick(selectedEvent);
      }
    }
  }

  // 进度条输入事件
  function handleProgressBarInput() {
    currentProgress = progressBar.value;
    handleProgressBarClick(currentProgress);
  }

  // 地图标记点击事件
  function handleMarkerClick(marker) {
    const selectedEvent = events.find(event => event.coordinates[0] === marker.getLatLng().lng && event.coordinates[1] === marker.getLatLng().lat);
    if (selectedEvent) {
      handleTimelineClick(selectedEvent);
    }
  }

  // 播放事件
  function playEvent() {
    interval = setInterval(() => {
      currentProgress += currentSpeed * 0.1;
      progressBar.value = currentProgress;
      updateTimelineAndMap(currentProgress);

      if (currentProgress >= 100) {
        currentProgress = 0;
        progressBar.value = currentProgress;
        currentIndex = 0;
        updateTimelineAndMap(currentProgress);

        if (!isLooping) {
          stopEvent();
        }
      }
    }, 100);
  }

  // 暂停事件
  function pauseEvent() {
    clearInterval(interval);
  }

  // 设置播放速度
  function setSpeed(speed) {
    console.log(`设置播放速度为 ${speed}x`);
    currentSpeed = speed;
  }

  // 更新时间轴和地图
  function updateTimelineAndMap(progress) {
    const eventIndex = Math.floor((progress / 100) * events.length);
    if (eventIndex !== currentIndex || eventIndex === 0) {
      currentIndex = eventIndex;
      const event = events[currentIndex];
      if (!event) return;

      // 更新地图聚焦
      map.setView([event.coordinates[1], event.coordinates[0]], 15); // 聚焦到当前事件
      const marker = markers[currentIndex]; // 获取当前事件的标记
      marker.openPopup(); // 弹出事件信息

      // 更新时间轴
      timeline.setWindow(event.start, event.end);
    }
  }

  // 处理时间轴点击
  function handleTimelineClick(selectedEvent) {
    const eventStartTime = new Date(events[0].start).getTime();  // 获取第一个事件的起始时间
    const eventEndTime = new Date(events[events.length - 1].end).getTime();  // 获取最后一个事件的结束时间
    const selectedEventStart = new Date(selectedEvent.start).getTime();
    const selectedEventIndex = events.findIndex(event => event.id === selectedEvent.id);

    // 计算进度百分比
    const progress = (selectedEventStart - eventStartTime) / (eventEndTime - eventStartTime) * 100;

    progressBar.value = progress;
    currentProgress = progress;

    map.setView([selectedEvent.coordinates[1], selectedEvent.coordinates[0]], 15);
    const marker = markers[selectedEventIndex];
    marker.openPopup();

    timeline.setWindow(selectedEvent.start, selectedEvent.end);
  }

  // 处理进度条点击
  function handleProgressBarClick(progress) {
    const selectedEventIndex = Math.floor((progress / 100) * events.length);
    const selectedEvent = events[selectedEventIndex];

    progressBar.value = progress;

    map.setView([selectedEvent.coordinates[1], selectedEvent.coordinates[0]], 15);
    const marker = markers[selectedEventIndex];
    marker.openPopup();

    timeline.setWindow(selectedEvent.start, selectedEvent.end);
  }

  // 重置地图和时间轴
  function resetMapAndTimeline() {
    map.setView([events[0].coordinates[1], events[0].coordinates[0]], 13);
    timeline.setWindow(events[0].start, events[0].end);
  }
}


export default {
  init
};
