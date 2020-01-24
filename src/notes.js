import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = [];

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    };
};

// Save notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Expose notes from module.
const getNotes = () => {
    notes = loadNotes();
    return notes;
};

const createNote = () => {
    const id = uuidv4();
    const newTimestamp = moment().valueOf();

    notes.push({
        id,
        title: '',
        body: '',
        createdAt: newTimestamp,
        updatedAt: newTimestamp
    });

    saveNotes();
    return id;
};

// Remove note
const removeNote = id => {
	const noteIndex = notes.findIndex(note => note.id === id);

	if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
	};
};

// Sort notes by the select element.
const sortNotes = sortBy => {
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

const updateNote = (id, updates) => {
    const note = notes.find(note => note.id === id);
    if (!note) {
        return 
    };

    if (typeof updates.title === 'string') {
        note.title = updates.title;
        note.updatedAt = moment().valueOf();
    };

    if (typeof updates.body === 'string') {
        note.body = updates.body;
        note.updatedAt = moment().valueOf();
    };

    saveNotes();
    return note;
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };
