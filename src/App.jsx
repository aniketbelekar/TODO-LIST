import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Components/Firebase'; // Adjust based on your file structure
import "./App.css";
import Modal from "react-modal";
import Filter from './Components/Filter';
import AddTaskModal from './Components/AddtaskModual';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import TasksList from "./Components/TasksList";

Modal.setAppElement('#root');

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
            <Route path="/" element={user ? (
              <>
                <h1>TODO LIST</h1>
                <button className="add-task-button" onClick={() => setIsModalOpen(true)}>Add Task</button>
                <Filter filter={filter} setFilter={setFilter} />
                <div className="task-container">
                  <TasksList
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
                    setTaskToEdit(null);
                    toast.info("Modal closed");
                  }}
                  addTask={addTask}
                  taskToEdit={taskToEdit}
                />
              </>
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
