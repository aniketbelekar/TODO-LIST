// ./Components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, filter, editTask, deleteTask, toggleCompletion }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  return (
    <ul className="task-list">
      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleCompletion(task.id)} 
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
            <button onClick={() => editTask(task)}>✏️</button> {/* Pass the entire task object */}
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
