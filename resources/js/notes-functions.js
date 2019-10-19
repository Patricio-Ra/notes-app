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
        const noteElement = document.createElement('p');
        noteElement.className = 'note';

        if (note.title.length > 0) {
          noteElement.textContent = note.title;
        } else {
          noteElement.textContent = 'Unnamed note';
        };

        return noteElement;
};

// Render notes.
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(note => {
      return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });
  
    document.querySelector('#notes').innerHTML = '';
  
    filteredNotes.forEach(note => {
      const noteElement = generateNote(note);
      document.querySelector('#notes').appendChild(noteElement);
    });
  };