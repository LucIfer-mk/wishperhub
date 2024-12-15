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

// Add note functionality with word limit validation
function addNote() {
    const noteInput = document.getElementById('popupInput');
    const userName = document.getElementById('userName').value
    const noteContent = noteInput.value.trim();

    // Calculate the word count
    const wordCount = noteContent.split(/\s+/).filter(word => word).length;

    if (wordCount > 100) {
        alert("Your note exceeds the 100-word limit. Please shorten it before adding.");
        return;
    }

    if (noteContent) {
        // Example: Adding a new note dynamically (modify to save to backend)
        const notesContainer = document.getElementById('notesContainer');
        const newNote = document.createElement('div');
        newNote.className = 'note';
        newNote.innerHTML = `
            <div class="note-title">${noteContent}</div>
            <div class="note-date">by: ${userName}  ${new Date().toLocaleDateString()}</div>
        `;
        notesContainer.appendChild(newNote);

        // Clear the popup input and hide it
        noteInput.value = '';
        closePopup();
    }
}
function updateWordCount() {
    const noteInput = document.getElementById('popupInput');
    const wordCount = noteInput.value.trim().split(/\s+/).filter(word => word).length;
    const wordCountDisplay = document.getElementById('wordCount');
    wordCountDisplay.textContent = `${wordCount}/200`;

    // Disable the Add Note button if word count exceeds 200
    const addButton = document.querySelector('.popup button:first-child');
    addButton.disabled = wordCount > 100;
    addButton.style.backgroundColor = wordCount > 100 ? '#ccc' : '#999';
}

