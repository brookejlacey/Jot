import { AppState } from "../AppState.js";
import { Note } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";

class JotService {

    createNote(formData) {
        const newNote = new Note(formData)
        console.log('hooray', newNote);
        AppState.notes.push(newNote);
        this.saveNotes();
        // AppState.activeNote = newNote; 
        // AppState.emit('activeNote'); 
        // AppState.emit('notes'); 
    }

    openNote(noteId) {
        const note = AppState.notes.find(note => note.id == noteId)
        console.log('🫴', note);
        AppState.activeNote = note
        console.log(AppState);
    }

    setActiveNote(noteId) {
        const activeNote = AppState.notes.find(note => note.id === noteId);
        AppState.activeNote = note;
        this._drawActiveNote();
        AppState.emit('activeNote');
    }

    updateNote(noteId, newBody) {
        const note = AppState.notes.find(note => note.id === noteId);
        if (note) {
            note.body = newBody;
            note.updatedAt = new Date();
            this.saveNotes();
            const activeNote = AppState.activeNote
            AppState.emit('activeNote');
            AppState.emit('notes');
        }
    }

    saveNotes() {
        saveState('caseNotes', AppState.notes)
    }

    loadNotes() {
        const oldNotes = loadState('notes', [Note]) //loading takes a key and the type of data it should be returned as
        AppState.notes = oldNotes
    }

    deleteNote(noteId) {
        AppState.notes = AppState.notes.filter(note => note.id !== noteId);
        this.saveNotes();
    }

}

export const jotService = new JotService();