// src/js/timeline.js
import { Timeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';

const initializeTimeline = (events) => {
  const container = document.getElementById('timeline');
  const items = new DataSet(events.map(event => ({
    id: event.id,
    content: event.title,
    start: event.start,
    end: event.end,
    style: 'background-color:#000000aa; border-radius: 5px; color: #fff'  // 事件的样式，可以自定义

  })));

  const options = {
    selectable: true,
    zoomMin: 1000 * 60 * 60, // 1 hour
    zoomMax: 1000 * 60 * 60 * 24 * 30, // 1 month
    showCurrentTime: true,
    editable: false,
    // 更多配置选项根据需求调整
// 设置时间轴的刻度和显示间隔

format: {
  minorLabels: {
    minute: 'HH:mm', // 每分钟的显示格式
    hour: 'HH:00',   // 每小时的显示格式
  },
  majorLabels: {
    day: 'YYYY-MM-DD',  // 每天的显示格式
    month: 'YYYY-MM',   // 每月的显示格式
  }
}
  };

  const timeline = new Timeline(container, items, options);


  return timeline;
};

export default initializeTimeline;
