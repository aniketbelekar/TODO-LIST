import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Modal from "react-modal";
import Filter from './Components/Filter';
import TaskList from './Components/Tasklist';
import AddTaskModal from './Components/AddtaskModual';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const addTask = (task) => {
    if (taskToEdit) {
      const updatedTasks = tasks.map(t =>
        t.id === taskToEdit.id ? { ...t, text: task.text, completed: task.status === 'Completed' } : t
      );
      setTasks(updatedTasks);
      toast.success("Task updated successfully!");
    } else {
      setTasks([...tasks, { id: Date.now(), text: task.text, completed: task.status === 'Completed' }]);
      toast.success("Task added successfully!");
    }
    setTaskToEdit(null); // Reset taskToEdit after adding/editing
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const completedTask = tasks.find(task => task.id === taskId);
    if (completedTask && !completedTask.completed) {
      toast.success("Task completed successfully!");
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={
              <>
                <h1>TODO LIST</h1>
                <button className="add-task-button" onClick={() => setIsModalOpen(true)}>Add Task</button>
                <Filter filter={filter} setFilter={setFilter} />
                <div className="task-container">
                  <TaskList 
                    tasks={tasks} 
                    filter={filter} 
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                    toggleCompletion={toggleCompletion} 
                  />
                </div>
                <AddTaskModal
                  isOpen={isModalOpen}
                  onRequestClose={() => { 
                    setIsModalOpen(false); 
                    setTaskToEdit(null); // Reset taskToEdit when modal closes
                    toast.info("Modal closed");
                  }}
                  addTask={addTask}
                  taskToEdit={taskToEdit}
                />
              </>
            } />
          </Routes>
        </header>
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
