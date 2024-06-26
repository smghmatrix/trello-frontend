import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';
import Navbar from '../Dashboard/Navbar'; // Import Navbar component


const initialTasks = [
  { id: 'task-1', description: "The first task", status: "todo", assignee: "user 1" },
  { id: 'task-2', description: "The second task", status: "doing", assignee: "user 2" },
  { id: 'task-3', description: "The third task", status: "done", assignee: "user 3" },
];

const initialWorkspace = {
  members: ['user1', 'user2', 'user3'],
  tasks: initialTasks,
  isAdmin: false
};

function Board() {
  const [tasks, setTasks] = useState(initialWorkspace.tasks);
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

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

  return (
    <div className="board-container">
      <Navbar />
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
                          <h3>{task.description}</h3>
                          <p><strong>Assignee:</strong> {task.assignee}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const description = e.target.description.value;
                    const assignee = e.target.assignee.value;
                    const newTask = {
                      id: `task-${tasks.length + 1}`,
                      description,
                      status,
                      assignee
                    };
                    setTasks([...tasks, newTask]);
                  }}>
                    <input type="text" name="description" placeholder="Task description" required />
                    <input type="text" name="assignee" placeholder="Assignee" required />
                    <button type="submit" className="add-task-button">Add a card...</button>
                  </form>
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
    </div>
  );
}

export default Board;
