document.addEventListener("DOMContentLoaded", fetchNotes);

async function fetchNotes() {
    const response = await fetch("http://127.0.0.1:8000/api/notes/");
    const notes = await response.json();
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = ""; // Clear existing notes

    notes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const title = document.createElement("div");
        title.className = "note-title";
        title.textContent = note.note;

        const date = document.createElement("div");
        date.className = "note-date";
        date.textContent = note.date;

        noteDiv.appendChild(title);
        noteDiv.appendChild(date);
        notesContainer.prepend(noteDiv);
    });
}

async function addNote() {
    const noteInput = document.getElementById("noteInput");

    if (noteInput.value.trim() === "") {
        alert("Please write something before adding a note.");
        return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            note: noteInput.value,
            date: formattedDate,
        }),
    });

    if (response.ok) {
        fetchNotes(); // Refresh notes
        noteInput.value = ""; // Clear input
    } else {
        alert("Failed to add note.");
    }
}
