import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS for styling

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
    "id": 5,
    "name": "Task 5",
    "date": "2022/04/12"
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [tasks, setTasks] = useState(taskData);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/workspaces/`, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setWorkspaces(data.results);
      })
      .catch(error => console.error('Error fetching workspaces:', error));
  }, []);

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
                {workspace.name} &nbsp; {new Date(workspace.created_at).toLocaleDateString()}
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
