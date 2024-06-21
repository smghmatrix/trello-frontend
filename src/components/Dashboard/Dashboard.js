// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Import Navbar component
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
  }
  // {
  //   "id": 5,
  //   "name": "Workspace 4"
  // },
  // {
  //   "id": 6,
  //   "name": "Workspace 4"
  // }

];

function Dashboard() {
  // const [workspaces, setWorkspaces] = useState([]);
  // const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   // Fetch workspaces and tasks from your API
  //   fetch('/api/workspaces')
  //     .then(response => response.json())
  //     .then(data => setWorkspaces(data));

  //   fetch('/api/tasks')
  //     .then(response => response.json())
  //     .then(data => setTasks(data));
  // }, []);
  
  const [workspaces, setWorkspaces] = useState(workspaceData);
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="sidebar">
        <h2>Workspaces</h2>
        <ul>
          {workspaces.map(workspace => (
            <li key={workspace.id}>{workspace.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {workspace.date}</li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <div className="your-workspaces">
          {workspaces.map(workspace => (
            <div key={workspace.id} className="workspace-card">
              <div className='title-workspace'>{workspace.name}</div>
              <button>Tasks</button>
              <button>Views</button>
              <button>Leave</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
