// src/js/playerControl.js

let isPlaying = false; // 播放状态
let isLooping = false; // 播放模式：循环播放
let currentSpeed = 1;  // 当前播放速度
let currentProgress = 0; // 当前进度

function init() {
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
    console.log('开始播放');
    // 在这里放置与事件播放相关的逻辑（例如播放时间轴、地图等）
}

// 暂停事件
function pauseEvent() {
    console.log('暂停播放');
    // 暂停播放相关逻辑
}

// 停止事件
function stopEvent() {
    console.log('停止播放');
    currentProgress = 0;
    progressBar.value = currentProgress;
    // 停止并重置播放进度
}

// 设置播放速度
function setSpeed(speed) {
    console.log(`设置播放速度为 ${speed}x`);
    // 调整播放速度的逻辑
}

// 更新事件进度
function updateEventProgress(progress) {
    console.log(`更新进度为 ${progress}%`);
    // 更新事件的播放进度，联动时间轴或其他元素
}

export default {
    // playPauseBtn,
    // stopBtn,
    // playModeBtn,
    // speedBtns,
    // progressBar,
    init
};
