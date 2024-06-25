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
                  <button className="add-task-button">Add a card...</button>
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
