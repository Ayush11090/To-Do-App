# To-Do Reminder App

A full-stack To-Do Reminder application with a Flask backend and React frontend, integrated with MongoDB for persistent storage.

---

## Features
- Add new To-Do tasks
- View all To-Do tasks
- Edit or delete specific tasks
- Delete all tasks
- Mark tasks as completed or uncompleted

---

## Tech Stack
- **Frontend**: React, CSS
- **Backend**: Flask (Python)
- **Database**: MongoDB

---

## Installation and Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/) for the frontend.
- Install Python (3.7 or higher) and ensure `pip` is installed for the backend.

### Backend Setup (Flask)
1. Navigate to the `Backend` folder:
   ```bash
   cd Backend

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt

3. Start the Flask server:
   ```bash
   flask run

4. The server will run on http://127.0.0.1:5000.

### Frontend Setup (React)
1. Navigate to the Frontend folder:
   ```bash
   cd Frontend
2. Install the required dependencies:
   ```bash
   npm install
3. Start the React development server:
   ```bash
   npm start

4. The frontend will run on http://localhost:3000.


## API Endpoints
### Task Management
- GET /api/tasks: Retrieve all tasks.
- POST /api/tasks: Add a new task. Requires title and optional description.
- PUT /api/tasks/<task_id>: Update a specific task.
- DELETE /api/tasks/<task_id>: Delete a specific task.
- DELETE /api/tasks: Delete all tasks.
