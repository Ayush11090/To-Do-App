// components/EditTaskForm.js
import React, { useState, useEffect } from "react";

const EditTaskForm = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task.id, { title, description }); // Call onUpdate with updated task
  };

  return (
    <form onSubmit={handleSubmit} className="edit-task-form">
      <h2>Edit Task</h2>
      <input
        type="text"
        placeholder="Edit title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
      />
      <input
        type="text"
        placeholder="Edit description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-input"
      />
      <h2> </h2>
      <button type="submit" className="submit-button">Save</button>
      <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
    </form>
  );
};

export default EditTaskForm;
