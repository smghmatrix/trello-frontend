// src/components/Board.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Board.css'; // Import the CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Board = () => {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: []
  });

  useEffect(() => {
    // Fetch tasks for the workspace using workspaceId
    // For demonstration, using mock data
    const mockTasks = {
      todo: [`Task for workspace ${workspaceId} - ToDo 1`, `Task for workspace ${workspaceId} - ToDo 2`],
      doing: [`Task for workspace ${workspaceId} - Doing 1`],
      done: [`Task for workspace ${workspaceId} - Done 1`]
    };
    setTasks(mockTasks);
  }, [workspaceId]);

  const addTask = (status) => {
    const taskTitle = prompt('Enter task title:');
    if (taskTitle) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [status]: [...prevTasks[status], taskTitle]
      }));
      toast.success('Task added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="board-container">
      <ToastContainer />
      {['todo', 'doing', 'done'].map((status) => (
        <div key={status} className="column">
          <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
          <div className="task-list">
            {tasks[status].map((task, index) => (
              <div key={index} className="task">
                {task}
              </div>
            ))}
          </div>
          <button onClick={() => addTask(status)}>Add a card...</button>
        </div>
      ))}
    </div>
  );
};

export default Board;
