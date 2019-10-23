'use strict'

const titleElement = document.getElementById('note-title');
const bodyElement = document.getElementById('note-body');
const removeElement = document.getElementById('remove-note');
const notes = getSavedNotes();
const noteId = location.hash.substring(1);
const note = notes.find(note => {
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