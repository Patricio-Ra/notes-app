'use strict'


const notes = getSavedNotes();

const filters = {
  searchText: ''
};

document.querySelector('#create-note').addEventListener('click', e => {
  const newId = uuidv4();
  notes.push({
    id: newId,
    title: '',
    body: ''
  });
  saveNotes(notes);
  location.assign(`/edit.html#${newId}`);
});

document.querySelector('#search-text').addEventListener('input', e => { filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
  console.log(e.target.value, '.. Will make this feature later on.');
});

renderNotes(notes, filters);

