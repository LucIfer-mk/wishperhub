# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["notes_db"]
collection = db["notes"]

@api_view(["GET", "POST"])
def notes_api(request):
    if request.method == "POST":
        data = request.data
        collection.insert_one({"note": data["note"], "date": data["date"]})
        return Response({"message": "Note added successfully!"})
    elif request.method == "GET":
        notes = list(collection.find({}, {"_id": 0}))
        return Response(notes)
