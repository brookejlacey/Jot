import { generateId } from "../utils/GenerateId.js";
import { AppState } from "../AppState.js";

/**
 * @typedef {Object} NoteData
 * @property {string} title
 * @property {string} body
 * @property {string} color
 * @property {string} updatedAt
 * @property {string} createdAt
 */

export class Note {
  /** @param {NoteData} data */
  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.body = data.body || ''
    this.color = data.color || '#ffffff'
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date()
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date()
  }


  get noteListItem() {
    console.log('JotController:', app.JotController);
    return `
  <div class="note-list-item" style="background-color: ${this.color}">
    <span class="note-title">${this.title}</span>
    <span class="note-updated-at">${this.updatedAt.toLocaleString()}</span>
    <button onclick="app.JotController.setActiveNote('${this.id}')" class="btn btn-outline-light" title="edit note"><i class="mdi mdi-pencil"></i></button>
    <button onclick="app.JotController.deleteNote('${this.id}')" class="btn btn-outline-danger" title="delete note"><i class="mdi mdi-delete"></i></button>
  </div>`
  }

  get ActiveNoteTemplate() {

    return `
  <div class="active-note" style="background-color: ${this.color}">
    <h2>${this.title}</h2>
    <p>Created: ${this.LongDate}</p>
    <p>Updated: ${this.LongDate}</p>
    <textarea rows="20" class="w-100" id="active-note-body">${this.body}</textarea>
    <button onclick="app.JotController.saveNoteChanges('${this.id}')" class="btn btn-success">Save</button>
  </div>
  `
  }

  get EditableNoteBody() {
    return `
<textarea rows="20" class="w-100" id="active-note-body" maxlength=2000>${this.body}</textarea>
    `
  }

  get SaveButton() {
    return `<button onclick="app.JotController.saveNoteChanges()" class="btn btn-warning">save case<i class="mdi mdi-content-save"></i></button>`
  }

  get LongDate() {
    return (date) => date.toLocaleDateString('en-US', { weekday: 'short', month: 'narrow', year: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  }

}



