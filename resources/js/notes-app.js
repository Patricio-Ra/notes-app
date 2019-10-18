'use strict'

// DATA //

// Notes.
let notes = [];

// Filters.
const filters = {
  searchText: ''
};


// Check and retrive for existing saved DATA.
const notesJSON = localStorage.getItem('notes');

if (notesJSON !== null) {
  notes = JSON.parse(notesJSON);
};


// Rendering.
const renderNotes = function (notes, filters) {
  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector('#notes').innerHTML = '';
  
  filteredNotes.forEach(note => {
    const noteElement = document.createElement('p');
    if (note.title.length > 0) {
      noteElement.textContent = note.title;
    } else {
      noteElement.textContent = 'Unnamed note';
    };
    noteElement.className = 'note';
    document.querySelector('#notes').appendChild(noteElement);
  });
};


// Create note.
document.querySelector('#create-note').addEventListener('click', e => {
  notes.push({
    title: '',
    body: ''
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes(notes, filters);
});


// Filters.
document.querySelector('#search-text').addEventListener('input', e => { filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
  console.log(e.target.value, '.. Will make this feature later on.');
});


renderNotes(notes, filters);

