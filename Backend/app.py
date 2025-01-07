from flask import Flask
from flask_cors import CORS
from routes import task_routes

app = Flask(__name__)
CORS(app)  # Enable Requests for React

# Register blueprint
app.register_blueprint(task_routes, url_prefix="/api/tasks")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
