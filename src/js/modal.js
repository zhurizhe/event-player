// src/js/modal.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Modal} from 'bootstrap';

export const showModal = (event) => {
  const modalTitle = document.getElementById('eventModalLabel');
  const modalBody = document.querySelector('.modal-body');
  
  modalTitle.innerText = event.title;
  modalBody.innerText = event.description;
  // 预留扩展内容，可以在此添加更多信息
  
  const eventModal = new Modal(document.getElementById('eventModal'));
  eventModal.show();
};
