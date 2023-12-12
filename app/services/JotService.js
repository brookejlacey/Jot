import { AppState } from "../AppState.js";
import { Note } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";

class JotService {
    //REVIEW - ✅
    createNote(formData) {
        const newNote = new Note(formData)
        console.log('hooray', newNote);
        AppState.notes.push(newNote)
        this.saveNotes()
        AppState.activeNote = newNote
        AppState.emit('activeNote')
        AppState.emit('notes')
    }
    //REVIEW - ✅
    openNote(noteId) {
        const note = AppState.notes.find(note => note.id == noteId)
        console.log('🫴', note);
        AppState.activeNote = note
        console.log(AppState);
    }
    //REVIEW - ✅
    setActiveNote(noteId) {
        const activeNote = AppState.notes.find(note => note.id === noteId)
        AppState.activeNote = activeNote //what has to happen to make it for each note
        // this._drawActiveNote()
        AppState.emit('activeNote')
    }

    //REVIEW    ✅
    updateNote(newBody) {// FIXME ✅we take in two items, but how many do we need?
        // const note = AppState.notes.find(note => note.id === noteId) don't need this at all
        // FIXME ✅we already have the note singled out at this time, how can we access that singled out note instead of trying to find it all over again
        // console log when you create a variable
        // Do we really need to find right here?

        AppState.activeNote.body = newBody //this does that
        AppState.activeNote.updatedAt = new Date() // then that
        console.log('changed note', AppState.activeNote);
        this.saveNotes()
        // const activeNote = AppState.activeNote
        AppState.emit('activeNote')
        AppState.emit('notes')
    }

    //FIXME - ✅not saving where I'm loading
    saveNotes() {
        console.log('saving 💾', AppState.notes);
        saveState('notes', AppState.notes) // When saving try to check the dev tools for what you're loading Application > local Storage > localhost:8080
    }

    //FIXME - ✅not loading where I'm saving
    loadNotes() {
        const oldNotes = loadState('notes', [Note]) //loading takes a key and the type of data it should be returned as
        console.log('loading 💾', oldNotes);
        AppState.notes = oldNotes
    }
    //REVIEW - works now, could be better if there's time
    deleteNote(noteId) {
        AppState.notes = AppState.notes.filter(note => note.id !== noteId)
        this.saveNotes() //this is technically destroying the shelf (remember splicing)
    }

}

export const jotService = new JotService()