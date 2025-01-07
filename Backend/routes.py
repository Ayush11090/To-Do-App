from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db import tasks_collection

task_routes = Blueprint("task_routes", __name__)

# Add a new Task
@task_routes.route('', methods=['POST'])
def add_task():
    data = request.json
    if not data or not data.get("title"):
        return jsonify({"error": "Task title is required"}), 400
    task = {"title": data["title"], "description": data.get("description", ""), "completed": False}
    task_id = tasks_collection.insert_one(task).inserted_id
    return jsonify({"id": str(task_id), "message": "Task added successfully"}), 201

# Display list of Tasks
@task_routes.route('', methods=['GET'])
def get_tasks():
    tasks = []
    for task in tasks_collection.find():
        tasks.append({
            "id": str(task["_id"]),
            "title": task["title"],
            "description": task["description"],
            "completed": task["completed"]
        })
    return jsonify(tasks), 200

# Edit Task
@task_routes.route('/<task_id>', methods=['PUT'])
def edit_task(task_id):
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    updated_task = {}
    if "title" in data:
        updated_task["title"] = data["title"]
    if "description" in data:
        updated_task["description"] = data["description"]
    if "completed" in data:
        updated_task["completed"] = data["completed"]
    result = tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": updated_task})
    if result.matched_count == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Task updated successfully"}), 200

# Delete Task
@task_routes.route('/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Task deleted successfully"}), 200

# Delete all Tasks
@task_routes.route('', methods=['DELETE'])
def delete_all_tasks():
    tasks_collection.delete_many({})
    return jsonify({"message": "All tasks deleted successfully"}), 200
