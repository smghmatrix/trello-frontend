import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';
import Navbar from '../Dashboard/Navbar'; // Import Navbar component
import { useParams } from 'react-router-dom';

function Board() {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [workspace, setWorkspace] = useState({ name: '', description: '', members: [], isAdmin: true });
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: '',
    assignee: '',
    dueDate: '',
    estimate: '',
    photo: null
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/`)
      .then(response => response.json())
      .then(data => {
        setWorkspace({
          name: data.name,
          description: data.description,
          members: data.users,
          isAdmin: true,
        });
      })
      .catch(error => console.error('Error fetching workspace:', error));

    fetch(`${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/tasks/`)
      .then(response => response.json())
      .then(data => {
        setTasks(data.results);
      })
      .catch(error => console.error('Error fetching tasks:', error));

    fetch(`${process.env.REACT_APP_API_URL}/users/`)
      .then(response => response.json())
      .then(data => {
        setUserList(data.results);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [workspaceId]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);

    // Optionally update the task status in the backend
    fetch(`${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/tasks/${currentTask.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ status: destination.droppableId }),
    }).catch(error => console.error('Error updating task status:', error));
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowEditTaskModal(true);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleLeaveWorkspace = () => {
    toast.success('You have left the workspace!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAddMember = (member) => {
    if (!workspace.members.some(m => m.id === member.user)) {
      setWorkspace({
        ...workspace,
        members: [...workspace.members, member]
      });
      toast.success('Member added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setShowAddMemberModal(false);
    } else {
      toast.error('This member has already been added!', {
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
  

  const handleUpdateTask = (e) => {
    e.preventDefault();
  
    const updatedTaskData = {
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status,
      estimated_time: currentTask.estimated_time,
      actual_time: currentTask.actual_time,
      due_date: currentTask.due_date,
      priority: currentTask.priority,
      workspace: workspaceId,
      assignee: currentTask.assignee,
    };
  
    fetch(`${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/tasks/${currentTask.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(updatedTaskData),
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status === 200) {
        setTasks(tasks.map(task => task.id === currentTask.id ? body : task));
        toast.success('Task updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Error: ${JSON.stringify(body)}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    .catch(error => {
      console.error('Error updating task:', error);
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  
    setShowEditTaskModal(false);
  };
  

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/tasks/${taskId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
    .then(response => {
      if (response.status === 204) {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Failed to delete task. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  

  const handleAddTask = (e) => {
    e.preventDefault();
    
    const newTaskData = {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      estimated_time: newTask.estimated_time,
      actual_time: newTask.actual_time,
      due_date: newTask.due_date,
      priority: newTask.priority,
      workspace: workspaceId, // Ensure workspace ID is included
      assignee: newTask.assignee,// Ensure assignee ID is included
      image_url: newTask.photo
    };
  
    fetch(`${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(newTaskData),
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status === 201) {
        setTasks([...tasks, body]); // Add new task to the task list
        toast.success('Task created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Error: ${JSON.stringify(body)}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    .catch(error => {
      console.error('Error creating task:', error);
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  
    setShowAddTaskModal(false);
  };
  

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  return (
    <div className="board-container">
      <Navbar />
      <ToastContainer />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-header">
          <h1>{workspace.name}</h1>
          <p>{workspace.description}</p>
          <div className="board-actions">
            <button onClick={() => setShowMembersModal(true)}>Show Members</button>
            <button onClick={handleLeaveWorkspace}>Leave Workspace</button>
            {workspace.isAdmin && <button onClick={() => setShowAddMemberModal(true)}>Add Member</button>}
          </div>
        </div>
        <div className="board-columns">
          {['Planned', 'In Progress', 'Completed'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="board-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3>{task.title}</h3>
                          <p><strong>Assignee:</strong> {task.assignee_username}</p>
                          <p><strong>priority:</strong> {task.priority}</p>
                          {task.photo && <img src={task.photo} alt="Task" />}
                          <div>
                          <button className="edit-task-button" onClick={() => handleEditTask(task)}>Edit</button>
                          <button className="edit-task-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <button className="add-task-button" onClick={() => {
                    setNewTask({ ...newTask, status });
                    setShowAddTaskModal(true);
                  }}>Add a card...</button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
  
      {showMembersModal && (
        <div className="modal-createTask">
          <div className="modal-content2">
            <h2>Members</h2>
            <ul>
              {workspace.members.map(member => (
                <li key={member.user}>
                  {member.username} (ID: {member.id})
                </li>
              ))}
            </ul>
            <button onClick={() => setShowMembersModal(false)}>Close</button>
          </div>
        </div>
      )}
  
      {showAddMemberModal && (
        <div className="modal-createTask">
          <div className="modal-content2">
            <h2>Add Member</h2>
            <input 
              type="text" 
              placeholder="Search users" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <ul className="user-list">
              {userList
                .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
                .map(user => (
                  <li key={user.user} onClick={() => handleAddMember(user)}>
                    {user.username} 
                  </li>
                ))}
            </ul>
            <button onClick={() => setShowAddMemberModal(false)}>Close</button>
          </div>
        </div>
      )}
  
      {showEditTaskModal && (
        <div className="modal-createTask">
          <div className="modal-content2">
            <h2>Edit Task</h2>
            <form onSubmit={handleUpdateTask}>
              <input type="text" name="title" placeholder="Title" value={currentTask.title} onChange={handleEditInputChange} required />
              <textarea name="description" placeholder="Description" value={currentTask.description} onChange={handleEditInputChange}></textarea>
              <select name="status" value={currentTask.status} onChange={handleEditInputChange} required>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input type="time" name="estimated_time" placeholder="Estimated Time" value={currentTask.estimated_time} onChange={handleEditInputChange} />
              <input type="time" name="actual_time" placeholder="Actual Time" value={currentTask.actual_time} onChange={handleEditInputChange} />
              <input type="date" name="due_date" placeholder="Due Date" value={currentTask.due_date} onChange={handleEditInputChange} />
              <select name="priority" value={currentTask.priority} onChange={handleEditInputChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input type="text" name="assignee" placeholder="Assignee" value={currentTask.assignee} onChange={handleEditInputChange} />
              <input type="file" name="photo" onChange={(e) => setCurrentTask({ ...currentTask, photo: URL.createObjectURL(e.target.files[0]) })} />
              <button type="submit">Update Task</button>
            </form>
            <button onClick={() => setShowEditTaskModal(false)}>Close</button>
          </div>
        </div>
      )}
  
      {showAddTaskModal && (
        <div className="modal-createTask">
          <div className="modal-content2">
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask}>
              <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={handleTaskInputChange} required />
              <textarea name="description" placeholder="Description" value={newTask.description} onChange={handleTaskInputChange}></textarea>
              <select name="status" value={newTask.status} onChange={handleTaskInputChange} required>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input type="time" name="estimated_time" placeholder="Estimated Time" value={newTask.estimated_time} onChange={handleTaskInputChange} />
              <input type="time" name="actual_time" placeholder="Actual Time" value={newTask.actual_time} onChange={handleTaskInputChange} />
              <input type="date" name="due_date" placeholder="Due Date" value={newTask.due_date} onChange={handleTaskInputChange} />
              <select name="priority" value={newTask.priority} onChange={handleTaskInputChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input type="text" name="assignee" placeholder="Assignee" value={newTask.assignee} onChange={handleTaskInputChange} />
              <input type="file" name="photo" onChange={(e) => setNewTask({ ...newTask, photo: URL.createObjectURL(e.target.files[0]) })} />
              <button type="submit">Add Task</button>
            </form>
            <button onClick={() => setShowAddTaskModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
  
  
}
  export default Board;
  