'use strict'


const notes = getSavedNotes();

const filters = {
  searchText: ''
};

document.querySelector('#create-note').addEventListener('click', e => {
  notes.push({
    id: uuidv4(),
    title: '',
    body: ''
  });
  saveNotes(notes);
  renderNotes(notes, filters);
});

document.querySelector('#search-text').addEventListener('input', e => { filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
  console.log(e.target.value, '.. Will make this feature later on.');
});

renderNotes(notes, filters);

