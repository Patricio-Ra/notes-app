import "core-js/stable";
import "regenerator-runtime/runtime";
import { initEditPage, generateLastUpdated } from './views';
import { updateNote, removeNote } from './notes';

const titleElement = document.getElementById('note-title');
const bodyElement = document.getElementById('note-body');
const removeElement = document.getElementById('remove-note');
const timeElement = document.getElementById('last-edited');

const noteId = location.hash.substring(1);
initEditPage(noteId);

titleElement.addEventListener('input', e => {
    const note = updateNote(noteId, {
        title: e.target.value
    });
    timeElement.textContent = generateLastUpdated(note.updatedAt);
});

bodyElement.addEventListener('input', e => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    timeElement.textContent = generateLastUpdated(note.updatedAt);
});

removeElement.addEventListener('click', e => {
    removeNote(noteId);
    location.assign('/index.html');
});

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        initEditPage(noteId);
    };
});