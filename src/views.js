import moment from 'moment';
import { sortNotes, getNotes } from './notes';
import { getFilters } from './filters';

// Generate note DOM structure
const generateNote = note => {
	const noteElement = document.createElement('a');
	const textElement = document.createElement('p');
	const statusEl = document.createElement('p');

  	// Setup note tittle TEXT
	note.title.length ? textElement.textContent = note.title : textElement.textContent = 'Unnamed note';
	textElement.classList.add('list-item__title');
	noteElement.appendChild(textElement);

	// Setup link
	noteElement.setAttribute('href', `/edit.html#${note.id}`);
	noteElement.classList.add('list-item');

	// Setup the status message
	statusEl.textContent = generateLastUpdated(note.updatedAt);
	statusEl.classList.add('list-item__subtitle');
	noteElement.appendChild(statusEl);

	return noteElement;
};

// Generate last edited message.
const generateLastUpdated = timestamp => `Last edited ${moment(timestamp).fromNow()}`;

// Render notes.
const renderNotes = () => {
    const notesEl = document.querySelector('#notes');
    const filters = getFilters();
	const notes = sortNotes(filters.sortBy);
	const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

	notesEl.innerHTML = '';

	if (filteredNotes.length > 0) {
		filteredNotes.forEach(note => {
			const noteElement = generateNote(note);
			notesEl.appendChild(noteElement);
		});
	} else {
		const emptyMessage = document.createElement('p');
		emptyMessage.textContent = 'No notes to show';
		emptyMessage.classList.add('empty-message');
		notesEl.appendChild(emptyMessage);
	};
};

const initEditPage = noteId => {
    const titleElement = document.getElementById('note-title');
    const bodyElement = document.getElementById('note-body');
    const timeElement = document.getElementById('last-edited');
    const notes = getNotes();
    const note = notes.find(note => note.id === noteId);

    if (!note) {
        location.assign('/index.html');
    };
    titleElement.value = note.title;
    bodyElement.value = note.body;
    timeElement.textContent = generateLastUpdated(note.updatedAt);
};


export { generateLastUpdated, generateNote, renderNotes, initEditPage };