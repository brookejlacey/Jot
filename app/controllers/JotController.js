import { jotService } from "../services/JotService.js";
import { AppState } from "../AppState.js";
import { getFormData } from "../utils/FormHandler.js";

function _drawNotesList() {
    const notes = AppState.notes
    let content = ''
    notes.forEach(note => content += note.noteListItem)
    document.getElementById('notes-list').innerHTML = content
    document.getElementById('notes-count').textContent = notes.length
}

function _drawActiveNote() {
    const activeNote = AppState.activeNote
    let content = activeNote.activeNoteTemplate
    document.getElementById('active-note-content').innerHTML = content
}

export class JotController {
    constructor() {
        console.log('Jot app ready');
        AppState.on('notes', _drawNotesList)
        AppState.on('activeNote', _drawActiveNote)
        jotService.loadNotes()
    }

    createNote() {
        event.preventDefault()
        const form = event.target
        const formData = getFormData(form)
        jotService.createNote(formData)
        // @ts-ignore
        form.reset()
        _drawNotesList()
    }

    setActiveNote(noteId) {
        console.log('😜', noteId);
        jotService.setActiveNote(noteId)
        _drawActiveNote()
    }

    saveNoteChanges(noteId) {
        const newBody = document.getElementById('active-note-body').value
        jotService.updateNote(newBody)
        const note = AppState.notes.find(note => note.id === noteId);
        if (note) {
            note.updateNoteBody(newBody);
            AppState.emit('activeNote');
        }
    }

}
