// src/components/Dashboard.js

import React, { useState } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS for styling

const workspaceData = [
  {
    "id": 1,
    "name": "Workspace 1",
    "date": "2022/04/12"
  },
  {
    "id": 2,
    "name": "Workspace 2",
    "date": "2022/04/12"
  },
  {
    "id": 3,
    "name": "Workspace 3",
    "date": "2022/04/12"
  },
  {
    "id": 4,
    "name": "Workspace 4",
    "date": "2022/04/12"
  },
  

 
  
];

const taskData = [
  {
    "id": 1,
    "name": "Task 1",
    "date": "2022/04/12"
  },
  {
    "id": 2,
    "name": "Task 2",
    "date": "2022/04/12"
  },
  {
    "id": 3,
    "name": "Task 3",
    "date": "2022/04/12"
  },
  {
    "id": 4,
    "name": "Task 4",
    "date": "2022/04/12"
  },
  {
    "id": 4,
    "name": "Task 4",
    "date": "2022/04/12"
  },
  {
    "id": 4,
    "name": "Task 4",
    "date": "2022/04/12"
  },
  {
    "id": 4,
    "name": "Task 4",
    "date": "2022/04/12"
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState(workspaceData);
  const [tasks, setTasks] = useState(taskData);


  const viewBoard = (workspaceId) => {
    navigate(`/board/${workspaceId}`);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="content-columns">
        <div className="sidebar">
          <h2>Workspaces List</h2>
          <ul>
            {workspaces.map((workspace) => (
              <li key={workspace.id}>
                {workspace.name} &nbsp; {workspace.date}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          <h2>Workspace Detail</h2>
          <div className="your-workspaces">
            {workspaces.map((workspace) => (
              <div key={workspace.id} className="workspace-card">
                <div className="title-workspace">{workspace.name}</div>
                <button onClick={() => viewBoard(workspace.id)}>Views</button>
                <button>Tasks</button>
                <button>Members</button>
                <button>Leave</button>
              </div>
            ))}
          </div>
        </div>
        <div className="task-content">
          <h2>Recently Tasks</h2>
          <div className="recently-tasks">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className='title-task'>{task.name}</div>
                <div className='date-task'>{task.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
