'use strict'

let notes = getSavedNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited'
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

document.querySelector('#search-text').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);  // Same as getSavedNotes(notes)
    renderNotes(notes, filters);
  };
});

renderNotes(notes, filters);
