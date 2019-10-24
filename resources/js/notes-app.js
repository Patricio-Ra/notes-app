'use strict'

let notes = getSavedNotes();

const filters = {
  searchText: ''
};

document.querySelector('#create-note').addEventListener('click', e => {
  const newId = uuidv4();
  const newTimestamp = moment().valueOf()
  notes.push({
    id: newId,
    title: '',
    body: '',
    createdAt: newTimestamp,
    updatedAt: newTimestamp
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

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);  // Same as getSavedNotes(notes)
    renderNotes(notes, filters);
  };
});

renderNotes(notes, filters);
