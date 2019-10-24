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


// Remove note
const removeNote = function (id) {
  const noteIndex = notes.findIndex(note => {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  };
};


// Generate note DOM structure
const generateNote = function (note) {
  const noteElement = document.createElement('div');
  const textElement = document.createElement('a');
  const deleteBtn = document.createElement('button');

  // Setup delete BTN
  deleteBtn.textContent = 'x';
  noteElement.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', e => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });        

  // Setup note tittle TEXT
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = 'Unnamed note';
  };
  textElement.setAttribute('href', `/edit.html#${note.id}`);
  noteElement.appendChild(textElement);

  noteElement.className = 'note';
  return noteElement;
};


// Generate last edited message.
const generateLastUpdated = function (timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`
};


// Sort notes by the select element.
const sortNotes = function (notes, sortBy) {
  return notes.sort((a, b) => {
    switch (sortBy) {
      case 'byEdited':
        return b.updatedAt - a.updatedAt;
      case 'byCreated':
        return b.createdAt - a.createdAt;
      case 'byAlphabetical':
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        };
      default:
        return notes;
    };
  });
};


// Render notes.
const renderNotes = function (notes, filters) {
  notes = sortNotes(notes, filters.sortBy);

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