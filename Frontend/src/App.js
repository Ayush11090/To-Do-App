import React, { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "./api";

import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import {
  FaEdit,
  FaTrashAlt,
  FaCheckCircle,
  FaRegCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./App.css"; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setNetworkError(false); // Reset network error on success
      } catch (error) {
        console.error("Network error:", error);
        setNetworkError(true); // Set network error on failure
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, { ...task, id: newTask.id, completed: false }]);
      alert(newTask.message);
      setNetworkError(false); 
    } catch (error) {
      console.error("Network error:", error);
      setNetworkError(true);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Task Deleted Successfully");
      setNetworkError(false); 
    } catch (error) {
      console.error("Network error:", error);
      setNetworkError(true);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      setNetworkError(false);
    } catch (error) {
      console.error("Network error:", error);
      setNetworkError(true);
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setEditTask(taskToEdit); 
  };

  const handleUpdateTask = async (id, updatedFields) => {
    try {
      const taskToEdit = tasks.find((t) => t.id === id);
      const updatedTask = { ...taskToEdit, ...updatedFields };
      await updateTask(id, updatedTask);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      setEditTask(null);
      alert("Task updated successfully");
      setNetworkError(false); 
    } catch (error) {
      console.error("Network error:", error);
      setNetworkError(true);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTasks();
      setTasks([]);
      alert("All task deleted successfully");
      setNetworkError(false);
    } catch (error) {
      console.error("Network error:", error);
      setNetworkError(true);
    }
  };

  return (
    <div>
    <nav className="navbar">
    <h1>To-Do Reminder App</h1>
    </nav>
    <div className="container">
      {networkError && (
        <div className="network-error">
          <FaExclamationTriangle className="error-icon" />
          <span>Network Error! Please check your connection.</span>
        </div>
      )}
      <AddTaskForm onAdd={handleAddTask} />
      {editTask && (
        <EditTaskForm
          task={editTask}
          onUpdate={handleUpdateTask}
          onCancel={() => setEditTask(null)}
        />
      )}
      <div className="card">
        <div className="card-header">
          <h2>Task List</h2>
          {tasks.length > 0 && <button onClick={handleDeleteAll}>Delete All</button>}
        </div>
        <div className="card-body">
          <table className="task-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <button
                      className={`toggle ${task.completed ? "completed" : ""}`}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
                    </button>
                  </td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <FaEdit className="icon" onClick={() => handleEditTask(task.id)} />
                    <FaTrashAlt
                      className="icon"
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
