import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar'; // Import the main Navbar component
import './Tasks.css'; // Import the CSS for the tasks page

const mockTasksData = [
  {
    title: 'Task 1',
    description: 'Description for Task 1',
    board: 'Frontend Board',
    dueDate: '2024-02-11',
    status: 'todo'
  },
  {
    title: 'Task 2',
    description: 'Description for Task 2',
    board: 'Backend Board',
    dueDate: '2024-02-12',
    status: 'in progress'
  },
  {
    title: 'Task 3',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 4',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 5',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 6',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },

  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },
  {
    title: 'Task 7',
    description: 'Description for Task 3',
    board: 'UI/UX Board',
    dueDate: '2024-02-13',
    status: 'done'
  },

  
  // Add more mock tasks as needed
];

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setTasks(mockTasksData);
    }, 1000); // Simulate a network delay
  }, []);

  return (
    <div className="tasks-container">
      <div className="tasks-content">
        <h2>Assigned Tasks</h2>
          <div className="table-container">
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
                 {tasks.map((task, index) => (
              <tr key={index}>
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
          </div>
    </div>
    );
}

export default Tasks;
