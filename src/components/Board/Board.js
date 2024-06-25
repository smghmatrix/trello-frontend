import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Board.css';

const initialTasks = [
  { id: 'task-1', description: "The first task", status: "todo", assignee: "user 1" },
  { id: 'task-2', description: "The second task", status: "doing", assignee: "user 2" },
  { id: 'task-3', description: "The third task", status: "done", assignee: "user 3" },
];

function Board() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTodo, setNewTaskTodo] = useState({ description: '', assignee: '' });
  const [newTaskDoing, setNewTaskDoing] = useState({ description: '', assignee: '' });
  const [newTaskDone, setNewTaskDone] = useState({ description: '', assignee: '' });

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

  const handleAddTask = (status) => {
    let newTask;
    if (status === 'todo') newTask = newTaskTodo;
    if (status === 'doing') newTask = newTaskDoing;
    if (status === 'done') newTask = newTaskDone;

    if (newTask.description.trim() === '' || newTask.assignee.trim() === '') {
      alert('Please fill out both the description and assignee fields.');
      return;
    }

    const newTaskId = `task-${tasks.length + 1}`;
    const newTaskObject = {
      id: newTaskId,
      description: newTask.description,
      assignee: newTask.assignee,
      status: status,
    };

    setTasks([...tasks, newTaskObject]);
    if (status === 'todo') setNewTaskTodo({ description: '', assignee: '' });
    if (status === 'doing') setNewTaskDoing({ description: '', assignee: '' });
    if (status === 'done') setNewTaskDone({ description: '', assignee: '' });
  };

  const handleNewTaskChange = (e, status) => {
    if (status === 'todo') setNewTaskTodo({ ...newTaskTodo, [e.target.name]: e.target.value });
    if (status === 'doing') setNewTaskDoing({ ...newTaskDoing, [e.target.name]: e.target.value });
    if (status === 'done') setNewTaskDone({ ...newTaskDone, [e.target.name]: e.target.value });
  };

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={onDragEnd}>
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
                  <div className="add-task-form">
                    <input
                      type="text"
                      name="description"
                      placeholder="Task description"
                      value={
                        status === 'todo' ? newTaskTodo.description :
                        status === 'doing' ? newTaskDoing.description :
                        newTaskDone.description
                      }
                      onChange={(e) => handleNewTaskChange(e, status)}
                    />
                    <input
                      type="text"
                      name="assignee"
                      placeholder="Assignee"
                      value={
                        status === 'todo' ? newTaskTodo.assignee :
                        status === 'doing' ? newTaskDoing.assignee :
                        newTaskDone.assignee
                      }
                      onChange={(e) => handleNewTaskChange(e, status)}
                    />
                    <button
                      className="add-task-button"
                      onClick={() => handleAddTask(status)}
                    >
                      Add a card...
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
