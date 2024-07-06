// src/components/Modal.js

import React from 'react';
import './Modal.css';

function Modal({ show, onClose, task }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal2">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Board:</strong> {task.board}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
        <p><strong>Status:</strong> {task.status}</p>
      </div>
    </div>
  );
}

export default Modal;
