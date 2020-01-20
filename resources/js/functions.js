'use strict'


// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
		return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
		return [];
    };
};


// Save notes to localStorage
const saveNotes = notes => {
    localStorage.setItem('notes', JSON.stringify(notes));
};


// Remove note
const removeNote = id => {
	const noteIndex = notes.findIndex(note => note.id === id);

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1);
	};
};


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


// Sort notes by the select element.
const sortNotes = (notes, sortBy) => {
	return notes.sort((a, b) => {
		switch (sortBy) {
			case 'byEdited':
				return b.updatedAt - a.updatedAt;
			case 'byCreated':
				return b.createdAt - a.createdAt;
			case 'byAlphabetical':
				if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1;
				} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1;
				} else {
					return 0;
				};
			default:
				return notes;
		};
	});
};


// Render notes.
const renderNotes = (notes, filters) => {
	const notesEl = document.querySelector('#notes');
	notes = sortNotes(notes, filters.sortBy);

	const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

	// Clear rendered notes when re-rendering
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