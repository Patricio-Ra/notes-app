'use strict'

const titleElement = document.getElementById('note-title');
const bodyElement = document.getElementById('note-body');
const removeElement = document.getElementById('remove-note');
const timeElement = document.getElementById('last-edited');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);

if (!note) {
  location.assign('/index.html');
} else {
  titleElement.value = note.title;
  bodyElement.value = note.body;
  timeElement.textContent = generateLastUpdated(note.updatedAt);;
};

titleElement.addEventListener('input', e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  timeElement.textContent = generateLastUpdated(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener('input', e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  timeElement.textContent = generateLastUpdated(note.updatedAt);
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
    note = notes.find(note => note.id === noteId);
    
    if (!note) {
      location.assign('/index.html');
    } else {
      titleElement.value = note.title;
      bodyElement.value = note.body;
      timeElement.textContent = generategenerateLastUpdated(note.updatedAt);
    };
  };
});