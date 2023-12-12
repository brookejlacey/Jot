import { jotService } from "../services/JotService.js";
import { AppState } from "../AppState.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

// REVIEW ✅
function _drawNotesList() {
    const notes = AppState.notes
    let content = ''
    notes.forEach(note => content += note.noteListItem)
    document.getElementById('notes-list').innerHTML = content
    document.getElementById('notes-count').textContent = notes.length
}

// REVIEW ✅
function _drawActiveNote() {
    const activeNote = AppState.activeNote
    let content = '';

    if (activeNote) {
        content = activeNote.ActiveNoteTemplate;
    } else {
        content = '<div class="text-center">create a note to see something here Bruh</div>';
    }

    document.getElementById('active-note-content').innerHTML = content;
}



export class JotController {
    constructor() {
        console.log('Jot app ready');
        AppState.on('notes', _drawNotesList)
        AppState.on('activeNote', _drawActiveNote)
        jotService.loadNotes()
    }
    // REVIEW ✅
    createNote() {
        event.preventDefault()
        const form = event.target
        const formData = getFormData(form)
        jotService.createNote(formData)
        // @ts-ignore
        form.reset()
        // _drawNotesList()
    }
    // REVIEW ✅
    setActiveNote(noteId) {
        console.log('😜', noteId);
        jotService.setActiveNote(noteId)
        // _drawActiveNote()
    }

    // FIXME ✅NO change occurring does it work?
    saveNoteChanges() { // what is noteID doing here?
        const newBody = document.getElementById('active-note-body').value
        // let console log any variables we create
        jotService.updateNote(newBody)
    }

    async deleteNote(noteId) {
        let isConfirmed = await Pop.confirm("Are you sure you want to delete this note?", "This action cannot be undone.", "Yes, delete it", "warning");

        if (isConfirmed) {
            jotService.deleteNote(noteId)
            if (AppState.activeNote && AppState.activeNote.id === noteId) {
                AppState.activeNote = null
            }
            AppState.emit('notes')
            _drawActiveNote()
        }
    }
}

