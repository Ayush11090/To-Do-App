import React, { useState } from "react";
import "../style/AddTaskForm.css"

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please provide both a title and a description for the task!");
      return; // Prevent submission
    }
    if (title.trim() === "" || description.trim() === "") return;
    onAdd({ title, description }); // Pass both title and description
    setTitle(""); // Reset title field
    setDescription(""); // Reset description field
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
  <input
    type="text"
    placeholder="Enter task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)} // Update title state
    className="task-input"
  />
  <input
    type="text"
    placeholder="Enter task description"
    value={description}
    onChange={(e) => setDescription(e.target.value)} // Update description state
    className="task-input"
  />
  <button type="submit" className="add-task-button">Add Task</button>
</form>

  );
};

export default AddTaskForm;
