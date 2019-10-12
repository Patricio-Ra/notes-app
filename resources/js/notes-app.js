'use strict'

const notes = [{
  title: 'My next trip',
  body: 'I would like to go to Spain.'
}, {
  title: 'Habbits to work on',
  body: 'Exercise. Eating a bit better.'
}, {
  title: 'Office modifications',
  body: 'Get a new monitor'
}];

const filters = {
  searchText: ''
}

const renderNotes = function (notes, filters) {
  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector('#notes').innerHTML = '';
  
  filteredNotes.forEach(note => {
    const noteElement = document.createElement('p');
    noteElement.textContent = note.title;
    noteElement.className = 'note';
    document.querySelector('#notes').appendChild(noteElement);
  });
};

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('click', e => e.target.textContent = 'The button was clicked');

document.querySelector('#remove-all').addEventListener('click', e => {
  document.querySelectorAll('.note').forEach(note => note.remove());
});

document.querySelector('#search-text').addEventListener('input', e => { filters.searchText = e.target.value;
  renderNotes(notes, filters);
});



// const ps = document.querySelectorAll('p');
// // console.log(ps);
// // console.log(typeof ps);
// // ps.remove();

// ps.forEach(p => p.textContent = '******');
// // console.log(p.textContent);

// const newP = document.createElement('p');
// newP.textContent = 'New text element from JS';
// document.querySelector('body').appendChild(newP);
// // Note that the .forEach is above this.

