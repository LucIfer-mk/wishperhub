from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo
from datetime import datetime

app = Flask(__name__)

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/notes_db"
mongo = PyMongo(app)
notes_collection = mongo.db.notes

# Serve the HTML page
@app.route('/')
def home():
    notes = list(notes_collection.find({}, {"_id": 0}))  # Fetch notes from the database
    return render_template('index.html', notes=notes)

# API to add a note
@app.route('/add_note', methods=['POST'])
def add_note():
    data = request.json
    note_content = data.get('note')
    
    if note_content:
        new_note = {
            "content": note_content,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        notes_collection.insert_one(new_note)
        return jsonify({"message": "Note added successfully", "note": new_note}), 201
    else:
        return jsonify({"message": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(debug=True)
