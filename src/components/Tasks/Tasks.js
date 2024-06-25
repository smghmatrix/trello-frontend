// src/components/Tasks.js

import React, { useState } from 'react';
import Navbar from '../Dashboard/Navbar'; // Import Navbar component
import './Tasks.css'; // Import CSS for styling
import Modal from './Modal'; // Import the Modal component

const taskData = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    board: 'Frontend Board',
    dueDate: '2024-02-11',
    status: 'todo'
  },
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    board: 'Frontend Board',
    dueDate: '2024-02-11',
    status: 'todo'
  },
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    board: 'Frontend Board',
    dueDate: '2024-02-11',
    status: 'todo'
  },
  
  // Add more tasks here
];

function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="tasks-container">
      <Navbar />
      <div className="tasks-content">
        <h2>Assigned Tasks</h2>
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Board</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map(task => (
                <tr key={task.id} onClick={() => handleRowClick(task)}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.board}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal show={showModal} onClose={handleCloseModal} task={selectedTask} />
      </div>
    </div>
  );
}

export default Tasks;
