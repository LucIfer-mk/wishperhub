// Open the popup
function openPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('hidden');
}

// Close the popup
function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.add('hidden');
}

// Add note functionality
function addNote() {
    const noteInput = document.getElementById('popupInput');
    const noteContent = noteInput.value.trim();

    if (noteContent) {
        // Example: Adding a new note dynamically (modify to save to backend)
        const notesContainer = document.getElementById('notesContainer');
        const newNote = document.createElement('div');
        newNote.className = 'note';
        newNote.innerHTML = `
            <div class="note-title">${noteContent}</div>
            <div class="note-date">${new Date().toLocaleDateString()}</div>
        `;
        notesContainer.appendChild(newNote);

        // Clear the popup input and hide it
        noteInput.value = '';
        closePopup();
    }
}