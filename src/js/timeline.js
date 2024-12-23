// src/js/timeline.js
import { Timeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

const initializeTimeline = (events, onSelect) => {
  const container = document.getElementById('timeline');
  const items = new DataSet(events.map(event => ({
    id: event.id,
    content: event.title,
    start: event.start,
    end: event.end,
  })));

  const options = {
    selectable: true,
    zoomMin: 1000 * 60 * 60, // 1 hour
    zoomMax: 1000 * 60 * 60 * 24 * 30, // 1 month
    showCurrentTime: true,
    editable: false,
    // 更多配置选项根据需求调整
  };

  const timeline = new Timeline(container, items, options);

  timeline.on('select', (properties) => {
    if (properties.items.length > 0) {
      const selectedEvent = events.find(event => event.id === properties.items[0]);
      if (selectedEvent && onSelect) {
        onSelect(selectedEvent);
      }
    }
  });

  return timeline;
};

export default initializeTimeline;
