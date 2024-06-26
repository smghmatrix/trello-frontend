import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';

const initialTasks = [
  { id: 'task-1', title: "The first task", description: "Description for task 1", status: "todo", assignee: "user 1", dueDate: "2023-12-01", estimate: "2 days", photo: null },
  { id: 'task-2', title: "The second task", description: "Description for task 2", status: "doing", assignee: "user 2", dueDate: "2023-12-02", estimate: "1 day", photo: null },
  { id: 'task-3', title: "The third task", description: "Description for task 3", status: "done", assignee: "user 3", dueDate: "2023-12-03", estimate: "3 days", photo: null },
];

const initialWorkspace = {
  members: ['user1', 'user2', 'user3'],
  tasks: initialTasks,
  isAdmin: true
};

function Board() {
  const [tasks, setTasks] = useState(initialWorkspace.tasks);
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: '',
    assignee: '',
    dueDate: '',
    estimate: '',
    photo: null
  });

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

    const draggedTask = tasks.find(task => task.id === draggableId);
    draggedTask.status = destination.droppableId;

    const updatedTasks = tasks.filter(task => task.id !== draggableId);
    updatedTasks.splice(destination.index, 0, draggedTask);

    setTasks(updatedTasks);
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

  const handleAddMember = (e) => {
    e.preventDefault();
    const newMember = e.target.newMember.value;
    if (newMember && !workspace.members.includes(newMember)) {
      setWorkspace({
        ...workspace,
        members: [...workspace.members, newMember]
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
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskId = `task-${tasks.length + 1}`;
    const newTaskWithId = { ...newTask, id: taskId };
    setTasks([...tasks, newTaskWithId]);
    toast.success('Task added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setShowAddTaskModal(false);
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  return (
    <div className="board-container">
      <ToastContainer />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-header">
          <h1>Workspace Board</h1>
          <div className="board-actions">
            <button onClick={() => setShowMembersModal(true)}>Show Members</button>
            <button onClick={handleLeaveWorkspace}>Leave Workspace</button>
            {workspace.isAdmin && <button onClick={() => setShowAddMemberModal(true)}>Add Member</button>}
          </div>
        </div>
        <div className="board-columns">
          {['todo', 'doing', 'done'].map(status => (
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
                          <p><strong>Assignee:</strong> {task.assignee}</p>
                          {task.photo && <img src={task.photo} alt="Task" />}
                          <button className="edit-task-button">...</button>
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
        <div className="modal">
          <div className="modal-content">
            <h2>Members</h2>
            <ul>
              {workspace.members.map(member => (
                <li key={member}>{member}</li>
              ))}
            </ul>
            <button onClick={() => setShowMembersModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAddMemberModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Member</h2>
            <form onSubmit={handleAddMember}>
              <input type="text" name="newMember" placeholder="Username" required />
              <button type="submit">Add Member</button>
            </form>
            <button onClick={() => setShowAddMemberModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAddTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask}>
              <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={handleTaskInputChange} required />
              <textarea name="description" placeholder="Description" value={newTask.description} onChange={handleTaskInputChange}></textarea>
              <input type="text" name="estimate" placeholder="Estimate" value={newTask.estimate} onChange={handleTaskInputChange} />
              <input type="date" name="dueDate" placeholder="Due Date" value={newTask.dueDate} onChange={handleTaskInputChange} />
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
