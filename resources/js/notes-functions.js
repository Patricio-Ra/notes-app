'use strict'

// Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes');

    if (notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    };
};

// Save notes to localStorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Generate note DOM structure
const generateNote = function (note) {
        const noteElement = document.createElement('div');
        const textElement = document.createElement('span');
        const deleteBtn = document.createElement('button');

        // Setup delete BTN
        deleteBtn.textContent = 'x';
        noteElement.appendChild(deleteBtn);

        // Setup note tittle TEXT
        if (note.title.length > 0) {
          textElement.textContent = note.title;
        } else {
          textElement.textContent = 'Unnamed note';
        };
        noteElement.appendChild(textElement);

        noteElement.className = 'note';
        return noteElement;
};

// Render notes.
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(note => {
      return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });
  
    // Clear rendered notes when re-rendering
    document.querySelector('#notes').innerHTML = '';
  
    filteredNotes.forEach(note => {
      const noteElement = generateNote(note);
      document.querySelector('#notes').appendChild(noteElement);
    });
  };