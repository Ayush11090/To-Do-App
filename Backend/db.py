from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# MongoDB connection URI
uri = "mongodb+srv://ayushbillade11:ay123%40%24AB@cluster0.s8pk0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

# Test connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. Successfully connected to MongoDB!")
except Exception as e:
    print("Failed to connect to MongoDB:", e)

# Access the database and collection
db = client["todo_db"]  
tasks_collection = db["tasks"] 
