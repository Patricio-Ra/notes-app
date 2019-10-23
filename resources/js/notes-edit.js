'use strict'

const titleElement = document.getElementById('note-title');
const bodyElement = document.getElementById('note-body');
const removeElement = document.getElementById('remove-note');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign('/index.html');
} else {
  titleElement.value = note.title;
  bodyElement.value = note.body;
};

titleElement.addEventListener('input', e => {
  note.title = e.target.value;
  saveNotes(notes);
});

bodyElement.addEventListener('input', e => {
  note.body = e.target.value;
  saveNotes(notes);
});

removeElement.addEventListener('click', e => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    // Duplicate code: to be fixed.
    note = notes.find(note => {
      return note.id === noteId;
    });
    
    if (note === undefined) {
      location.assign('/index.html');
    } else {
      titleElement.value = note.title;
      bodyElement.value = note.body;
    };
  };
});